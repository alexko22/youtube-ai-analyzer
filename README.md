# YouRise

YouRise is an AI-powered web app that analyzes YouTube videos and provides insights on performance, engagement, and SEO.

Paste a YouTube URL to receive scores, metadata, and AI-generated recommendations.

Visit the deployed version here: https://youtube-ai-analyzer-theta.vercel.app/

## Features

- Video metadata extraction (title, stats, tags, description)
- Engagement and viral scoring
- SEO analysis
- AI-generated summary and insights
- Embedded video playback

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Django, YouTube Data API, OpenAI API

## Setup

### Backend

cd backend  
python -m venv venv  
venv\Scripts\activate  
pip install -r requirements.txt  
python manage.py runserver  

### Frontend

cd frontend  
npm install  
npm run dev  

## Deployment

- Frontend: Vercel  
- Backend: Render  

## Environment Variables

Frontend:
NEXT_PUBLIC_API_BASE_URL=your_backend_url  

Backend:
DJANGO_SECRET_KEY=your_secret_key  
YOUTUBE_API_KEY=your_key  
OPENAI_API_KEY=your_key  
