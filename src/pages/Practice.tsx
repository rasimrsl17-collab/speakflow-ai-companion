import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, MicOff, Volume2, Lightbulb, Square, ChevronRight, Star, TrendingUp, TrendingDown, CheckCircle, Pin, X } from "lucide-react";
import { useCustomToast } from "@/components/CustomToast";

type MicState = "idle" | "recording" | "processing";
type Phase = "select" | "session" | "complete" | "mic-denied";

const scenarioCards = [
  { emoji: "🍽️", title: "Restaurant", desc: "Order food, ask about menu" },
  { emoji: "💼", title: "Job Interview", desc: "Answer common questions" },
  { emoji: "✈️", title: "Travel & Airport", desc: "Navigate, ask directions" },
  { emoji: "🏥", title: "Doctor Visit", desc: "Describe symptoms" },
  { emoji: "📞", title: "Phone Call", desc: "Make appointments" },
  { emoji: "💬", title: "Free Talk", desc: "Any topic you want" },
];

const difficulties = ["Beginner", "Intermediate", "Advanced"];

const mockCompleteStats = {
  overall: 76,
  pronunciation: 82,
  grammar: 68,
  vocabulary: 79,
  fluency: 74,
  pronunciationTrend: "up" as const,
  grammarTrend: "down" as const,
  vocabularyTrend: "up" as const,
  fluencyTrend: "up" as const,
  improvements: [
    "You correctly used present perfect 4 times!",
    "Great use of conditional sentences in ordering.",
  ],
  areasToWork: [
    "Practice 'th' sound — scored 42%",
    "Article usage needs improvement — 'I went to store'",
  ],
  newWords: [
    { word: "appetizer", translation: "iştahaaçan" },
    { word: "complimentary", translation: "pulsuz" },
    { word: "beverage", translation: "içki" },
    { word: "gratuity", translation: "bahşiş" },
  ],
};

const Practice = () => {
  const navigate = useNavigate();
  const { showToast } = useCustomToast();
  const [phase, setPhase] = useState<Phase>("select");
  const [micState, setMicState] = useState<MicState>("idle");
  const [scenario, setScenario] = useState("Restaurant");
  const [customTopic, setCustomTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [timer, setTimer] = useState(0);
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Hello! Let's practice ordering at a restaurant today. Imagine you just walked into a nice restaurant. The waiter approaches you. What would you say?" },
  ]);
  const [transcript, setTranscript] = useState("");
  const [sessionStats, setSessionStats] = useState({ pronunciation: 78, wordsSpoken: 0, errors: 0, newWords: [] as string[] });
  const [rating, setRating] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (phase !== "session") return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleStartSession = () => {
    setPhase("session");
    setTimer(0);
    showToast("info", "Tip: Speak naturally, don't worry about mistakes!");
  };

  const handleEndSession = () => {
    setPhase("complete");
  };

  const handleNavAway = () => {
    if (phase === "session") {
      setShowExitModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const toggleMic = () => {
    if (micState === "idle") {
      setMicState("recording");
      setTranscript("I would like to have a table for two, please...");
      setTimeout(() => {
        setMicState("processing");
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "user" as const, text: "I would like to have a table for two, please." },
            { role: "ai" as const, text: "Great sentence! Your pronunciation was good. Now the waiter shows you the menu. Try ordering a specific dish. You could say something like: 'I would like to order the grilled salmon, please.'" },
          ]);
          setTranscript("");
          setMicState("idle");
          setSessionStats((s) => ({ ...s, wordsSpoken: s.wordsSpoken + 11, pronunciation: 82 }));
        }, 1500);
      }, 2500);
    } else if (micState === "recording") {
      setMicState("processing");
      setTimeout(() => setMicState("idle"), 1000);
    }
  };

  const scoreColor = (score: number) =>
    score >= 80 ? "text-secondary" : score >= 60 ? "text-yellow-400" : "text-accent";

  const scoreBorder = (score: number) =>
    score >= 80 ? "border-secondary" : score >= 60 ? "border-yellow-400" : "border-accent";

  const scoreStroke = (score: number) =>
    score >= 80 ? "hsl(var(--secondary))" : score >= 60 ? "#facc15" : "hsl(var(--accent))";

  // ── Pre-session screen ──
  if (phase === "select") {
    return (
      <div className="min-h-screen bg-background">
        <header className="glass border-b border-border/30 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-semibold">Practice</span>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Choose Your Practice Mode</h1>
            <p className="text-muted-foreground text-sm">Pick a scenario or create your own</p>
          </div>

          {/* Scenario grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {scenarioCards.map((s) => (
              <button
                key={s.title}
                onClick={() => { setScenario(s.title); setCustomTopic(""); }}
                className={`glass rounded-2xl p-5 text-left transition-all hover:scale-[1.02] ${
                  scenario === s.title && !customTopic ? "border-2 border-primary glow-primary-sm" : "border border-transparent"
                }`}
              >
                <span className="text-2xl mb-2 block">{s.emoji}</span>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </button>
            ))}
          </div>

          {/* Custom topic */}
          <div>
            <input
              type="text"
              placeholder="Or type a custom topic..."
              value={customTopic}
              onChange={(e) => { setCustomTopic(e.target.value); if (e.target.value) setScenario(""); }}
              className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent border border-border/30 focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Difficulty */}
          <div className="flex items-center justify-center gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  difficulty === d ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Start button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartSession}
              disabled={!scenario && !customTopic}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-3.5 rounded-xl font-semibold text-base transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
            >
              Start Session <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── Mic denied screen ──
  if (phase === "mic-denied") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 max-w-md w-full text-center space-y-5">
          <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center relative">
            <Mic className="w-10 h-10 text-accent" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center">
              <X className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-bold">Microphone Access Required</h2>
          <p className="text-sm text-muted-foreground">SpeakFlow needs your microphone for voice practice. Please allow access in your browser settings.</p>
          <div className="glass rounded-xl p-4 text-left text-xs text-muted-foreground space-y-1">
            <p><span className="font-medium text-foreground">Chrome:</span> Click the lock icon in address bar → Site settings → Microphone → Allow</p>
          </div>
          <button onClick={() => setPhase("session")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-xl font-semibold transition-all w-full">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Session complete screen ──
  if (phase === "complete") {
    const s = mockCompleteStats;
    const title = s.overall >= 60 ? "Session Complete! 🎉" : "Great effort! 💪";
    const miniStats = [
      { label: "Pronunciation", score: s.pronunciation, trend: s.pronunciationTrend },
      { label: "Grammar", score: s.grammar, trend: s.grammarTrend },
      { label: "Vocabulary", score: s.vocabulary, trend: s.vocabularyTrend },
      { label: "Fluency", score: s.fluency, trend: s.fluencyTrend },
    ];

    return (
      <div className="min-h-screen bg-background/80 backdrop-blur-xl flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl font-bold text-center">{title}</h2>

          {/* Overall score circle */}
          <div className="flex justify-center">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke={scoreStroke(s.overall)} strokeWidth="3" strokeDasharray={`${s.overall} 100`} strokeLinecap="round" />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${scoreColor(s.overall)}`}>{s.overall}</span>
            </div>
          </div>

          {/* Mini stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {miniStats.map((st) => (
              <div key={st.label} className="glass rounded-xl p-3 text-center">
                <p className={`text-lg font-bold ${scoreColor(st.score)}`}>{st.score}%</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-[10px] text-muted-foreground">{st.label}</p>
                  {st.trend === "up" ? <TrendingUp className="w-3 h-3 text-secondary" /> : <TrendingDown className="w-3 h-3 text-accent" />}
                </div>
              </div>
            ))}
          </div>

          {/* Improvements */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Key Improvements</h3>
            <div className="space-y-1.5">
              {s.improvements.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to work on */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Areas to Work On</h3>
            <div className="space-y-1.5">
              {s.areasToWork.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Pin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New words */}
          <div>
            <h3 className="text-sm font-semibold mb-2">New Words</h3>
            <div className="glass rounded-xl p-3 space-y-1.5">
              {s.newWords.map((w) => (
                <div key={w.word} className="flex justify-between text-sm">
                  <span className="font-medium">{w.word}</span>
                  <span className="text-muted-foreground">{w.translation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Star rating */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Rate this session</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="transition-transform hover:scale-110">
                  <Star className={`w-6 h-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={() => { setPhase("select"); setTimer(0); setRating(0); }} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-semibold transition-all">
              Practice Again
            </button>
            <button onClick={() => navigate("/dashboard")} className="flex-1 glass border border-border/50 py-2.5 rounded-xl font-semibold hover:bg-surface-hover transition-all">
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Active session ──
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Session interrupted modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 max-w-sm w-full space-y-4"
            >
              <h3 className="font-bold text-lg">Session Interrupted</h3>
              <p className="text-sm text-muted-foreground">Would you like to save your progress?</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => setShowExitModal(false)} className="bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-semibold transition-all">
                  Resume
                </button>
                <button onClick={() => navigate("/dashboard")} className="glass border border-border/50 py-2.5 rounded-xl font-semibold hover:bg-surface-hover transition-all">
                  Save & Exit
                </button>
                <button onClick={() => navigate("/dashboard")} className="text-accent text-sm font-medium py-2 hover:text-accent/80 transition-colors">
                  Discard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <header className="glass border-b border-border/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={handleNavAway} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-semibold text-sm">{customTopic || scenario}</span>
        </div>
        <span className="text-sm font-mono text-muted-foreground">{formatTime(timer)}</span>
        <button onClick={handleEndSession} className="text-accent text-sm font-medium hover:text-accent/80 transition-colors flex items-center gap-1">
          <Square className="w-3 h-3" /> End
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${msg.role === "user" ? "glass rounded-2xl rounded-br-sm p-4" : "flex gap-3"}`}>
                    {msg.role === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-primary">N</span>
                      </div>
                    )}
                    <div className={msg.role === "ai" ? "glass rounded-2xl rounded-bl-sm p-4" : ""}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.role === "ai" && (
                        <button className="mt-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Live transcript */}
            {transcript && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <div className="glass rounded-2xl rounded-br-sm p-4 max-w-[80%] border-primary/30">
                  <p className="text-sm text-muted-foreground italic">{transcript}<span className="animate-pulse">|</span></p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mic button */}
          <div className="p-6 flex flex-col items-center gap-4">
            <div className="relative">
              {micState === "recording" && (
                <>
                  <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring" />
                  <div className="absolute -inset-4 rounded-full bg-accent/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
                </>
              )}
              <button
                onClick={toggleMic}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                  micState === "idle" ? "bg-primary/20 border-2 border-primary glow-primary" :
                  micState === "recording" ? "bg-accent/20 border-2 border-accent" :
                  "bg-muted border-2 border-border"
                }`}
              >
                {micState === "processing" ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Mic className={`w-8 h-8 ${micState === "recording" ? "text-accent" : "text-primary"}`} />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {micState === "idle" ? "Tap to speak" : micState === "recording" ? "Listening..." : "Processing..."}
            </p>
          </div>

          {/* Bottom controls */}
          <div className="glass border-t border-border/30 p-4">
            <div className="flex justify-center gap-2">
              {difficulties.map((d) => (
                <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1 rounded-lg text-xs transition-all ${difficulty === d ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {d}
                </button>
              ))}
              <button className="px-3 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Hint
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar stats */}
        <aside className="w-full lg:w-72 glass border-l border-border/30 p-4 space-y-6">
          <div>
            <h3 className="text-sm font-bold mb-3">Session Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray={`${sessionStats.pronunciation} 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{sessionStats.pronunciation}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Pronunciation</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-lg font-bold">{sessionStats.wordsSpoken}</p>
                  <p className="text-xs text-muted-foreground">Words</p>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <p className="text-lg font-bold">{sessionStats.errors}</p>
                  <p className="text-xs text-muted-foreground">Errors</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-2">Suggestion</h3>
            <p className="text-xs text-muted-foreground glass rounded-xl p-3">Try saying: "I have been living here for 3 years"</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Practice;
