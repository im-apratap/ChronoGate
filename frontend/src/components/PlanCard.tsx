import { Clock, Zap } from "lucide-react";

export interface Plan {
  id: string;
  name: string;
  duration: string;
  priceSol: string;
  priceUsd: string;
}

export default function PlanCard({
  plan,
  isPurchased = false,
  activePurchasing = false,
  onBuy,
}: {
  plan: Plan;
  isPurchased?: boolean;
  activePurchasing?: boolean;
  onBuy?: () => void;
}) {
  return (
    <div className="relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-border to-background hover:from-purple-500/50 hover:to-background transition-all">
      <div className="bg-background rounded-3xl p-6 h-full flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold text-foreground">{plan.name}</h4>
          <div className="flex items-center gap-2 text-muted mt-2">
            <Clock size={16} />
            <span className="text-sm font-medium">{plan.duration}</span>
          </div>
          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-foreground">
                {plan.priceSol}
              </span>
              <span className="text-purple-400 font-semibold">SOL</span>
            </div>
            <p className="text-muted text-sm font-medium mt-1">
              ≈ ${plan.priceUsd} USD
            </p>
          </div>
        </div>

        <button
          onClick={onBuy}
          disabled={activePurchasing || isPurchased}
          className={`mt-8 w-full py-4 rounded-xl text-sm font-bold transition-all shadow-lg flex justify-center items-center gap-2
            ${
              isPurchased
                ? "bg-zinc-800 text-muted cursor-not-allowed border border-zinc-700"
                : "bg-purple-600 hover:bg-purple-500 text-foreground hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            }
            ${activePurchasing ? "opacity-80 cursor-wait" : ""}
          `}
        >
          {isPurchased ? (
            "Access Active"
          ) : activePurchasing ? (
            "Confirming..."
          ) : (
            <>
              <Zap size={16} />
              Buy Access
            </>
          )}
        </button>
      </div>
    </div>
  );
}
