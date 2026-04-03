import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Upload } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [dailyGoal, setDailyGoal] = useState(user?.dailyGoal || 15);
  const [correctionStyle, setCorrectionStyle] = useState(user?.correctionStyle || "Balanced");
  const [tutorVoice, setTutorVoice] = useState(user?.tutorVoice || "Nova (Female)");
  const [learningGoal, setLearningGoal] = useState(user?.learningGoal || "Career growth");
  const [notifications, setNotifications] = useState({ daily: true, weekly: true, streak: true, features: false });

  const languages = ["English", "Turkish", "Russian", "German", "French", "Azerbaijani", "Arabic"];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border/30 px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="font-bold">Settings</h1>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Profile */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">{name[0] || "A"}</div>
            <button className="glass px-4 py-2 rounded-xl text-sm hover:bg-surface-hover transition-all flex items-center gap-2"><Upload className="w-4 h-4" /> Upload</button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input type="email" value={user?.email || ""} disabled className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Native language</label>
                <select defaultValue={user?.nativeLanguage} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Learning language</label>
                <select defaultValue={user?.learningLanguage} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Learning Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Learning goal</label>
              <div className="flex flex-wrap gap-2">
                {["Casual", "IELTS Preparation", "Business English", "Travel"].map((g) => (
                  <button key={g} onClick={() => setLearningGoal(g)} className={`px-4 py-2 rounded-xl text-sm transition-all ${learningGoal === g ? "bg-primary text-primary-foreground" : "glass hover:bg-surface-hover"}`}>{g}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Daily goal: {dailyGoal} min</label>
              <input type="range" min="5" max="30" step="5" value={dailyGoal} onChange={(e) => setDailyGoal(Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>5 min</span><span>30 min</span></div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Correction style</label>
              <div className="flex gap-2">
                {["Gentle", "Balanced", "Strict"].map((s) => (
                  <button key={s} onClick={() => setCorrectionStyle(s)} className={`flex-1 py-2 rounded-xl text-sm transition-all ${correctionStyle === s ? "bg-primary text-primary-foreground" : "glass hover:bg-surface-hover"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">AI tutor voice</label>
              <select value={tutorVoice} onChange={(e) => setTutorVoice(e.target.value)} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>Nova (Female)</option>
                <option>Atlas (Male)</option>
                <option>Echo (Neutral)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Notifications</h2>
          <div className="space-y-3">
            {Object.entries({ daily: "Daily reminder", weekly: "Weekly report", streak: "Streak alerts", features: "New feature updates" }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`w-11 h-6 rounded-full transition-all relative ${notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-muted"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-foreground absolute top-1 transition-all ${notifications[key as keyof typeof notifications] ? "left-6" : "left-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-2">Subscription</h2>
          <p className="text-sm text-muted-foreground mb-3">Current plan: <span className="text-foreground font-semibold">{user?.plan || "Pro"}</span></p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105">Manage Plan</button>
        </div>

        {/* Account */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Account</h2>
          <div className="space-y-3">
            <button className="glass px-4 py-2 rounded-xl text-sm hover:bg-surface-hover transition-all w-full text-left">Change password</button>
            <button className="glass px-4 py-2 rounded-xl text-sm hover:bg-surface-hover transition-all w-full text-left">Export my data</button>
            <button onClick={() => { updateUser({ name }); navigate("/dashboard"); }} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 w-full">Save Changes</button>
            <button className="text-accent text-sm hover:underline" onClick={() => { logout(); navigate("/"); }}>Delete account</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
