"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut, FiSettings, FiAward, FiFileText } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth_token");
    if (auth !== "local-dev-admin-token") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_token");
    router.push("/admin");
  };

  if (!isAuthenticated) return null; // Prevent flash of content

  return (
    <div className="h-screen w-full overflow-hidden bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center border border-red-500/20">
            <FiSettings size={18} />
          </div>
          <div>
            <h2 className="font-bold text-white leading-tight">Admin Portal</h2>
            <p className="text-xs text-red-400">Local Dev Only</p>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              pathname === "/admin/dashboard" ? "bg-purple-600/10 text-purple-400 border border-purple-500/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <FiFileText size={18} />
            Projects
          </Link>
          <Link
            href="/admin/dashboard/achievements"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              pathname === "/admin/dashboard/achievements" ? "bg-purple-600/10 text-purple-400 border border-purple-500/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <FiAward size={18} />
            Achievements
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-red-500/10 hover:text-red-400 rounded-xl text-zinc-400 transition-colors"
          >
            <FiLogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
          <h2 className="font-bold text-white">Admin Portal</h2>
          <button onClick={handleLogout} className="text-zinc-400 hover:text-white p-2">
            <FiLogOut size={20} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-zinc-950">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
