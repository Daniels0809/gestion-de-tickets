"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import i18n from "../app/i18n";
// import { Globe } from "lucide-react";

const Navbar = () => {
//   const { t } = useTranslation();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

//   function changeLanguage(lang: string) {
//     i18n.changeLanguage(lang);
//   }

  const userRole = session?.user?.role;

  return (
    <nav className="bg-black border-b border-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="group select-none">
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              HelpDesk
            </span>{" "}
            <span className="text-slate-300">Pro</span>
          </h1>
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-6">
            {/* Dashboard según rol */}
            {userRole === "agent" && (
              <Link
                href="/agentDashboard"
                className="hover:text-cyan-400 transition font-medium"
              >
                {("Agent Dashboard")}
              </Link>
            )}
            {userRole === "client" && (
              <Link
                href="/clientDashboard"
                className="hover:text-cyan-400 transition font-medium"
              >
                {("Client Dashboard")}
              </Link>
            )}

            <Link
              href="/tickets"
              className="hover:text-cyan-400 transition font-medium"
            >
              {("Tickets")}
            </Link>

            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700 hover:border-cyan-400/40 transition-all shadow-md"
              >
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-slate-600 shadow-lg"
                />
                <div className="hidden md:flex flex-col leading-tight max-w-[140px] text-left">
                  <span className="text-sm font-semibold text-white truncate">
                    {session.user.name?.split(" ")[0]}
                  </span>
                  <span className="text-xs text-slate-400 truncate">
                    {session.user.email}
                  </span>
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-3 space-y-2 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left text-sm px-3 py-2 rounded-md bg-red-500/80 hover:bg-red-600 transition text-white shadow-md"
                  >
                    {("Logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-x-3 flex items-center">
            <button
              onClick={() => signIn()}
              className="px-4 py-2 rounded-md font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition shadow-md"
            >
              {("Login")}
            </button>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md font-medium bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition shadow-md"
            >
              {("Register")}
            </Link>
          </div>
        )}

        {/* <div>
          <button
            onClick={() =>
              changeLanguage(i18n.language === "en" ? "es" : "en")
            }
            className="px-3 py-1 rounded-md border border-slate-600 hover:border-cyan-400 transition text-sm flex items-center gap-2"
          >
            <Globe className="w-5 h-5" />
            {i18n.language.toUpperCase()}
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
