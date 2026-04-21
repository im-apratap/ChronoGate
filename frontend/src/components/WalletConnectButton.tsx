import { usePrivy } from "@privy-io/react-auth";

const appId = import.meta.env.VITE_PRIVY_APP_ID || "replace-with-real-app-id";

export default function WalletConnectButton() {
  const isMock =
    !appId || appId === "replace-with-real-app-id" || appId.trim() === "";

  if (isMock) {
    return (
      <button
        onClick={() =>
          alert(
            "Please add your Privy App ID to the .env file to enable Wallet connection!",
          )
        }
        className="px-6 py-2.5 bg-[#E5E3DC] text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
      >
        Connect Wallet
      </button>
    );
  }

  return <RealWalletConnectButton />;
}

function RealWalletConnectButton() {
  const { login, logout, authenticated, user } = usePrivy();

  if (authenticated && user) {
    const address = user.wallet?.address || user.email?.address || "Unknown";
    const shortAddress =
      address !== "Unknown"
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connected";

    return (
      <button
        onClick={logout}
        className="px-6 py-2.5 border border-[#E5E3DC]/30 text-[#E5E3DC] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#E5E3DC]/10 transition-colors flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#E5E3DC]/80"></div>
        {shortAddress}
      </button>
    );
  }

  return (
    <button
      onClick={login}
      className="px-6 py-2.5 bg-[#E5E3DC] text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
    >
      Connect Wallet
    </button>
  );
}
