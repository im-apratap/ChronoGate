import { useParams } from "react-router-dom";
import {
  BadgeCheck,
  Users,
  Shield,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import PlanCard from "../components/PlanCard";
import { TransactionProgress } from "../components/TransactionProgress";
import { useState } from "react";
import { AccessStatus } from "../components/AccessStatus";

// Mock data
const CREATOR = {
  name: "Alpha Traders",
  slug: "alpha-traders",
  description:
    "Daily trading signals, weekly market reviews, and a premium 24/7 Discord community.",
  imageUrl:
    "https://api.dicebear.com/7.x/shapes/svg?seed=Alpha&backgroundColor=000000",
  bannerUrl:
    "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80",
  subscribers: 1240,
  verified: true,
  plans: [
    {
      id: "1",
      name: "1 Hour Mentorship",
      duration: "1 Hour",
      priceSol: "0.2",
      priceUsd: "35",
    },
    {
      id: "2",
      name: "Monthly VIP",
      duration: "30 Days",
      priceSol: "1.5",
      priceUsd: "250",
    },
  ],
};

export default function CreatorProfile() {
  const { slug } = useParams();
  const [purchaseStep, setPurchaseStep] = useState<0 | 1 | 2 | 3>(0);
  const [activeExpiry, setActiveExpiry] = useState<number | null>(null);

  // Mock buy action
  const handleBuy = (planId: string) => {
    console.log("Buying plan:", planId, "for creator:", slug);
    setPurchaseStep(1);
    setTimeout(() => setPurchaseStep(2), 2000);
    setTimeout(() => {
      setPurchaseStep(3);
      setActiveExpiry(Math.floor(Date.now() / 1000) + 3600);
      setTimeout(() => setPurchaseStep(0), 4000);
    }, 4000);
  };

  return (
    <div className="pb-20 animate-in fade-in duration-500">
      {/* Banner */}
      <div className="h-64 w-full rounded-bg-background overflow-hidden relative">
        <img
          src={CREATOR.bannerUrl}
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
      </div>

      {/* Profile Header */}
      <div className="max-w-5xl mx-auto px-6 relative -mt-24">
        <div className="flex flex-col md:flex-row gap-6 md:items-end">
          <img
            src={CREATOR.imageUrl}
            alt={CREATOR.name}
            className="w-32 h-32 rounded-3xl border-4 border-border bg-zinc-800 object-cover shadow-2xl"
          />
          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-extrabold text-foreground flex items-center gap-3">
              {CREATOR.name}
              {CREATOR.verified && (
                <BadgeCheck className="text-purple-500" size={28} />
              )}
            </h1>
            <p className="text-muted mt-2 text-lg max-w-2xl">
              {CREATOR.description}
            </p>
          </div>
          <div className="flex items-center gap-3 pb-2">
            <button className="p-3 bg-foreground/5 border border-border rounded-xl hover:bg-zinc-800 transition-colors">
              <Share2 size={20} className="text-muted" />
            </button>
            <button className="p-3 bg-foreground/5 border border-border rounded-xl hover:bg-zinc-800 transition-colors">
              <LinkIcon size={20} className="text-muted" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-8 py-6 border-y border-border">
          <div className="flex items-center gap-2 text-foreground">
            <Users size={18} className="text-purple-400" />
            <span className="font-bold text-lg">{CREATOR.subscribers}</span>
            <span className="text-muted font-medium">Active Members</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Shield size={18} className="text-green-400" />
            <span className="font-bold text-lg">Secured</span>
            <span className="text-muted font-medium">by Smart Contract</span>
          </div>
        </div>

        {/* Access Status (if active) */}
        {activeExpiry && (
          <div className="mt-8 animate-in slide-in-from-top-4">
            <AccessStatus
              expiryDate={activeExpiry}
              onRenew={() => handleBuy("1")}
            />
          </div>
        )}

        {/* Transaction Flow */}
        <TransactionProgress step={purchaseStep} />

        {/* Plans */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">
            Access Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREATOR.plans.map((p) => (
              <PlanCard
                key={p.id}
                plan={p}
                activePurchasing={purchaseStep > 0}
                onBuy={() => handleBuy(p.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
