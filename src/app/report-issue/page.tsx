import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Report an Issue | Maybank Statement Converter",
    description:
        "Submit feedback or report issues with the Maybank Statement to CSV/Excel Converter tool.",
};

export default function ReportIssuePage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Report an Issue
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        Help us improve the Maybank Statement Converter
                    </p>
                </header>

                <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700 p-8 mb-8">
                    <div className="space-y-6 text-gray-800 dark:text-gray-300">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                How to report an issue
                            </h2>
                            <p>
                                If you encountered an error while converting
                                your statement, or if the data was not extracted
                                correctly, please send an email with the
                                details.
                            </p>
                        </section>

                        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <h3 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                                Important Privacy Note:
                            </h3>
                            <p className="text-sm">
                                To protect your privacy, <strong>DO NOT</strong>{" "}
                                send your original PDF statement. Instead,
                                please describe the issue and, if possible,
                                provide a screenshot of the error or the
                                specific transaction that was incorrectly
                                parsed, ensuring all sensitive personal
                                information is redacted.
                            </p>
                        </section>

                        <div className="text-center py-6">
                            <a
                                href="mailto:raziman.terra@gmail.com?subject=Issue Report - Maybank Statement Converter"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Send Issue Report via Email
                            </a>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                What to include in your report:
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>A brief description of what went wrong.</li>
                                <li>The browser and device you are using.</li>
                                <li>Any error messages you saw.</li>
                            </ul>
                        </section>
                    </div>
                </main>

                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 rounded-md transition-colors"
                    >
                        Return to Converter
                    </Link>
                </div>
            </div>
        </div>
    );
}
