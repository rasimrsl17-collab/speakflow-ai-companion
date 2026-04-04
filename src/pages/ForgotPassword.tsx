import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 w-full max-w-md"
      >
        {!submitted ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Reset your password</h1>
            <p className="text-muted-foreground text-center text-sm mb-8">
              Enter your email and we'll send you a reset link
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:bg-primary/90 hover:scale-[1.02] disabled:opacity-60 glow-primary-sm"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 mx-auto mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to login
            </button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-secondary" />
              </motion.div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Check your email!</h1>
            <p className="text-muted-foreground text-sm mb-6">
              We sent a reset link to <span className="text-foreground font-medium">{email}</span>. Please check your inbox.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-primary hover:text-primary/80 transition-colors mb-4 block mx-auto"
            >
              Didn't receive it? Resend
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to login
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
