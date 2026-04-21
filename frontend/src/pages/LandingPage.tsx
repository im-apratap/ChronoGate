import { Link } from "react-router-dom";
import { ShieldCheck, Infinity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-full bg-[#050505] min-h-screen font-sans animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="relative w-full h-[105vh] overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2000&auto=format&fit=crop"
            alt="Cinematic Landscape"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#050505]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] h-full via-[#050505]/20 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-20">
          <h1 className="text-5xl md:text-7xl font-serif text-white max-w-4xl leading-tight">
            <span className="italic font-normal text-[#E5E3DC]/90">
              The ChronoGate Protocol:
            </span>
            <br />
            <span className="font-bold tracking-tight">
              Monetize Time, Trustlessly.
            </span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-[#E5E3DC]/70 font-sans max-w-xl font-light tracking-wide leading-relaxed">
            Deploy sovereign, time-based access tiers secured entirely on-chain.
            Creators retain absolute ownership, while communities experience
            frictionless entry.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
            <Link
              to="/discover"
              className="px-10 py-4 bg-[#E5E3DC] text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(229,227,220,0.15)] w-full sm:w-auto"
            >
              Open Directory
            </Link>
            <Link
              to="/creator/register"
              className="px-10 py-4 border border-[#E5E3DC]/30 text-[#E5E3DC] text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#E5E3DC]/10 transition-colors w-full sm:w-auto"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </div>

      {/* Interface Section */}
      <div className="max-w-6xl mx-auto px-6 pb-32 -mt-20 relative z-20">
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#E5E3DC]/50 mb-4">
            Interface 01
          </p>
          <h2 className="text-4xl font-serif text-white italic">
            Access Provision
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-[1000px] mx-auto">
          {/* Left Panel */}
          <div className="flex-1 bg-[#09090b] shadow-2xl border border-[#1A1A1A] p-10 hover:border-[#E5E3DC]/20 transition-colors duration-500">
            <label className="text-[9px] uppercase tracking-[0.2em] text-[#E5E3DC]/50 block mb-3 font-semibold">
              Access Cost (SOL)
            </label>
            <div className="w-full bg-zinc-950/50 border-b border-zinc-700/50 p-4 text-white font-serif text-2xl flex justify-between items-center mb-8">
              <span className="text-[#E5E3DC]/90 tracking-wider">1.50</span>
              <span className="text-[#E5E3DC]/40 text-xs font-sans font-medium tracking-wide">
                SOL
              </span>
            </div>

            <label className="text-[9px] uppercase tracking-[0.2em] text-[#E5E3DC]/50 block mb-4 font-semibold">
              Select Subscription Tier
            </label>
            <div className="space-y-3">
              {[
                { name: "Alpha Traders VIP", dur: "1.50 SOL", active: true },
                {
                  name: "Exclusive 1-on-1 Call",
                  dur: "0.20 SOL",
                  active: false,
                },
                { name: "Lifetime Premium", dur: "5.00 SOL", active: false },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 bg-[#0c0c0e] hover:bg-[#121214] border-l-2 ${c.active ? "border-[#E5E3DC]" : "border-transparent"} cursor-pointer transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center">
                      <div
                        className={`w-2 h-2 rounded-full ${c.active ? "bg-[#E5E3DC]" : "bg-zinc-600"}`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-[#E5E3DC]">
                      {c.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#E5E3DC]/50 tracking-wider bg-zinc-900 px-2 py-0.5 rounded">
                    {c.dur}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-[400px] bg-[#09090b] shadow-2xl border border-[#1A1A1A] p-10 flex flex-col justify-between hover:border-[#E5E3DC]/20 transition-colors duration-500">
            <div>
              <h3 className="font-serif italic text-2xl text-white mb-8">
                Execution Summary
              </h3>
              <div className="space-y-6 text-[13px] text-[#E5E3DC]/60 font-medium">
                <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
                  <span>Creator Share</span>
                  <span className="text-[#E5E3DC]">95.0%</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
                  <span>Access Window</span>
                  <span className="text-[#E5E3DC]">30 Days</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
                  <span>Gas Fee</span>
                  <span className="text-[#E5E3DC]">~0.00001 SOL</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex justify-between items-end mb-8">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#E5E3DC]/40">
                  Total Requisite
                </span>
                <span className="text-3xl font-serif text-white tracking-wide">
                  1.50
                  <span className="text-xs text-[#E5E3DC]/40 ml-2 font-sans tracking-widest">
                    SOL
                  </span>
                </span>
              </div>
              <button className="w-full py-4 bg-[#E5E3DC] text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(229,227,220,0.1)] hover:shadow-[0_0_25px_rgba(229,227,220,0.3)]">
                Authorize Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-[1000px] mx-auto px-6 py-24 flex flex-col md:flex-row gap-16 md:gap-32 items-center">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-16 leading-tight">
            <span className="italic font-normal text-[#E5E3DC]/90">
              Sovereign Fluidity.
            </span>
            <br />
            <span className="font-bold tracking-tight">Zero Waste.</span>
          </h2>
          <div className="space-y-12">
            <div className="flex gap-4 group cursor-default">
              <ShieldCheck
                className="text-[#E5E3DC]/70 group-hover:text-[#E5E3DC] transition-colors flex-shrink-0 mt-1"
                size={24}
                strokeWidth={1.5}
              />
              <div>
                <h4 className="text-base font-bold text-white mb-2 tracking-wide">
                  Immutable Ownership
                </h4>
                <p className="text-sm text-[#E5E3DC]/50 leading-relaxed font-light">
                  As a creator, your digital gates are governed by unalterable
                  smart contracts. No human intervention, no arbitrary bans, and
                  no chargeback risks.
                </p>
              </div>
            </div>
            <div className="flex gap-4 group cursor-default">
              <Infinity
                className="text-[#E5E3DC]/70 group-hover:text-[#E5E3DC] transition-colors flex-shrink-0 mt-1"
                size={24}
                strokeWidth={1.5}
              />
              <div>
                <h4 className="text-base font-bold text-white mb-2 tracking-wide">
                  Instant Settlement
                </h4>
                <p className="text-sm text-[#E5E3DC]/50 leading-relaxed font-light">
                  Capital flows synchronously with time. The exact moment a user
                  authorizes entry, 95% of the capital is instantly routed to
                  your non-custodial wallet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[600px] group overflow-hidden border border-[#E5E3DC]/5">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pb-8"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent z-10 pt-8"></div>
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop"
            alt="Forest"
            className="w-full h-full object-cover filter grayscale opacity-70 group-hover:scale-105 transition-transform duration-[20s] ease-out"
          />
          <div className="absolute bottom-12 left-0 right-0 px-8 z-20">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#E5E3DC]/50 mb-4">
              Core Philosophy
            </p>
            <h3 className="text-2xl font-serif italic text-white leading-snug">
              "To exist in the digital realm without the constant friction of
              extraction."
            </h3>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="w-full bg-[#0A0A0A] border-y border-[#1A1A1A] py-16 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between items-center gap-12">
          {[
            { label: "Total Value Secured (USD)", val: "$12.4M" },
            { label: "Active Access Vaults", val: "2,045" },
            { label: "Network Settlement Time", val: "400ms" },
            { label: "Protocol Uptime", val: "99.99%" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#E5E3DC]/40">
                {stat.label}
              </span>
              <span className="text-3xl font-serif italic text-white tracking-wide">
                {stat.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Architecture */}
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#E5E3DC]/50 mb-4">
            System Architecture
          </p>
          <h2 className="text-4xl font-serif text-white italic">
            The ChronoGate Mechanics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Smart Contract Deployment",
              desc: "Creators initialize their unique Access Vaults on Solana. Immutable parameters safely govern duration, price, and supply boundaries.",
            },
            {
              step: "02",
              title: "Capital Authorization",
              desc: "Communities deposit USDC or SOL into the verified protocol pool, instantly triggering an unalterable timestamped access event.",
            },
            {
              step: "03",
              title: "Automated Extinction",
              desc: "Upon precise duration expiration, the protocol mechanically severs platform privileges across Discord schemas and authenticated apps.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 bg-[#09090b] border border-[#1A1A1A] hover:border-[#E5E3DC]/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-7xl font-serif italic text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                {item.step}
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#E5E3DC]/50 mb-8 font-bold relative z-10">
                Phase {item.step}
              </p>
              <h3 className="text-2xl font-serif text-white mb-4 relative z-10">
                {item.title}
              </h3>
              <p className="text-sm text-[#E5E3DC]/50 leading-relaxed font-light relative z-10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="w-full relative overflow-hidden py-32 md:py-48 border-t border-[#1A1A1A]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#010101] z-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-white italic mb-10 leading-tight">
            Ready to transcend <br /> traditional platforms?
          </h2>
          <p className="text-sm md:text-base text-[#E5E3DC]/50 font-light mb-14 max-w-2xl mx-auto leading-relaxed">
            Reclaim your time and capital. Join the next generation of
            protocol-driven creator economies with unprecedented sovereignty.
          </p>
          <Link
            to="/creator/register"
            className="inline-block px-12 py-5 bg-[#E5E3DC] text-black text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(229,227,220,0.15)] hover:shadow-[0_0_50px_rgba(229,227,220,0.25)]"
          >
            Initialize Your First Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
