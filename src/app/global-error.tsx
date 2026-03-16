"use client";

import React from "react";
import { FiRefreshCw, FiAlertOctagon } from "react-icons/fi";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-zinc-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <FiAlertOctagon size={36} className="text-red-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Critical <span className="text-red-400">Error</span>
          </h1>

          <p className="text-zinc-400 text-lg mb-10">
            The application encountered a fatal error. Please try refreshing the page.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
            >
              <FiRefreshCw size={18} /> Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
