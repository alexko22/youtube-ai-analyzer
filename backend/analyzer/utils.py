from urllib.parse import urlparse, parse_qs


def extract_video_id(url):
    try:
        parsed_url = urlparse(url)

        # shorts
        if parsed_url.netloc in ["youtu.be", "www.youtu.be"]:
            return parsed_url.path.lstrip("/")

        # full
        if parsed_url.netloc in ["youtube.com", "www.youtube.com", "m.youtube.com"]:
            if parsed_url.path == "/watch":
                query_params = parse_qs(parsed_url.query)
                return query_params.get("v", [None])[0]

        return None

    except Exception:
        return None