import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WalletConnectButton from "./components/WalletConnectButton";
import LandingPage from "./pages/LandingPage";
import Discover from "./pages/Discover";
import CreatorProfile from "./pages/CreatorProfile";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#E5E3DC] font-sans selection:bg-white/20">
        <nav className="fixed w-full top-0 z-50 bg-black/10 backdrop-blur-xl border-b border-[#E5E3DC]/10">
          <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-serif italic text-white tracking-widest cursor-pointer"
            >
              ChronoGate
            </Link>
            <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-[#E5E3DC]/70">
              <Link
                to="/discover"
                className="hover:text-white transition-colors"
              >
                Discover
              </Link>
              <Link
                to="/my-access"
                className="hover:text-white transition-colors"
              >
                My Access
              </Link>
              <Link
                to="/creator/register"
                className="hover:text-white transition-colors"
              >
                For Creators
              </Link>
            </div>
            <WalletConnectButton />
          </div>
        </nav>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/discover"
              element={
                <div className="max-w-7xl mx-auto px-6 pt-32">
                  <Discover />
                </div>
              }
            />
            <Route
              path="/my-access"
              element={
                <div className="max-w-7xl mx-auto px-6 py-32">
                  <h1 className="text-4xl font-serif italic text-white mb-8">
                    Vault Status
                  </h1>
                </div>
              }
            />
            <Route path="/c/:slug" element={<CreatorProfile />} />
            <Route
              path="/creator/dashboard"
              element={
                <div className="max-w-7xl mx-auto px-6 py-32">
                  Creator Dashboard
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="w-full border-t border-[#1A1A1A] bg-[#050505] py-8">
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-[#E5E3DC]/40">
            <span className="font-serif italic text-sm text-[#E5E3DC]/70 tracking-widest">
              ChronoGate
            </span>
            <div className="flex gap-8">
              <span className="cursor-pointer hover:text-[#E5E3DC] transition-colors">
                Terms
              </span>
              <span className="cursor-pointer hover:text-[#E5E3DC] transition-colors">
                Privacy
              </span>
              <span className="cursor-pointer hover:text-[#E5E3DC] transition-colors">
                Twitter
              </span>
            </div>
            <span>© 2026 ChronoGate. All Rights Reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
