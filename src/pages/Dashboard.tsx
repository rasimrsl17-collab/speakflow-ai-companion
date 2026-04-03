import { useAuth } from "@/contexts/AuthContext";
import { mockStats, mockWeakAreas, mockRecentSessions } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { Flame, LogOut, Mic, TrendingUp, BookOpen, BarChart3, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const statCards = [
    { label: "Sessions This Week", value: mockStats.sessionsThisWeek, icon: Mic },
    { label: "Pronunciation Score", value: `${mockStats.pronunciationScore}%`, icon: BarChart3 },
    { label: "Words Learned", value: mockStats.wordsLearned, extra: `+${mockStats.newWordsThisWeek} this week`, icon: BookOpen },
    { label: "Current Level", value: mockStats.currentLevel, icon: TrendingUp },
  ];

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
