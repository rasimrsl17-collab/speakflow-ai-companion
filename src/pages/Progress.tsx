import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProgressData } from "@/lib/mockData";
import { ArrowLeft, TrendingUp, TrendingDown, Lock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tabs = ["This Week", "This Month", "All Time"];

const Progress = () => {
  const [activeTab, setActiveTab] = useState("This Month");
  const navigate = useNavigate();
  const data = mockProgressData;

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border/30 px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-bold">Progress & Analytics</h1>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === t ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4">Pronunciation Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.pronunciationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 20% 22%)" />
                <XAxis dataKey="week" tick={{ fill: "hsl(240 15% 60%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(240 15% 60%)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(240 33% 13%)", border: "1px solid hsl(240 20% 22%)", borderRadius: "12px", color: "#fff" }} />
                <Line type="monotone" dataKey="score" stroke="hsl(260 72% 55%)" strokeWidth={2} dot={{ fill: "hsl(260 72% 55%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-4">Sessions per Week</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.sessionsPerWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 20% 22%)" />
                <XAxis dataKey="week" tick={{ fill: "hsl(240 15% 60%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(240 15% 60%)", fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(240 33% 13%)", border: "1px solid hsl(240 20% 22%)", borderRadius: "12px", color: "#fff" }} />
                <Bar dataKey="sessions" fill="hsl(165 100% 42%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Vocabulary Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data.vocabularyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 20% 22%)" />
              <XAxis dataKey="week" tick={{ fill: "hsl(240 15% 60%)", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(240 15% 60%)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(240 33% 13%)", border: "1px solid hsl(240 20% 22%)", borderRadius: "12px", color: "#fff" }} />
              <Area type="monotone" dataKey="words" stroke="hsl(260 72% 55%)" fill="hsl(260 72% 55% / 0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Skills Breakdown</h3>
          <div className="space-y-4">
            {data.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-4">
                <span className="text-sm w-28">{skill.name}</span>
                <div className="flex-1 bg-muted rounded-full h-2.5">
                  <div className="bg-primary rounded-full h-2.5 transition-all" style={{ width: `${skill.score}%` }} />
                </div>
                <span className="text-sm font-bold w-10">{skill.score}%</span>
                {skill.trend === "up" ? <TrendingUp className="w-4 h-4 text-secondary" /> : <TrendingDown className="w-4 h-4 text-accent" />}
              </div>
            ))}
          </div>
        </div>

        {/* Error patterns */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Error Patterns</h3>
          <div className="space-y-3">
            {data.errorPatterns.map((err) => (
              <div key={err.type} className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/30 last:border-0">
                <div>
                  <p className="text-sm font-medium">{err.type}</p>
                  <p className="text-xs text-muted-foreground">{err.example}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{err.frequency}×</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${err.status === "improving" ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"}`}>
                    {err.status === "improving" ? "Improving ↗" : "Needs work"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vocabulary map */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Vocabulary Map</h3>
          <div className="flex flex-wrap gap-3">
            {data.vocabularyMap.map((cat) => (
              <button key={cat.category} className="glass rounded-2xl px-5 py-3 hover:bg-surface-hover transition-all hover:scale-105" style={{ fontSize: `${Math.max(12, Math.min(18, cat.count / 6))}px` }}>
                {cat.category} <span className="text-muted-foreground">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold mb-4">Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.achievements.map((a) => (
              <div key={a.name} className={`glass rounded-2xl p-4 text-center transition-all ${a.earned ? "hover:scale-105" : "opacity-40"}`}>
                <span className="text-3xl">{a.earned ? a.icon : ""}</span>
                {!a.earned && <Lock className="w-6 h-6 mx-auto text-muted-foreground" />}
                <p className="text-xs font-medium mt-2">{a.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
