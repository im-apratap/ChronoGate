import CreatorCard, { type Creator } from "../components/CreatorCard";

const MOCK_CREATORS: Creator[] = [
  {
    name: "Alpha Traders",
    slug: "alpha-traders",
    description:
      "Daily trading signals, weekly market reviews, and a premium 24/7 Discord community.",
    imageUrl:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Alpha&backgroundColor=000000",
    subscribers: 1240,
    verified: true,
    lowestPrice: "0.2",
  },
  {
    name: "Dr. Developer",
    slug: "dr-dev",
    description:
      "1-on-1 career coaching, resume review, and private code reviews for aspiring engineers.",
    imageUrl:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Dev&backgroundColor=000000",
    subscribers: 56,
    verified: false,
    lowestPrice: "1.5",
  },
];

export default function Discover() {
  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 text-foreground">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Discover Creators
          </h1>
          <p className="text-muted mt-2 text-lg">
            Find communities, experts, and exclusive insights.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CREATORS.map((c) => (
          <CreatorCard key={c.slug} creator={c} />
        ))}
      </div>
    </div>
  );
}
