# main views file...

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

# analyzer
from .ai_service import generate_video_insights
import json


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

    strengths = seo_strengths + title_strengths
    weaknesses = seo_weaknesses + title_weaknesses

    next_steps = []

    if "No tags used" in weaknesses:
        next_steps.append("Add relevant tags to improve discoverability")

    if "Description is too short" in weaknesses or "Description is missing" in weaknesses:
        next_steps.append("Expand the description with more context and keywords")

    if "Tags are not reflected in the description" in weaknesses:
        next_steps.append("Work important tag phrases naturally into the description")

    if (
        "Metadata alignment is only partial" in weaknesses
        or "Title keywords are not well supported by tags or description" in weaknesses
    ):
        next_steps.append("Align title keywords more closely with tags and description")

    # Step 4: build AI payload
    ai_payload = {
        "video_title": metadata.get("video_title"),
        "channel_name": metadata.get("channel_name"),
        "description": metadata.get("description"),
        "tags": metadata.get("tags", []),
        "published_at": metadata.get("published_at"),
        "duration": metadata.get("duration"),
        "views": metadata.get("views"),
        "likes": metadata.get("likes"),
        "comments": metadata.get("comments"),
        "viral_score": viral_score,
        "engagement_score": engagement_score,
        "seo_score": seo_score,
        "title_score": title_score,
        "strengths_from_rules": strengths,
        "weaknesses_from_rules": weaknesses,
        "next_steps_from_rules": next_steps,
    }

    summary = None

    # Step 5: call AI
    try:
        ai_result_raw = generate_video_insights(ai_payload)
        ai_result = json.loads(ai_result_raw)

        summary = ai_result.get("summary")
        strengths = ai_result.get("strengths", strengths)
        weaknesses = ai_result.get("weaknesses", weaknesses)
        next_steps = ai_result.get("next_steps", next_steps)

    except Exception:
        summary = "AI insights are temporarily unavailable."

    # Step 6: return final response
    return JsonResponse({
        "submitted_url": url,
        "video_id": video_id,
        **metadata,
        "viral_score": viral_score,
        "engagement_score": engagement_score,
        "seo_score": seo_score,
        "title_score": title_score,
        "summary": summary,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "next_steps": next_steps,
    })