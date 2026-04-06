import { useState } from "react";
import { Search, Rocket, CreditCard, Mic, Wrench, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Getting Started",
    icon: Rocket,
    faqs: [
      { q: "How do I start my first practice session?", a: "Go to the Practice page, choose a scenario or type a custom topic, select your difficulty level, and click 'Start Session'. Make sure your microphone is enabled!" },
      { q: "What languages does SpeakFlow support?", a: "Currently SpeakFlow supports English as a target language, with native language support for Azerbaijani, Turkish, Russian, and more coming soon." },
      { q: "How does the AI tutor work?", a: "Our AI tutor Nova listens to your speech in real-time, provides corrections, suggestions, and keeps the conversation flowing naturally — just like a real tutor." },
      { q: "Can I use SpeakFlow on my phone?", a: "Yes! SpeakFlow works on any modern mobile browser. We recommend Chrome or Safari for the best microphone experience." },
    ],
  },
  {
    name: "Account & Billing",
    icon: CreditCard,
    faqs: [
      { q: "How do I upgrade to Pro?", a: "Go to Settings → Subscription and choose a Pro plan. You can pay monthly or annually with a credit card." },
      { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime from Settings → Subscription. You'll keep access until the end of your billing period." },
      { q: "Do you offer refunds?", a: "We offer a full refund within 7 days of purchase if you're not satisfied. Contact support@speakflow.ai." },
      { q: "How do I change my email or password?", a: "Go to Settings → Account to update your email or password. You'll receive a verification email for changes." },
    ],
  },
  {
    name: "Voice Practice",
    icon: Mic,
    faqs: [
      { q: "Why isn't my microphone working?", a: "Make sure you've granted microphone permission in your browser. Click the lock icon in the address bar → Site settings → Microphone → Allow." },
      { q: "How is my pronunciation scored?", a: "We analyze phoneme accuracy, intonation, stress patterns, and fluency to generate a score from 0-100." },
      { q: "Can I review past sessions?", a: "Yes! Go to the Session History page to see all your past sessions, scores, and detailed breakdowns." },
    ],
  },
  {
    name: "Technical Issues",
    icon: Wrench,
    faqs: [
      { q: "The app is running slowly. What should I do?", a: "Try clearing your browser cache, closing other tabs, or switching to Chrome. A stable internet connection is also important for real-time voice processing." },
      { q: "My session keeps disconnecting.", a: "This is usually due to an unstable internet connection. Try moving closer to your router or switching to a wired connection." },
      { q: "Audio playback isn't working.", a: "Check that your device volume is up and not muted. Try using headphones. If the issue persists, restart your browser." },
    ],
  },
];

const Help = () => {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const cat = categories.find((c) => c.name === activeCat);

  const filteredFaqs = search.trim()
    ? categories.flatMap((c) =>
        c.faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).map((f) => ({ ...f, category: c.name }))
      )
    : null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-center">Help & FAQ</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveCat(null); }}
          placeholder="How can we help?"
          className="w-full pl-12 pr-4 py-3 rounded-2xl glass border border-border/30 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Search results */}
      {filteredFaqs ? (
        <div className="space-y-2">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No results found. Try a different search term.</p>
          ) : (
            filteredFaqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={openFaq === f.q} onToggle={() => setOpenFaq(openFaq === f.q ? null : f.q)} />
            ))
          )}
        </div>
      ) : cat ? (
        /* Category FAQ list */
        <div className="space-y-4">
          <button onClick={() => setActiveCat(null)} className="text-sm text-primary hover:text-primary/80 font-medium">← Back to categories</button>
          <h2 className="text-lg font-bold flex items-center gap-2"><cat.icon className="w-5 h-5 text-primary" /> {cat.name}</h2>
          <div className="space-y-2">
            {cat.faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={openFaq === f.q} onToggle={() => setOpenFaq(openFaq === f.q ? null : f.q)} />
            ))}
          </div>
        </div>
      ) : (
        /* Category grid */
        <div className="grid grid-cols-2 gap-4">
          {categories.map((c) => (
            <button key={c.name} onClick={() => setActiveCat(c.name)} className="glass rounded-2xl p-5 text-left glass-hover">
              <c.icon className="w-8 h-8 text-primary mb-3" />
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.faqs.length} articles</p>
            </button>
          ))}
        </div>
      )}

      {/* Contact Support */}
      <div className="glass rounded-2xl p-6 text-center border border-border/30">
        <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-1">Still need help?</h3>
        <p className="text-sm text-muted-foreground mb-1">Email us at <span className="text-foreground font-medium">support@speakflow.ai</span></p>
        <p className="text-xs text-muted-foreground">We typically respond within 24 hours</p>
      </div>
    </div>
  );
};

const FaqItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => (
  <div className="glass rounded-xl overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-hover/30 transition-colors">
      <span className="font-medium text-sm pr-4">{q}</span>
      <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
          <p className="px-4 pb-4 text-sm text-muted-foreground">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Help;
