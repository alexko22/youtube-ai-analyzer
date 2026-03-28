"use client";

import { FormEvent, useState } from "react";

type AnalysisResponse = {
  submitted_url: string;
  video_id: string | null;
  video_title?: string;
  channel_name?: string;
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  next_steps?: string[];
  description?: string;
  published_at?: string;
  duration?: string;
  tags?: string[];
  views?: string;
  likes?: string;
  comments?: string;
  engagement_score?: number;
  seo_score?: number;
  title_score?: number;
  viral_score?: number;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-video/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while analyzing the video.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">YouTube AI Analyzer</h1>
        <p className="mb-6 text-gray-600">
          Paste a YouTube URL to analyze a single video.
        </p>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded border px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Video"}
          </button>
        </form>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4 rounded border p-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {result.video_title || "Untitled Video"}
              </h2>
              <p className="text-gray-600">
                {result.channel_name || "Unknown Channel"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Video ID</h3>
              <p className="text-sm text-gray-700">
                {result.video_id ?? "Not found"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Submitted URL</h3>
              <p className="break-all text-sm text-gray-700">
                {result.submitted_url}
              </p>
            </div>

            {(result.engagement_score !== undefined ||
              result.seo_score !== undefined ||
              result.title_score !== undefined || result.viral_score !== undefined) && (
              <div>
                <h3 className="font-semibold">Scores</h3>
                <ul className="list-disc pl-6">
                  {result.viral_score !== undefined && (
                  <li>Viral Score: {result.viral_score}</li>
                  )}
                  {result.engagement_score !== undefined && (
                    <li>Engagement Score: {result.engagement_score}</li>
                  )}
                  {result.seo_score !== undefined && (
                    <li>SEO Score: {result.seo_score}</li>
                  )}
                  {result.title_score !== undefined && (
                    <li>Title Score: {result.title_score}</li>
                  )}
                </ul>
              </div>
            )}

            {result.published_at && (
              <div>
                <h3 className="font-semibold">Published At</h3>
                <p>{result.published_at}</p>
              </div>
            )}

            {result.duration && (
              <div>
                <h3 className="font-semibold">Duration</h3>
                <p>{result.duration}</p>
              </div>
            )}

            {(result.views || result.likes || result.comments) && (
              <div>
                <h3 className="font-semibold">Stats</h3>
                <ul className="list-disc pl-6">
                  {result.views && <li>Views: {result.views}</li>}
                  {result.likes && <li>Likes: {result.likes}</li>}
                  {result.comments && <li>Comments: {result.comments}</li>}
                </ul>
              </div>
            )}

            {result.tags && result.tags.length > 0 && (
              <div>
                <h3 className="font-semibold">Tags</h3>
                <ul className="list-disc pl-6">
                  {result.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.description && (
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="whitespace-pre-line">{result.description}</p>
              </div>
            )}

            {result.summary && (
              <div>
                <h3 className="font-semibold">Summary</h3>
                <p>{result.summary}</p>
              </div>
            )}

            {result.strengths && result.strengths.length > 0 && (
              <div>
                <h3 className="font-semibold">Strengths</h3>
                <ul className="list-disc pl-6">
                  {result.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.weaknesses && result.weaknesses.length > 0 && (
              <div>
                <h3 className="font-semibold">Weaknesses</h3>
                <ul className="list-disc pl-6">
                  {result.weaknesses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.next_steps && result.next_steps.length > 0 && (
              <div>
                <h3 className="font-semibold">Next Steps</h3>
                <ul className="list-disc pl-6">
                  {result.next_steps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}