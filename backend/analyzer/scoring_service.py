# primary scoring function calculations (subject to change)

import math
import re


def normalize_text_words(text):
    if not text:
        return set()
    words = re.findall(r"\b[a-zA-Z0-9]+\b", text.lower())
    return set(words)


def calculate_viral_score(views, likes, comments):
    try:
        views = int(views or 0)
        likes = int(likes or 0)
        comments = int(comments or 0)

        if views <= 0:
            return 0

        # Log scaling prevents huge channels from instantly maxing the score
        view_score = min(math.log10(views + 1) / 6, 1.0) * 50
        like_score = min(math.log10(likes + 1) / 5, 1.0) * 30
        comment_score = min(math.log10(comments + 1) / 4, 1.0) * 20

        score = view_score + like_score + comment_score
        return round(score, 1)

    except Exception:
        return 0


def calculate_engagement_score(views, likes, comments):
    try:
        views = int(views or 0)
        likes = int(likes or 0)
        comments = int(comments or 0)

        if views <= 0:
            return 0

        like_rate = likes / views
        comment_rate = comments / views

        target_like_rate = 0.04      # 4%
        target_comment_rate = 0.005  # 0.5%

        like_ratio = like_rate / target_like_rate
        comment_ratio = comment_rate / target_comment_rate

        # Exact target should land around 80, not 100
        like_component = min(like_ratio * 80, 100)
        comment_component = min(comment_ratio * 80, 100)

        score = (like_component + comment_component) / 2
        return round(score, 1)

    except Exception:
        return 0


def calculate_seo_score(title, description, tags):
    title = title or ""
    description = description or ""
    tags = tags or []

    score = 0
    strengths = []
    weaknesses = []

    title_words = normalize_text_words(title)
    description_words = normalize_text_words(description)
    tag_words = normalize_text_words(" ".join(tags))

    # 1. Tags present (20 points)
    if tags:
        score += 20
        strengths.append("Tags are present")
    else:
        weaknesses.append("No tags used")

    # 2. Tag character usage out of 500 (20 points)
    tag_char_count = sum(len(tag) for tag in tags)
    tag_usage_ratio = min(tag_char_count / 500, 1.0)
    tag_usage_points = round(tag_usage_ratio * 20, 1)
    score += tag_usage_points

    if tag_char_count >= 300:
        strengths.append("Tag usage is strong")
    elif tags:
        weaknesses.append("Tag usage could be expanded")

    # 3. Description length (20 points)
    description_length = len(description.strip())
    if description_length >= 300:
        score += 20
        strengths.append("Description is detailed")
    elif description_length >= 120:
        score += 12
        strengths.append("Description has decent length")
    elif description_length > 0:
        score += 5
        weaknesses.append("Description is too short")
    else:
        weaknesses.append("Description is missing")

    # 4. Tags present in description (20 points)
    matching_tags_in_description = 0
    description_lower = description.lower()

    for tag in tags:
        if tag.lower() in description_lower:
            matching_tags_in_description += 1

    if len(tags) > 0:
        tag_description_ratio = matching_tags_in_description / len(tags)
        tag_description_points = round(min(tag_description_ratio, 1.0) * 20, 1)
        score += tag_description_points

        if tag_description_ratio >= 0.4:
            strengths.append("Tags are reinforced in the description")
        elif tag_description_ratio > 0:
            weaknesses.append("More tags could be reflected in the description")
        else:
            weaknesses.append("Tags are not reflected in the description")

    # 5. Metadata overlap: title ↔ description ↔ tags (20 points)
    overlap_desc = len(title_words & description_words)
    overlap_tags = len(title_words & tag_words)

    overlap_points = 0
    if overlap_desc > 0:
        overlap_points += 10
    if overlap_tags > 0:
        overlap_points += 10

    score += overlap_points

    if overlap_desc > 0 and overlap_tags > 0:
        strengths.append("Title, tags, and description are aligned")
    elif overlap_desc > 0 or overlap_tags > 0:
        weaknesses.append("Metadata alignment is only partial")
    else:
        weaknesses.append("Title keywords are not well supported by tags or description")

    return round(min(score, 100), 1), strengths, weaknesses


def calculate_title_score(title):
    title = title or ""
    length = len(title)

    strengths = []
    weaknesses = []

    score = 0

    if 30 <= length <= 70:
        score += 50
        strengths.append("Title length is well optimized")
    elif 20 <= length < 30 or 70 < length <= 85:
        score += 35
        strengths.append("Title length is acceptable")
    elif length > 85:
        score += 20
        weaknesses.append("Title may be too long")
    else:
        score += 15
        weaknesses.append("Title may be too short")

    if title.isupper() and len(title) > 8:
        weaknesses.append("Title uses excessive capitalization")
    else:
        score += 15

    punctuation_count = title.count("!") + title.count("?")
    if punctuation_count >= 4:
        weaknesses.append("Title may use too much punctuation")
    else:
        score += 15

    if any(char.isdigit() for char in title):
        score += 10

    if ":" in title or "|" in title:
        score += 10

    return round(min(score, 100), 1), strengths, weaknesses