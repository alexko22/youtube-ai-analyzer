from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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

    return JsonResponse({
        "submitted_url": url,
        "video_title": "Mock Video Title",
        "channel_name": "Mock Channel",
        "summary": "This is a mock AI analysis response.",
        "strengths": [
            "Clear topic",
            "Good engagement potential"
        ],
        "weaknesses": [
            "Thumbnail could be stronger"
        ],
        "next_steps": [
            "Test a shorter intro"
        ]
    })