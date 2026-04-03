import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic, Volume2, Lightbulb, Square } from "lucide-react";

type MicState = "idle" | "recording" | "processing";

const scenarios = ["Restaurant", "Job Interview", "Travel", "Free Talk", "Custom Topic"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

const Practice = () => {
  const navigate = useNavigate();
  const [micState, setMicState] = useState<MicState>("idle");
  const [scenario, setScenario] = useState("Restaurant");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [timer, setTimer] = useState(0);
  const [messages, setMessages] = useState([
    { role: "ai" as const, text: "Hello! Let's practice ordering at a restaurant today. Imagine you just walked into a nice restaurant. The waiter approaches you. What would you say?" },
  ]);
  const [transcript, setTranscript] = useState("");
  const [sessionStats, setSessionStats] = useState({ pronunciation: 78, wordsSpoken: 0, errors: 0, newWords: [] as string[] });

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="glass border-b border-border/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <span className="font-semibold text-sm">{scenario}</span>
        </div>
        <span className="text-sm font-mono text-muted-foreground">{formatTime(timer)}</span>
        <button onClick={() => navigate("/dashboard")} className="text-accent text-sm font-medium hover:text-accent/80 transition-colors flex items-center gap-1">
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
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {scenarios.map((s) => (
                <button key={s} onClick={() => setScenario(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${scenario === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
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
