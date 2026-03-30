import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_video_insights(payload):
    prompt = f"""
You are an assistant helping analyze a YouTube video.

Return a concise JSON object with these keys:
- summary
- strengths
- weaknesses
- next_steps

Rules:
- summary should be 2-4 sentences
- strengths, weaknesses, next_steps should each be arrays of short strings
- Base your answer only on the provided data
- Be specific and practical
- Do not include markdown

Video analysis data:
{payload}
"""

    response = client.responses.create(
        model="gpt-5-mini",
        input=prompt,
    )

    return response.output_text