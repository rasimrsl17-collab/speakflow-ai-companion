import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="glass rounded-2xl p-6 max-w-md w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;

// ── Confirm Dialog ──
interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  destructive?: boolean;
}

export const ConfirmDialog = ({ open, onClose, onConfirm, title, description, confirmLabel = "Confirm", destructive }: ConfirmDialogProps) => (
  <Modal open={open} onClose={onClose}>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-6">{description}</p>
    <div className="flex gap-3 justify-end">
      <button onClick={onClose} className="glass border border-border/50 px-5 py-2 rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
        Cancel
      </button>
      <button
        onClick={() => { onConfirm(); onClose(); }}
        className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
          destructive ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-primary hover:bg-primary/90 text-primary-foreground"
        }`}
      >
        {confirmLabel}
      </button>
    </div>
  </Modal>
);

// ── Streak Lost Modal ──
interface StreakLostProps {
  open: boolean;
  onClose: () => void;
  onStartPractice: () => void;
}

export const StreakLostModal = ({ open, onClose, onStartPractice }: StreakLostProps) => (
  <Modal open={open} onClose={onClose}>
    <div className="text-center space-y-4">
      <span className="text-5xl block">😢</span>
      <h3 className="font-bold text-xl">Your streak was reset</h3>
      <p className="text-sm text-muted-foreground">
        You missed yesterday's practice. But don't worry — start building a new streak today!
      </p>
      <button
        onClick={() => { onStartPractice(); onClose(); }}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 w-full flex items-center justify-center gap-2"
      >
        Start Practicing →
      </button>
      <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        Dismiss
      </button>
    </div>
  </Modal>
);

// ── Level Up Modal ──
interface LevelUpProps {
  open: boolean;
  onClose: () => void;
  level?: string;
}

export const LevelUpModal = ({ open, onClose, level = "B1 Intermediate" }: LevelUpProps) => (
  <Modal open={open} onClose={onClose}>
    <div className="text-center space-y-4">
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex justify-center gap-1"
        >
          {["✨", "🎉", "⭐", "🎊", "✨"].map((e, i) => (
            <motion.span
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="text-2xl"
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <h3 className="font-bold text-xl">🎉 Level Up!</h3>
      <p className="text-sm text-muted-foreground">
        Congratulations! You've reached <span className="text-foreground font-semibold">{level}</span>!
      </p>
      <div className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-3">
        <span className="text-2xl">🏅</span>
        <span className="font-bold text-primary">{level}</span>
      </div>
      <button
        onClick={onClose}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 w-full"
      >
        Keep Going!
      </button>
    </div>
  </Modal>
);

// ── Upgrade Modal ──
interface UpgradeProps {
  open: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
}

const features = [
  { free: "3 sessions/day", pro: "Unlimited sessions" },
  { free: "Basic scenarios", pro: "86 scenarios + exam prep" },
  { free: "Limited vocabulary", pro: "Full vocabulary tracking" },
  { free: "No transcripts", pro: "Full session transcripts" },
];

export const UpgradeModal = ({ open, onClose, onUpgrade }: UpgradeProps) => (
  <Modal open={open} onClose={onClose}>
    <div className="space-y-5">
      <h3 className="font-bold text-xl text-center">Unlock Your Full Potential</h3>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-muted-foreground mb-1">
          <span></span>
          <span className="text-center">Free</span>
          <span className="text-center text-primary">Pro</span>
        </div>
        {features.map((f, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 text-xs py-2 border-b border-border/20 last:border-0">
            <span></span>
            <span className="text-center text-muted-foreground">{f.free}</span>
            <span className="text-center text-foreground font-medium">{f.pro}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => { onUpgrade?.(); onClose(); }}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 w-full"
      >
        Upgrade to Pro — $14.99/mo
      </button>
      <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center block">
        Maybe Later
      </button>
    </div>
  </Modal>
);
