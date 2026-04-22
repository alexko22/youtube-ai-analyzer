// page.tsx - main page with working functionality

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
  viral_score?: number;
  engagement_score?: number;
  seo_score?: number;
};

type ScoreCardProps = {
  label: string;
  value?: number;
};

function getScoreStyles(score?: number) {
  if (score === undefined) {
    return "border-gray-200 bg-white text-gray-900";
  }

  if (score >= 75) {
    return "border-green-200 bg-green-50 text-green-900";
  }

  if (score >= 50) {
    return "border-yellow-200 bg-yellow-50 text-yellow-900";
  }

  return "border-red-200 bg-red-50 text-red-900";
}

function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <div className={`border p-5 shadow-sm ${getScoreStyles(value)} rounded-none`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-bold">
        {value !== undefined && value !== null ? value : "--"}
      </p>
    </div>
  );
}

function formatNumber(value?: string) {
  if (!value) return "--";
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return num.toLocaleString();
}

function formatDate(value?: string) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const resetAnalyzer = () => {
    setUrl("");
    setResult(null);
    setError("");
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/analyze-video/`,
        
        {
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

  const showEmptyState = !loading && !result;
  const showAnalyzerActive = !result;

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-gray-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="border-b border-gray-200 bg-[#f1f1f2] md:sticky md:top-0 md:h-screen md:w-36 md:border-b-0 md:border-r md:p-0">
          <div className="flex flex-col md:h-screen md:justify-between">
            <div className="flex flex-col">
            <button
              onClick={resetAnalyzer}
              className={`flex h-24 w-full cursor-pointer flex-col items-center justify-center gap-2 border-b border-gray-200 px-2 text-gray-600 transition-colors duration-150 md:h-36 md:w-36 ${
                showAnalyzerActive
                  ? "bg-[#0f8c8d] text-white"
                  : result
                  ? "bg-[#ff3131] text-white"
                  : "bg-white text-gray-600 hover:bg-[#dff4f4]"
              }`}
            >
              <Image
                src="/computer.png"
                alt="Main Analyzer"
                width={42}
                height={42}
                className="h-auto w-10"
              />
              <span className="text-[11px] font-medium tracking-wide">
                Long-form YouTube Analyzer
              </span>
            </button>

            <button
              disabled
              className="flex h-24 w-full flex-col items-center justify-center gap-2 border-b border-gray-200 px-2 bg-white text-gray-400 transition-colors duration-150 hover:bg-gray-100 md:h-36 md:w-36"
            >
              <Image
                src="/phone.png"
                alt="Main Analyzer"
                width={42}
                height={42}
                className="h-auto w-10"
              />
              <span className="text-[11px] font-medium tracking-wide">
                Short-form Analyzer (Coming Soon)
              </span>
            </button>

          
            </div>
            <div className="grid grid-cols-2 md:block">
              <button
              onClick={() => router.push("/tos")}
              className="flex h-20 w-full cursor-pointer flex-col items-center justify-center gap-1 border-b border-gray-200 bg-white px-2 text-gray-600 transition-colors duration-150 hover:bg-gray-100 md:h-36 md:w-36 md:gap-2"
            >
              <Image
                src="/faq.png"
                alt="Main Analyzer"
                width={42}
                height={42}
                className="h-auto w-10"
              />
              <span className="text-[11px] font-medium tracking-wide">
                TOS
              </span>
            </button>
              <button
              onClick={() => router.push("/privacy")}
              className="flex h-20 w-full cursor-pointer flex-col items-center justify-center gap-1 border-b border-gray-200 bg-white px-2 text-gray-600 transition-colors duration-150 hover:bg-gray-100 md:h-36 md:w-36 md:gap-2"
            >
              <Image
                src="/privacy.png"
                alt="Main Analyzer"
                width={42}
                height={42}
                className="h-auto w-10"
              />
              <span className="text-[11px] font-medium tracking-wide">
                Privacy Policy
              </span>
            </button>
            </div>
          </div>
        </aside>

        <section className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-6xl">
            {showEmptyState && (
              <div className="flex min-h-[80vh] flex-col items-center justify-center">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-6">
                    <div className="mx-auto mb-6 flex justify-center">
                      <Image
                        src="/YouRise1.png"
                        alt="YouRise logo"
                        width={600}
                        height={180}
                        priority
                        className="h-auto w-[280px] sm:w-[360px] md:w-[480px]"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-base text-gray-500">
                    Paste a YouTube link to analyze performance, metadata, SEO, and AI insights.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                  <div className="flex flex-col items-stretch gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:rounded-full">
                    <input
                      type="text"
                      placeholder="Paste a YouTube URL..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2 text-base outline-none"
                    />
                    <button
                      type="submit"
                      disabled={loading || !url.trim()}
                      className="w-full rounded-full bg-[#ff3131] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#e62b2b] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400 sm:w-auto"
                    >
                      Analyze
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mt-6 w-full max-w-3xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm rounded-xl">
                    {error}
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div className="flex min-h-[80vh] flex-col items-center justify-center">
                <div className="w-full max-w-3xl border border-gray-200 bg-white p-10 text-center shadow-sm rounded-2xl">
                  <div className="mx-auto mb-6">
                    <Image
                      src="/YouRise.png"
                      alt="YouRise logo"
                      width={260}
                      height={78}
                      priority
                      className="mx-auto h-auto w-[220px] animate-pulse"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold">Analyzing video...</h2>
                  <p className="mt-3 animate-pulse text-gray-500">
                    Pulling metadata, calculating scores, and generating AI insights.
                  </p>
                </div>
              </div>
            )}

            {!loading && result && (
              <div className="space-y-8">
                <div className="rounded-none border border-gray-200 border-t-4 border-t-[#ff3131] bg-white p-4 shadow-sm sm:p-6 md:p-8">
                  <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div>
                      <h2 className="text-2xl font-bold sm:text-3xl">
                        {result.video_title || "Untitled Video"}
                      </h2>
                      <p className="mt-2 text-lg text-gray-500">
                        {result.channel_name || "Unknown Channel"}
                      </p>
                    </div>

                    <button
                      onClick={resetAnalyzer}
                      className="w-full border border-[#0f8c8d]/30 bg-white px-4 py-2 text-sm font-medium text-[#0f8c8d] shadow-sm transition hover:bg-[#0f8c8d]/5 rounded-none sm:w-auto"
                    >
                      Analyze New Video
                    </button>
                  </div>

                  {result.video_id && (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
                      <iframe
                        className="aspect-video w-full"
                        src={`https://www.youtube.com/embed/${result.video_id}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-700 sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-wrap lg:items-center lg:gap-6">
                    <div className="flex items-center gap-2">
                        <Image
                          src="/views.png"
                          alt="Views"
                          width={25}
                          height={25}
                          className="opacity-80"
                        />
                      <span className="font-medium">{formatNumber(result.views)}</span>
                      <span className="text-gray-500">views</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image
                          src="/likes.png"
                          alt="Views"
                          width={30}
                          height={30}
                          className="opacity-80"
                        />
                      <span className="font-medium">{formatNumber(result.likes)}</span>
                      <span className="text-gray-500">likes</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image
                          src="/comments.png"
                          alt="Views"
                          width={32}
                          height={32}
                          className="opacity-80"
                        />
                      <span className="font-medium">{formatNumber(result.comments)}</span>
                      <span className="text-gray-500">comments</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <ScoreCard label="Viral Score" value={result.viral_score} />
                  <ScoreCard
                    label="Engagement Score"
                    value={result.engagement_score}
                  />
                  <ScoreCard label="SEO Score" value={result.seo_score} />
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div className="space-y-6 xl:col-span-2">
                    {result.summary && (
                      <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                        <h3 className="text-xl font-semibold">AI Analysis</h3>
                        <p className="mt-3 whitespace-pre-line text-gray-700">
                          {result.summary}
                        </p>
                      </div>
                    )}

                    {result.strengths && result.strengths.length > 0 && (
                      <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                        <h3 className="text-xl font-semibold">Strengths</h3>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                          {result.strengths.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.weaknesses && result.weaknesses.length > 0 && (
                      <div className="border border-gray-200 border-l-4 border-l-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                        <h3 className="text-xl font-semibold">Weaknesses</h3>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                          {result.weaknesses.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {result.next_steps && result.next_steps.length > 0 && (
                      <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                        <h3 className="text-xl font-semibold">Next Steps</h3>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                          {result.next_steps.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 border-t-4 border-t-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                      <h3 className="text-xl font-semibold">Extra Metadata</h3>

                      <div className="mt-4 space-y-4 text-sm text-gray-700">
                        <div>
                          <p className="font-medium text-gray-900">Published At</p>
                          <p>{formatDate(result.published_at)}</p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">Duration</p>
                          <p>{result.duration || "--"}</p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">Video ID</p>
                          <p className="break-all">{result.video_id || "--"}</p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">Submitted URL</p>
                          <p className="break-all">{result.submitted_url}</p>
                        </div>
                      </div>
                    </div>

                    {result.tags && result.tags.length > 0 && (
                      <div className="border border-gray-200 border-t-4 border-t-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                        <h3 className="text-xl font-semibold">Tags</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {result.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.description && (
                      <div className="border border-gray-200 border-t-4 border-t-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                        <h3 className="text-xl font-semibold">Description</h3>
                        <p className="mt-4 max-h-80 overflow-auto whitespace-pre-line text-sm text-gray-700">
                          {result.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm rounded-xl">
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}