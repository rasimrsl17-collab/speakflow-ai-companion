import { useState } from "react";
import { Gift, Copy, Check, Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";

const REFERRAL_LINK = "https://speakflow.ai/ref/USER123";

const shareButtons = [
  { name: "WhatsApp", color: "bg-green-600 hover:bg-green-700", url: `https://wa.me/?text=Learn%20English%20with%20AI%20on%20SpeakFlow!%20${encodeURIComponent(REFERRAL_LINK)}` },
  { name: "Telegram", color: "bg-blue-500 hover:bg-blue-600", url: `https://t.me/share/url?url=${encodeURIComponent(REFERRAL_LINK)}&text=Learn%20English%20with%20AI%20on%20SpeakFlow!` },
  { name: "X", color: "bg-foreground/90 hover:bg-foreground", url: `https://twitter.com/intent/tweet?text=Learn%20English%20with%20AI%20on%20SpeakFlow!&url=${encodeURIComponent(REFERRAL_LINK)}` },
  { name: "Email", color: "bg-muted-foreground/60 hover:bg-muted-foreground/80", url: `mailto:?subject=Try%20SpeakFlow%20AI&body=Check%20out%20SpeakFlow%20for%20learning%20English%20with%20AI!%20${encodeURIComponent(REFERRAL_LINK)}` },
];

const Referral = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-lg">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <Gift className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Invite Friends, Earn Rewards</h1>
        <p className="text-muted-foreground text-sm">Share your link — you both get 7 days of Pro free!</p>
      </div>

      {/* Referral link */}
      <div className="glass rounded-2xl p-4 flex items-center gap-3">
        <input readOnly value={REFERRAL_LINK} className="flex-1 bg-transparent text-sm text-foreground truncate outline-none" />
        <button onClick={handleCopy} className="shrink-0 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 hover:bg-primary/90 transition-colors">
          {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
      </div>

      {/* Share buttons */}
      <div className="grid grid-cols-4 gap-3">
        {shareButtons.map((b) => (
          <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className={`${b.color} text-white rounded-xl py-3 text-center text-xs font-semibold transition-colors`}>
            {b.name}
          </a>
        ))}
      </div>

      {/* Your Referrals */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-4">Your Referrals</h2>
        <div className="flex flex-col items-center py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
            <UserPlus className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm mb-1">0 friends invited</p>
          <p className="text-xs text-muted-foreground">Share your link to start earning free Pro days!</p>
        </div>
      </div>
    </div>
  );
};

export default Referral;
