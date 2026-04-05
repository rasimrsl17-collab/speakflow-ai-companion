import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockStats, mockWeakAreas, mockRecentSessions } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { Flame, LogOut, Mic, TrendingUp, BookOpen, BarChart3, ChevronRight, Check, Sparkles, X, Lightbulb } from "lucide-react";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const COMPLETED_DAYS = [true, true, true, true, false, false, false]; // M-Th completed
const TODAY_INDEX = 4; // Friday

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const [showAiRec, setShowAiRec] = useState(true);
  const [showTip, setShowTip] = useState(true);

  const statCards = [
    { label: "Sessions This Week", value: mockStats.sessionsThisWeek, icon: Mic },
    { label: "Pronunciation Score", value: `${mockStats.pronunciationScore}%`, icon: BarChart3 },
    { label: "Words Learned", value: mockStats.wordsLearned, extra: `+${mockStats.newWordsThisWeek} this week`, icon: BookOpen },
    { label: "Current Level", value: mockStats.currentLevel, icon: TrendingUp },
  ];

  const completedCount = COMPLETED_DAYS.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="glass border-b border-border/30 px-4 py-4 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">{greeting}, {user?.name || "Learner"}!</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 glass px-3 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold">{user?.streak || 14} day streak</span>
            </div>
            <button onClick={() => navigate("/settings")} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary hover:bg-primary/30 transition-colors">
              {user?.name?.[0] || "A"}
            </button>
            <button onClick={() => { logout(); navigate("/"); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">

        {/* Quick Action — Continue where you left off */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Continue where you left off</p>
          <h2 className="font-bold text-lg mb-2">Restaurant Ordering</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div className="bg-primary rounded-full h-2" style={{ width: "65%" }} />
            </div>
            <span className="text-xs text-muted-foreground">65%</span>
          </div>
          <button onClick={() => navigate("/practice")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 text-sm">
            Resume Session <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 glass-hover">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              {s.extra && <span className="text-xs text-secondary">{s.extra}</span>}
            </div>
          ))}
        </div>

        {/* Weekly Goal Tracker */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Weekly Goal</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            {WEEK_DAYS.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    COMPLETED_DAYS[i]
                      ? "bg-primary text-primary-foreground"
                      : i === TODAY_INDEX
                        ? "border-2 border-primary text-primary animate-pulse"
                        : "border-2 border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {COMPLETED_DAYS[i] ? <Check className="w-4 h-4" /> : day}
                </div>
                <span className="text-[10px] text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mb-3">{completedCount} of 7 days completed</p>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${(completedCount / 7) * 100}%` }} />
          </div>
        </div>

        {/* Main cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Continue Learning */}
          <div className="glass rounded-2xl p-6 glow-primary-sm">
            <h2 className="font-bold text-lg mb-2">Continue Learning</h2>
            <p className="text-muted-foreground text-sm mb-4">Restaurant Ordering — 60% complete</p>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-primary rounded-full h-2" style={{ width: "60%" }} />
            </div>
            <button onClick={() => navigate("/practice")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2">
              Resume Session <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weak areas */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Your Weak Areas</h2>
            <div className="space-y-3">
              {mockWeakAreas.map((area) => (
                <div key={area.name} className="flex items-center justify-between">
                  <span className="text-sm">{area.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className={`rounded-full h-2 ${area.score < 40 ? "bg-accent" : area.score < 60 ? "bg-yellow-500" : "bg-secondary"}`} style={{ width: `${area.score}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{area.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        {showAiRec && (
          <div className="glass rounded-2xl p-6 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-primary font-semibold mb-1">Nova recommends:</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your recent sessions, practicing <span className="text-foreground font-medium">'restaurant ordering'</span> scenarios would help your vocabulary and confidence the most.
                </p>
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate("/practice")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1">
                    Start This Lesson <ChevronRight className="w-3 h-3" />
                  </button>
                  <button onClick={() => setShowAiRec(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendation + Weekly goal */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-2">Recommended Next</h2>
            <p className="text-muted-foreground text-sm">Based on your progress, practice <span className="text-foreground font-medium">"ordering food"</span> scenario today.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-2">Weekly Goal</h2>
            <p className="text-sm text-muted-foreground mb-3">{mockStats.weeklyGoal.completed}/{mockStats.weeklyGoal.total} sessions completed</p>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="bg-secondary rounded-full h-3 transition-all" style={{ width: `${(mockStats.weeklyGoal.completed / mockStats.weeklyGoal.total) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Recent sessions */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Recent Sessions</h2>
          <div className="space-y-2">
            {mockRecentSessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 hover:bg-surface-hover/30 rounded-lg px-2 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-sm">{s.topic}</p>
                  <p className="text-xs text-muted-foreground">{s.date} · {s.duration}</p>
                </div>
                <span className={`text-sm font-bold ${s.score >= 80 ? "text-secondary" : s.score >= 60 ? "text-yellow-400" : "text-accent"}`}>{s.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Tip */}
        {showTip && (
          <div className="glass rounded-2xl p-5 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary mb-1">Daily Tip</p>
              <p className="text-sm text-muted-foreground">
                Try speaking for at least 10 minutes without pausing to think in your native language. This builds fluency faster than any grammar exercise!
              </p>
            </div>
            <button onClick={() => setShowTip(false)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom nav */}
        <div className="flex justify-center gap-4 pb-8">
          <button onClick={() => navigate("/progress")} className="glass rounded-xl px-6 py-3 text-sm font-medium hover:bg-surface-hover transition-all">📊 Progress</button>
          <button onClick={() => navigate("/practice")} className="bg-primary text-primary-foreground rounded-xl px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-all glow-primary-sm">🎤 Practice</button>
          <button onClick={() => navigate("/settings")} className="glass rounded-xl px-6 py-3 text-sm font-medium hover:bg-surface-hover transition-all">⚙️ Settings</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
