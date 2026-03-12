"use client";

import { FormEvent, useState } from "react";

type AnalysisResponse = {
  submitted_url: string;
  video_title: string;
  channel_name: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  next_steps: string[];
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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data: AnalysisResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong while analyzing the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">YouTube AI Analyzer</h1>
        <p className="mb-6 text-gray-600">
          Paste a YouTube URL to get a mock analysis result.
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
              <h2 className="text-2xl font-semibold">{result.video_title}</h2>
              <p className="text-gray-600">{result.channel_name}</p>
            </div>

            <div>
              <h3 className="font-semibold">Submitted URL</h3>
              <p className="break-all text-sm text-gray-700">
                {result.submitted_url}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Summary</h3>
              <p>{result.summary}</p>
            </div>

            <div>
              <h3 className="font-semibold">Strengths</h3>
              <ul className="list-disc pl-6">
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Weaknesses</h3>
              <ul className="list-disc pl-6">
                {result.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Next Steps</h3>
              <ul className="list-disc pl-6">
                {result.next_steps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
