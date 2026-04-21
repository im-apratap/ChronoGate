import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import WalletConnectButton from "./components/WalletConnectButton";
import LandingPage from "./pages/LandingPage";
import Discover from "./pages/Discover";
import CreatorProfile from "./pages/CreatorProfile";
import { Menu, X } from "lucide-react";
import "./index.css";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground/20 transition-colors duration-300">
        <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-serif italic tracking-widest cursor-pointer text-accent"
            >
              ChronoGate
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 lg:gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-foreground/70">
              <Link
                to="/discover"
                className="hover:text-accent transition-colors"
              >
                Discover
              </Link>
              <Link
                to="/my-access"
                className="hover:text-accent transition-colors"
              >
                My Access
              </Link>
              <Link
                to="/creator/register"
                className="hover:text-accent transition-colors"
              >
                For Creators
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <WalletConnectButton />
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border/20 p-6 flex flex-col gap-6 shadow-xl">
              <Link
                to="/discover"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/70 hover:text-accent uppercase tracking-widest text-sm"
              >
                Discover
              </Link>
              <Link
                to="/my-access"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/70 hover:text-accent uppercase tracking-widest text-sm"
              >
                My Access
              </Link>
              <Link
                to="/creator/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/70 hover:text-accent uppercase tracking-widest text-sm"
              >
                For Creators
              </Link>
              <div className="mt-4">
                <WalletConnectButton />
              </div>
            </div>
          )}
        </nav>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/discover"
              element={
                <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32">
                  <Discover />
                </div>
              }
            />
            <Route
              path="/my-access"
              element={
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-32">
                  <h1 className="text-3xl md:text-4xl font-serif italic text-accent mb-8">
                    Vault Status
                  </h1>
                </div>
              }
            />
            <Route path="/c/:slug" element={<CreatorProfile />} />
            <Route
              path="/creator/dashboard"
              element={
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-32">
                  Creator Dashboard
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="w-full border-t border-border bg-background py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-foreground/40 gap-4 md:gap-0">
            <span className="font-serif italic text-sm text-foreground/70 tracking-widest">
              ChronoGate
            </span>
            <div className="flex gap-6 md:gap-8">
              <span className="cursor-pointer hover:text-foreground transition-colors">
                Terms
              </span>
              <span className="cursor-pointer hover:text-foreground transition-colors">
                Privacy
              </span>
              <span className="cursor-pointer hover:text-foreground transition-colors">
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
