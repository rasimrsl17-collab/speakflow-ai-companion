import { motion } from "framer-motion";
import { Mic, BarChart3, TrendingUp, Headphones, Brain, Globe, LineChart, Check, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testimonials } from "@/lib/mockData";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const SoundWave = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
    <div className="flex items-center gap-1">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full animate-soundwave-lg"
          style={{ animationDelay: `${i * 0.08}s`, height: "8px" }}
        />
      ))}
    </div>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const comparisonRows = [
  { feature: "Real voice conversations", speakflow: true, traditional: false, human: true },
  { feature: "AI remembers your progress", speakflow: true, traditional: false, human: false },
  { feature: "Pronunciation scoring 0-100%", speakflow: true, traditional: false, human: false },
  { feature: "Adaptive lessons based on your mistakes", speakflow: true, traditional: true, human: true },
  { feature: "Azerbaijani/Turkish native support", speakflow: true, traditional: true, human: false },
  { feature: "No gamification gimmicks — real practice", speakflow: true, traditional: false, human: true },
];

const faqItems = [
  { q: "Do I need any special equipment?", a: "Just a device with a microphone — your phone, tablet, or computer. No headset required, though one can improve the experience." },
  { q: "How is this different from Duolingo?", a: "Duolingo teaches through quizzes and games. SpeakFlow teaches through real voice conversations. You speak, AI listens, corrects, and remembers. No multiple choice." },
  { q: "Which languages are supported?", a: "Currently: English, Turkish, German, Russian, French. Azerbaijani interface support included. More languages coming soon." },
  { q: "Is my voice data stored?", a: "Voice is processed in real-time and not permanently stored. Only text transcriptions and learning analytics are saved to improve your experience." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel with one click from Settings. No long-term contracts, no questions asked." },
  { q: "How does the AI memory work?", a: "Our AI tutor tracks your pronunciation patterns, grammar errors, and vocabulary over time. Each session builds on the last, so you never waste time repeating what you already know." },
];

const Landing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [showBanner, setShowBanner] = useState(true);
  const navigate = useNavigate();

  const features = [
    { icon: Headphones, title: "Voice-First Practice", desc: "Real conversations, not quizzes" },
    { icon: Brain, title: "Smart Memory", desc: "AI remembers your mistakes and progress across sessions" },
    { icon: Mic, title: "Pronunciation Scoring", desc: "0-100% score on every sentence you speak" },
    { icon: TrendingUp, title: "Adaptive Lessons", desc: "Each session targets your specific weak areas" },
    { icon: Globe, title: "Multiple Languages", desc: "Learn English, Turkish, Russian, German and more" },
    { icon: LineChart, title: "Progress Analytics", desc: "Visual charts showing your improvement over time" },
  ];

  const steps = [
    { icon: Mic, title: "Speak", desc: "Just talk. No typing, no multiple choice. Real conversation." },
    { icon: BarChart3, title: "Get Feedback", desc: "Instant pronunciation scoring, grammar correction, vocabulary tracking." },
    { icon: TrendingUp, title: "Improve", desc: "Your AI tutor remembers everything and adapts to your weaknesses." },
  ];

  const plans = [
    { name: "Free", price: 0, features: ["3 sessions/day", "Basic feedback", "1 language"], cta: "Get Started" },
    { name: "Pro", price: billing === "monthly" ? 14.99 : 11.99, features: ["Unlimited sessions", "Advanced analytics", "Pronunciation scoring", "All languages"], cta: "Get Started", popular: true },
    { name: "Premium", price: billing === "monthly" ? 24.99 : 19.99, features: ["Everything in Pro", "Priority AI", "Personalized curriculum", "Weekly reports"], cta: "Get Started" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Announcement Bar */}
      {showBanner && (
        <div className="relative z-50 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent py-2.5 px-4 text-center text-sm text-foreground">
          <span>🎉 SpeakFlow AI is now in beta — Start free today!</span>
          <button onClick={() => setShowBanner(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-border/30" style={{ top: showBanner ? "40px" : "0" }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">SpeakFlow AI</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/login")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Log in</button>
            <button onClick={() => navigate("/signup")} className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl transition-all hover:scale-105 glow-primary-sm">Start Free</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <SoundWave />
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="flex justify-center gap-3 mb-8 flex-wrap">
            {["Voice-First Learning", "AI Memory System", "24/7 Available"].map((badge) => (
              <span key={badge} className="glass px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground animate-float" style={{ animationDelay: `${Math.random()}s` }}>
                {badge}
              </span>
            ))}
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">Speak Fluently.</span>
            <br />
            <span className="gradient-text">Learn Naturally.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Your AI language tutor that listens, understands, and remembers your journey
          </motion.p>
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("/signup")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 glow-primary text-lg">
              Start Free
            </button>
            <button className="border border-border hover:border-primary/50 text-foreground px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Logos Bar */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-8">Trusted by learners from</p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {["Harvard", "Google", "ASAN", "Türk Telekom"].map((name) => (
              <span key={name} className="text-xl md:text-2xl font-bold text-muted-foreground/40 tracking-wide">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Everything You Need to Speak With Confidence</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-2xl p-6 glass-hover group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Not Another Duolingo Clone</h2>
          <div className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-4 text-muted-foreground font-medium">Feature</th>
                    <th className="p-4 text-center font-bold text-primary">SpeakFlow AI</th>
                    <th className="p-4 text-center font-medium text-muted-foreground">Traditional Apps</th>
                    <th className="p-4 text-center font-medium text-muted-foreground">
                      Human Tutors
                      <span className="block text-xs text-muted-foreground/60 mt-0.5">$30-50/hour</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0">
                      <td className="p-4 text-muted-foreground">{row.feature}</td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-secondary mx-auto" /></td>
                      <td className="p-4 text-center">
                        {row.traditional ? <Check className="w-5 h-5 text-secondary/60 mx-auto" /> : <X className="w-5 h-5 text-destructive/70 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.human ? <Check className="w-5 h-5 text-secondary/60 mx-auto" /> : <X className="w-5 h-5 text-destructive/70 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-lg mb-10">Join <span className="text-foreground font-bold">10,000+</span> learners speaking with confidence</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-2xl p-6 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{t.avatar}</div>
                  <span className="font-semibold text-sm">{t.name}</span>
                </div>
                <p className="text-muted-foreground text-sm italic">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-center mb-8">Start for free, upgrade when you're ready</p>
          <div className="flex justify-center mb-12">
            <div className="glass rounded-full p-1 flex">
              <button onClick={() => setBilling("monthly")} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Monthly</button>
              <button onClick={() => setBilling("yearly")} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billing === "yearly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Yearly <span className="text-secondary text-xs">Save 20%</span></button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`glass rounded-2xl p-6 relative ${plan.popular ? "border-primary/50 glow-primary-sm" : ""}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black">${plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground text-sm">/mo</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("/signup")} className={`w-full py-3 rounded-xl font-semibold transition-all hover:scale-105 text-sm ${plan.popular ? "bg-primary text-primary-foreground glow-primary-sm" : "border border-border hover:border-primary/50"}`}>
                  {plan.cta} <ChevronRight className="w-4 h-4 inline" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-2xl border-0 px-6 overflow-hidden">
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-5">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/60 p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Start Speaking?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">Join thousands of learners who chose conversation over quizzes.</p>
            <button onClick={() => navigate("/signup")} className="bg-white text-background font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105 text-lg">
              Start Free — No Credit Card
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-bold gradient-text">SpeakFlow AI</span>
              <p className="text-muted-foreground text-xs mt-2">Built with AI for humans who want to speak</p>
            </div>
            {/* Product */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Roadmap</a></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            {/* Connect */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>🇦🇿 AZ</span><span>|</span>
              <span>🇹🇷 TR</span><span>|</span>
              <span>🇬🇧 EN</span><span>|</span>
              <span>🇷🇺 RU</span>
            </div>
            <p className="text-xs text-muted-foreground">Built with ❤️ in Baku</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
