import { Link } from "react-router-dom";
import { Users, BadgeCheck } from "lucide-react";

export interface Creator {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  subscribers: number;
  verified: boolean;
  lowestPrice: string;
}

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="bg-foreground/5 backdrop-blur-xl border border-border rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-all group">
      <div className="h-32 w-full bg-gradient-to-br from-border to-background relative">
        {creator.verified && (
          <div className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm p-1 rounded-full cursor-help hover:scale-110 transition-transform">
            <BadgeCheck size={18} className="text-white" />
          </div>
        )}
      </div>
      <div className="px-6 py-6 pb-8 relative -mt-12">
        <img
          src={creator.imageUrl}
          alt={creator.name}
          className="w-20 h-20 rounded-2xl border-4 border-background bg-border object-cover mb-4 shadow-xl"
        />
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          {creator.name}
        </h3>
        <p className="text-muted text-sm mt-2 line-clamp-2">
          {creator.description}
        </p>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-muted">
            <Users size={16} />
            <span className="text-sm font-medium">{creator.subscribers}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted uppercase tracking-wider font-semibold">
              From
            </span>
            <div className="text-lg font-bold text-purple-400">
              {creator.lowestPrice} SOL
            </div>
          </div>
        </div>

        <Link
          to={`/c/${creator.slug}`}
          className="mt-6 w-full py-3 rounded-xl bg-border text-sm font-semibold hover:bg-zinc-700 hover:text-white transition-colors flex justify-center items-center text-zinc-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
