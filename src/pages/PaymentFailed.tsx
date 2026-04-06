import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        {/* Animated X */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <X className="w-10 h-10 text-accent" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
          <p className="text-muted-foreground text-sm">Something went wrong. Your card was not charged.</p>
        </div>

        <button onClick={() => navigate("/settings")} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all">
          Try Again
        </button>

        <div className="flex items-center justify-center gap-4 text-sm">
          <button onClick={() => navigate("/help")} className="text-muted-foreground hover:text-foreground transition-colors">Contact Support</button>
          <span className="text-border">·</span>
          <button onClick={() => navigate("/settings")} className="text-muted-foreground hover:text-foreground transition-colors">Back to Plans</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
