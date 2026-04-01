"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TermsPage() {
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
              <h1 className="text-3xl font-bold">Terms of Service</h1>
              <p className="mt-2 text-gray-500">Effective Date: April 1, 2026</p>
              <p className="mt-4 text-gray-700">
                These Terms of Service govern your use of YouRise AI. By using
                the service, you agree to these terms.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">1. Overview</h2>
                <p className="mt-3 text-gray-700">
                  YouRise AI is a tool that analyzes publicly available YouTube
                  content and generates AI-assisted insights, scores, and
                  suggestions based on submitted video URLs.
                </p>
                <p className="mt-3 text-gray-700">
                  The service is provided for informational and general use
                  purposes only and may be updated, changed, or removed at any
                  time.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">2. No Accounts</h2>
                <p className="mt-3 text-gray-700">
                  YouRise AI does not currently require or support user
                  accounts.
                </p>
                <p className="mt-3 text-gray-700">
                  Use of the service is session-based, and submitted analyses
                  are not tied to a persistent personal account or stored user
                  dashboard.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
                <p className="mt-3 text-gray-700">
                  You agree to use the service only in a lawful and respectful
                  manner.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>Do not misuse, overload, or interfere with the service</li>
                  <li>Do not attempt to gain unauthorized access to the app or its systems</li>
                  <li>Do not use the service for unlawful, abusive, or harmful purposes</li>
                  <li>Do not attempt to copy, scrape, or exploit the platform in an improper way</li>
                </ul>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">4. AI-Generated Output Disclaimer</h2>
                <p className="mt-3 text-gray-700">
                  YouRise AI uses artificial intelligence to generate summaries,
                  scores, recommendations, and other insights.
                </p>
                <p className="mt-3 text-gray-700">
                  These outputs may be incomplete, inaccurate, outdated, or not
                  suitable for every use case.
                </p>
                <p className="mt-3 text-gray-700">
                  The service does not guarantee performance outcomes, channel
                  growth, search ranking improvements, or the accuracy of any
                  generated recommendation.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">5. Use at Your Own Risk</h2>
                <p className="mt-3 text-gray-700">
                  Your use of the service and your reliance on any output is at
                  your own risk.
                </p>
                <p className="mt-3 text-gray-700">
                  You are responsible for evaluating whether any information,
                  suggestion, or analysis produced by the platform is
                  appropriate for your situation.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
                <p className="mt-3 text-gray-700">
                  To the fullest extent permitted by law, YouRise AI shall not
                  be liable for any losses, damages, or consequences resulting
                  from your use of the service or reliance on its outputs.
                </p>
                <p className="mt-3 text-gray-700">
                  This includes, without limitation, decisions made based on AI
                  insights, business or channel strategy changes, lost views,
                  reduced engagement, or other indirect outcomes.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">7. Third-Party Services</h2>
                <p className="mt-3 text-gray-700">
                  The service may rely on third-party services and APIs,
                  including YouTube-related metadata services and OpenAI, in
                  order to generate results.
                </p>
                <p className="mt-3 text-gray-700">
                  We are not responsible for the availability, content,
                  accuracy, or policies of third-party services.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">8. Service Availability</h2>
                <p className="mt-3 text-gray-700">
                  We do not guarantee that the service will always be available,
                  uninterrupted, secure, or error-free.
                </p>
                <p className="mt-3 text-gray-700">
                  Features may change over time, and the service may be modified,
                  suspended, or discontinued without notice.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#0f8c8d] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">9. Changes to These Terms</h2>
                <p className="mt-3 text-gray-700">
                  These Terms of Service may be updated from time to time.
                  Continued use of the service after changes are posted
                  constitutes acceptance of the updated terms.
                </p>
              </div>

              <div className="border border-gray-200 border-l-4 border-l-[#ff3131] bg-white p-6 shadow-sm rounded-none">
                <h2 className="text-xl font-semibold">10. Contact</h2>
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