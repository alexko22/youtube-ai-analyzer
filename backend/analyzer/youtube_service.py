import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")


def get_video_metadata(video_id):
    url = "https://www.googleapis.com/youtube/v3/videos"

    params = {
        "part": "snippet,statistics",
        "id": video_id,
        "key": API_KEY,
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "items" not in data or len(data["items"]) == 0:
        return None

    video = data["items"][0]

    snippet = video["snippet"]
    stats = video["statistics"]

    return {
        "video_title": snippet.get("title"),
        "channel_name": snippet.get("channelTitle"),
        "description": snippet.get("description"),
        "published_at": snippet.get("publishedAt"),
        "views": stats.get("viewCount"),
        "likes": stats.get("likeCount"),
        "comments": stats.get("commentCount"),
    }