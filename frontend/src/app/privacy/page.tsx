"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivacyPage() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-gray-900">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 h-screen w-36 border-r border-gray-200 bg-[#f1f1f2] p-0">
          <div className="flex h-screen flex-col justify-between">
            <div className="flex flex-col">
              <Link
                href="/"
                className={`flex h-36 w-36 flex-col items-center justify-center gap-2 border-b border-gray-200 transition-colors duration-150 ${
                  pathname === "/"
                    ? "bg-[#0f8c8d] text-white"
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
                <span className="text-[11px] font-medium tracking-wide text-center px-2">
                  Long-form YouTube Analyzer
                </span>
              </Link>

              <button
                disabled
                className="flex h-36 w-36 flex-col items-center justify-center gap-2 border-b border-gray-200 bg-white text-gray-400 transition-colors duration-150 hover:bg-gray-100"
              >
                <Image
                  src="/phone.png"
                  alt="Short-form Analyzer"
                  width={42}
                  height={42}
                  className="h-auto w-10"
                />
                <span className="text-[11px] font-medium tracking-wide text-center px-2">
                  Short-form Analyzer (Coming Soon)
                </span>
              </button>
            </div>

            <div>
              <Link
                href="/tos"
                className={`flex h-36 w-36 flex-col items-center justify-center gap-2 border-b border-gray-200 transition-colors duration-150 ${
                  pathname === "/tos"
                    ? "bg-[#0f8c8d] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Image
                  src="/faq.png"
                  alt="Terms of Service"
                  width={42}
                  height={42}
                  className="h-auto w-10"
                />
                <span className="text-[11px] font-medium tracking-wide text-center px-2">
                  Terms of Service
                </span>
              </Link>

              <Link
                href="/privacy"
                className={`flex h-36 w-36 flex-col items-center justify-center gap-2 border-b border-gray-200 transition-colors duration-150 ${
                  pathname === "/privacy"
                    ? "bg-[#0f8c8d] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Image
                  src="/privacy.png"
                  alt="Privacy Policy"
                  width={42}
                  height={42}
                  className="h-auto w-10"
                />
                <span className="text-[11px] font-medium tracking-wide">
                  Privacy Policy
                </span>
              </Link>
            </div>
          </div>
        </aside>

        <section className="flex-1 p-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="border border-gray-200 border-t-4 border-t-[#ff3131] bg-white p-8 shadow-sm rounded-none">
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="mt-2 text-gray-500">Effective Date: April 1, 2026</p>
              <p className="mt-4 text-gray-700">
                This Privacy Policy explains how YouRise AI collects, uses, and
                handles information when you use the platform.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">1. Overview</h2>
                <p className="mt-3 text-gray-700">
                  YouRise AI is a YouTube video analysis tool. Users can submit a
                  YouTube video URL to receive generated insights, metadata
                  analysis, and related scoring information.
                </p>
                <p className="mt-3 text-gray-700">
                  At this time, YouRise AI does not offer user accounts, user
                  profiles, or permanent saved histories of analyses.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">2. Information We Process</h2>
                <p className="mt-3 text-gray-700">
                  When you use the service, we may process information that is
                  necessary to analyze the video you submit. This may include:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>The YouTube URL you submit</li>
                  <li>Associated publicly available video metadata</li>
                  <li>Basic technical request data needed for the app to function</li>
                </ul>
                <p className="mt-3 text-gray-700">
                  We do not ask you to create an account, and we do not collect
                  account credentials, profile information, or personal dashboard
                  data through the app.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">3. No Account-Based Storage</h2>
                <p className="mt-3 text-gray-700">
                  Because YouRise AI currently does not support accounts, submitted
                  analyses are not tied to a persistent user identity.
                </p>
                <p className="mt-3 text-gray-700">
                  In the current version of the app, analysis results are generally
                  session-based and may disappear when the page is refreshed,
                  closed, or restarted.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">4. How Information Is Used</h2>
                <p className="mt-3 text-gray-700">
                  Submitted information is used only to operate the analyzer and
                  generate results for the requested video. This may include:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>Retrieving relevant public video information</li>
                  <li>Generating AI-assisted summaries and suggestions</li>
                  <li>Displaying analysis results within the app</li>
                  <li>Supporting basic app functionality and reliability</li>
                </ul>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">5. Third-Party Services</h2>
                <p className="mt-3 text-gray-700">
                  The service may rely on third-party tools and APIs in order to
                  function. These may include:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>YouTube and related video metadata services</li>
                  <li>OpenAI for AI-generated analysis and insights</li>
                </ul>
                <p className="mt-3 text-gray-700">
                  Information necessary to generate results may be processed through
                  these services. Their handling of data is governed by their own
                  policies and practices.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">6. Cookies and Technical Data</h2>
                <p className="mt-3 text-gray-700">
                  The app may use limited technical or browser-based data necessary
                  for normal operation, performance, and basic usability.
                </p>
                <p className="mt-3 text-gray-700">
                  No claim is made that personal browsing profiles or account-based
                  activity histories are maintained through the current version of
                  the service.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">7. Data Retention</h2>
                <p className="mt-3 text-gray-700">
                  YouRise AI is not designed at this time to provide persistent
                  storage of user-submitted analyses. Submitted URLs and generated
                  results may be processed temporarily for the purpose of returning
                  a response, but they are not intended to be saved for long-term
                  account access within the app.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">8. Your Choices</h2>
                <p className="mt-3 text-gray-700">
                  Because the app does not currently provide accounts, there is no
                  user dashboard for managing saved data.
                </p>
                <p className="mt-3 text-gray-700">
                  If you have questions about this Privacy Policy or would like to
                  reach out regarding the service, you may contact us directly.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">9. Contact</h2>
                <p className="mt-3 text-gray-700">
                  Email: <span className="font-medium">alexko22222@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}