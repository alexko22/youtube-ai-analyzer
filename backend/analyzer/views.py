from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# url extraction
from .utils import extract_video_id

# yt api
from .youtube_service import get_video_metadata

# scoring
from .scoring_service import (
    calculate_viral_score,
    calculate_engagement_score,
    calculate_seo_score,
    calculate_title_score,
)


@csrf_exempt
def analyze_video(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests allowed"}, status=405)

    try:
        body = json.loads(request.body)
        url = body.get("url")
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if not url:
        return JsonResponse({"error": "No URL provided"}, status=400)

    # Step 1: extract video ID
    video_id = extract_video_id(url)

    if not video_id:
        return JsonResponse({"error": "Invalid YouTube URL"}, status=400)

    # Step 2: fetch metadata from YouTube API
    metadata = get_video_metadata(video_id)

    if not metadata:
        return JsonResponse({"error": "Video not found"}, status=404)

    # Step 3: calculate scores
    viral_score = calculate_viral_score(
    metadata.get("views"),
    metadata.get("likes"),
    metadata.get("comments"),
    )



    engagement_score = calculate_engagement_score(
        metadata.get("views"),
        metadata.get("likes"),
        metadata.get("comments"),
    )

    seo_score, seo_strengths, seo_weaknesses = calculate_seo_score(
        metadata.get("video_title", ""),
        metadata.get("description", ""),
        metadata.get("tags", []),
    )

    title_score, title_strengths, title_weaknesses = calculate_title_score(
        metadata.get("video_title", "")
    )

    # Combine insights
    strengths = seo_strengths + title_strengths
    weaknesses = seo_weaknesses + title_weaknesses

    next_steps = []

    if "No tags used" in weaknesses:
        next_steps.append("Add relevant tags to improve discoverability")

    if "Description is too short" in weaknesses:
        next_steps.append("Expand the description with keywords and context")

    # Step 4: return full response
    return JsonResponse({
    "submitted_url": url,
    "video_id": video_id,
    **metadata,
    "viral_score": viral_score,
    "engagement_score": engagement_score,
    "seo_score": seo_score,
    "title_score": title_score,
    "strengths": strengths,
    "weaknesses": weaknesses,
    "next_steps": next_steps,
})