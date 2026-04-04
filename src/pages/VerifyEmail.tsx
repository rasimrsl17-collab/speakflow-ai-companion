import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COOLDOWN = 60;

const VerifyEmail = () => {
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleResend = useCallback(() => {
    setCooldown(COOLDOWN);
    // placeholder: resend verification email
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-background"
            >
              <CheckCircle className="w-4 h-4 text-secondary" />
            </motion.div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
        <p className="text-muted-foreground text-sm mb-8">
          We sent a verification link to your email address. Please check your inbox and click the link to verify.
        </p>

        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:bg-primary/90 hover:scale-[1.02] glow-primary-sm mb-4"
        >
          Open Email App
        </a>

        <button
          onClick={handleResend}
          disabled={cooldown > 0}
          className="text-sm text-primary hover:text-primary/80 transition-colors disabled:text-muted-foreground disabled:cursor-default mb-4 block mx-auto"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend verification email"}
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="flex items-center gap-1 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Wrong email? Go back
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
