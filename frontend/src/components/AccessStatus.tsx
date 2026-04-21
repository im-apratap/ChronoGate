import { useEffect, useState } from "react";
import { Timer, AlertCircle, CheckCircle2 } from "lucide-react";

export function AccessStatus({
  expiryDate,
  onRenew,
}: {
  expiryDate: number;
  onRenew: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = expiryDate - now;
      if (diff <= 0) {
        setIsActive(false);
        setTimeLeft("Expired");
        return;
      }
      setIsActive(true);
      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;
      setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div
      className={`p-4 rounded-2xl border flex items-center justify-between ${isActive ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}
    >
      <div className="flex items-center gap-4">
        {isActive ? (
          <CheckCircle2 className="text-green-500" size={24} />
        ) : (
          <AlertCircle className="text-red-500" size={24} />
        )}
        <div>
          <h4
            className={`text-sm font-bold ${isActive ? "text-green-500" : "text-red-500"}`}
          >
            {isActive ? "Access Active" : "Access Expired"}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-zinc-400">
            <Timer size={14} />
            <span className="text-xs font-mono tag tracking-wider">
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      {!isActive && (
        <button
          onClick={onRenew}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Renew Access
        </button>
      )}
    </div>
  );
}
