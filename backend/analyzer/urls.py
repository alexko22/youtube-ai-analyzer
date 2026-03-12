# url file for all routes

from django.urls import path
from .views import analyze_video

urlpatterns = [
    path("analyze-video/", analyze_video, name="analyze-video"),
]