from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# url extraction
from .utils import extract_video_id
# yt api
from .youtube_service import get_video_metadata


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

    # Step 3: return combined response
    return JsonResponse({
        "submitted_url": url,
        "video_id": video_id,
        **metadata
    })