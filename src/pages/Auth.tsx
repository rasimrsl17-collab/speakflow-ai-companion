import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", nativeLanguage: "Azerbaijani", learningLanguage: "English" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        navigate("/dashboard");
      } else {
        await signup(form);
        navigate("/onboarding");
      }
    } finally {
      setLoading(false);
    }
  };

  const languages = ["English", "Turkish", "Russian", "German", "French", "Azerbaijani", "Arabic"];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/10 relative">
        <div className="text-center px-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Start Your Journey</h2>
          <p className="text-muted-foreground text-lg">"The limits of my language mean the limits of my world."</p>
          <p className="text-muted-foreground text-sm mt-2">— Ludwig Wittgenstein</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1">{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p className="text-muted-foreground text-sm mb-8">{isLogin ? "Log in to continue learning" : "Start your language learning journey"}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your name" required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {!isLogin && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1 block">Native language</label>
                  <select value={form.nativeLanguage} onChange={(e) => setForm({ ...form, nativeLanguage: e.target.value })} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">I want to learn</label>
                  <select value={form.learningLanguage} onChange={(e) => setForm({ ...form, learningLanguage: e.target.value })} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </>
            )}
            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] glow-primary-sm disabled:opacity-50">
              {loading ? "Loading..." : isLogin ? "Log in" : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full border border-border hover:border-primary/30 py-3 rounded-xl font-medium transition-all hover:scale-[1.02] text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => navigate(isLogin ? "/signup" : "/login")} className="text-primary hover:underline font-medium">
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
          {isLogin && <p className="text-center text-sm text-muted-foreground mt-2"><button className="text-primary hover:underline">Forgot password?</button></p>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
