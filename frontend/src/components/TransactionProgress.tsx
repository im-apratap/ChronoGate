import { Check, Loader2, CircleDashed } from "lucide-react";

export function TransactionProgress({ step }: { step: 0 | 1 | 2 | 3 }) {
  // 0: Initial, 1: Sent, 2: Confirmed, 3: Completed

  const steps = [
    { label: "Sign Transaction", id: 1 },
    { label: "Confirming...", id: 2 },
    { label: "Access Granted", id: 3 },
  ];

  if (step === 0) return null;

  return (
    <div className="w-full bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 p-6 flex items-center justify-between mt-4">
      {steps.map((s, idx) => {
        const isActive = step === s.id;
        const isPast = step > s.id;

        return (
          <div key={s.id} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                isPast
                  ? "bg-green-500 border-green-500 text-white"
                  : isActive
                    ? "border-purple-500 text-purple-400 bg-purple-500/10"
                    : "border-zinc-700 text-zinc-600"
              }`}
            >
              {isPast ? (
                <Check size={14} strokeWidth={3} />
              ) : isActive && s.id < 3 ? (
                <Loader2 size={14} className="animate-spin" />
              ) : isActive && s.id === 3 ? (
                <Check size={14} strokeWidth={3} />
              ) : (
                <CircleDashed size={14} />
              )}
            </div>
            <span
              className={`text-sm font-semibold hidden md:block ${
                isPast
                  ? "text-zinc-200"
                  : isActive
                    ? "text-purple-400"
                    : "text-zinc-600"
              }`}
            >
              {s.label}
            </span>
            {idx < steps.length - 1 && (
              <div
                className={`w-4 md:w-16 lg:w-24 h-0.5 ml-3 ${step > idx + 1 ? "bg-green-500" : "bg-zinc-800"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
