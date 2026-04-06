import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, Calendar, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Session {
  id: string;
  date: string;
  time: string;
  topic: string;
  duration: string;
  scenarioType: string;
  score: number;
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
  keyMoment: string;
}

const mockSessions: Session[] = [
  { id: "1", date: "2026-04-06", time: "14:30", topic: "Restaurant Ordering", duration: "12 min", scenarioType: "Restaurant", score: 82, pronunciation: 85, grammar: 78, vocabulary: 80, fluency: 84, keyMoment: "You correctly used 'would like' in 3 sentences" },
  { id: "2", date: "2026-04-06", time: "09:15", topic: "Phone Appointment", duration: "8 min", scenarioType: "Phone Call", score: 74, pronunciation: 70, grammar: 76, vocabulary: 72, fluency: 78, keyMoment: "Good use of polite expressions like 'Could you please'" },
  { id: "3", date: "2026-04-05", time: "18:00", topic: "Job Interview Practice", duration: "18 min", scenarioType: "Job Interview", score: 75, pronunciation: 72, grammar: 80, vocabulary: 70, fluency: 78, keyMoment: "You answered 'Tell me about yourself' fluently without long pauses" },
  { id: "4", date: "2026-04-05", time: "10:30", topic: "Travel Directions", duration: "10 min", scenarioType: "Travel", score: 88, pronunciation: 90, grammar: 85, vocabulary: 88, fluency: 89, keyMoment: "Excellent use of prepositions of place" },
  { id: "5", date: "2026-04-03", time: "16:45", topic: "Doctor Visit", duration: "14 min", scenarioType: "Doctor Visit", score: 55, pronunciation: 50, grammar: 60, vocabulary: 52, fluency: 58, keyMoment: "Try practicing medical vocabulary more — scored 52%" },
  { id: "6", date: "2026-04-01", time: "20:00", topic: "Free Conversation", duration: "15 min", scenarioType: "Free Talk", score: 71, pronunciation: 68, grammar: 74, vocabulary: 72, fluency: 70, keyMoment: "You maintained conversation flow for 3 minutes straight" },
  { id: "7", date: "2026-03-28", time: "11:00", topic: "Shopping Dialogue", duration: "8 min", scenarioType: "Restaurant", score: 90, pronunciation: 92, grammar: 88, vocabulary: 90, fluency: 90, keyMoment: "Perfect use of comparative adjectives" },
];

const dateFilters = ["This Week", "This Month", "All Time"] as const;
const scoreFilters = ["All Scores", "80+", "60-79", "Below 60"] as const;

function formatDateGroup(dateStr: string): string {
  const today = new Date();
  const d = new Date(dateStr + "T00:00:00");
  const diffDays = Math.floor((today.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function scoreColor(score: number) {
  if (score >= 80) return "text-secondary bg-secondary/20 border-secondary/30";
  if (score >= 60) return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
  return "text-accent bg-accent/20 border-accent/30";
}

function barColor(score: number) {
  if (score >= 80) return "bg-secondary";
  if (score >= 60) return "bg-yellow-400";
  return "bg-accent";
}

const History = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState<typeof dateFilters[number]>("All Time");
  const [scoreFilter, setScoreFilter] = useState<typeof scoreFilters[number]>("All Scores");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = mockSessions.filter((s) => {
    if (scoreFilter === "80+" && s.score < 80) return false;
    if (scoreFilter === "60-79" && (s.score < 60 || s.score >= 80)) return false;
    if (scoreFilter === "Below 60" && s.score >= 60) return false;
    if (dateFilter === "This Week") {
      const diff = (Date.now() - new Date(s.date + "T00:00:00").getTime()) / 86400000;
      if (diff > 7) return false;
    }
    if (dateFilter === "This Month") {
      const diff = (Date.now() - new Date(s.date + "T00:00:00").getTime()) / 86400000;
      if (diff > 30) return false;
    }
    return true;
  });

  const grouped = filtered.reduce<Record<string, Session[]>>((acc, s) => {
    const key = s.date;
    (acc[key] ??= []).push(s);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const skills = ["Pronunciation", "Grammar", "Vocabulary", "Fluency"] as const;
  const skillKey: Record<typeof skills[number], keyof Session> = {
    Pronunciation: "pronunciation", Grammar: "grammar", Vocabulary: "vocabulary", Fluency: "fluency",
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Session History</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {dateFilters.map((f) => (
            <button
              key={f}
              onClick={() => setDateFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                dateFilter === f ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <select
          value={scoreFilter}
          onChange={(e) => setScoreFilter(e.target.value as typeof scoreFilters[number])}
          className="glass rounded-xl px-4 py-1.5 text-sm bg-transparent border border-border/30 text-foreground"
        >
          {scoreFilters.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Session list */}
      {sortedDates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-bold text-lg mb-2">No sessions yet</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            Your practice history will appear here after your first session
          </p>
          <button onClick={() => navigate("/practice")} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
            <Mic className="w-4 h-4" /> Start Practice
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">{formatDateGroup(date)}</h3>
              <div className="space-y-2">
                {grouped[date].map((s) => {
                  const isOpen = expanded === s.id;
                  return (
                    <div key={s.id} className="glass rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpanded(isOpen ? null : s.id)}
                        className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface-hover/30 transition-colors"
                      >
                        {/* Score badge */}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 ${scoreColor(s.score)}`}>
                          {s.score}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{s.topic}</p>
                          <p className="text-xs text-muted-foreground">{s.time} — {s.duration}</p>
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {s.scenarioType}
                          </span>
                        </div>
                        {/* Chevron */}
                        {isOpen ? <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-1 space-y-4 border-t border-border/20">
                              {/* Skill bars */}
                              <div className="grid grid-cols-2 gap-3">
                                {skills.map((skill) => {
                                  const val = s[skillKey[skill]] as number;
                                  return (
                                    <div key={skill}>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">{skill}</span>
                                        <span className="font-medium">{val}%</span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-1.5">
                                        <div className={`${barColor(val)} rounded-full h-1.5 transition-all`} style={{ width: `${val}%` }} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {/* Key moment */}
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">Key moment:</span> {s.keyMoment}
                              </p>
                              {/* Actions */}
                              <div className="flex gap-3">
                                <button className="glass border border-border/30 px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-surface-hover transition-colors">
                                  View Transcript
                                </button>
                                <button onClick={() => navigate("/practice")} className="bg-primary text-primary-foreground px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-primary/90 transition-colors">
                                  Practice Similar
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
