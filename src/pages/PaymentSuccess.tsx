import { useNavigate } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Check className="w-10 h-10 text-secondary" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground text-sm">Welcome to SpeakFlow Pro! You now have unlimited access.</p>
        </div>

        {/* Plan details */}
        <div className="glass rounded-xl p-4 text-left space-y-2 border border-border/30">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium">Pro Monthly</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">$9.99/month</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next billing</span>
            <span className="font-medium">May 6, 2026</span>
          </div>
        </div>

        <button onClick={() => navigate("/practice")} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
          Start Practicing <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
