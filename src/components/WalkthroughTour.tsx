import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TourStep {
  targetId: string;
  title: string;
  description: string;
}

const TOUR_STEPS: TourStep[] = [
  { targetId: "tour-practice", title: "Practice", description: "Start a voice session here. Just tap and start speaking!" },
  { targetId: "tour-streak", title: "Streak", description: "Practice daily to build your streak. Don't break it!" },
  { targetId: "tour-weak-areas", title: "Weak Areas", description: "We track your mistakes and show what needs the most practice." },
  { targetId: "tour-progress", title: "Progress", description: "Check your improvement over time with detailed charts." },
];

const STORAGE_KEY = "speakflow_walkthrough_done";

const WalkthroughTour = () => {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setActive(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const updateRect = useCallback(() => {
    if (!active) return;
    const el = document.getElementById(TOUR_STEPS[step]?.targetId);
    if (el) {
      setRect(el.getBoundingClientRect());
    }
  }, [active, step]);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [updateRect]);

  const finish = () => {
    setActive(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const next = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  if (!active || !rect) return null;

  const padding = 8;
  const tooltipTop = rect.bottom + padding + 12;
  const tooltipLeft = Math.max(16, Math.min(rect.left, window.innerWidth - 300));

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={rect.left - padding}
              y={rect.top - padding}
              width={rect.width + padding * 2}
              height={rect.height + padding * 2}
              rx="12"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.7)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: "auto" }}
          onClick={(e) => e.stopPropagation()}
        />
      </svg>

      {/* Highlight border */}
      <div
        className="absolute border-2 border-primary rounded-xl pointer-events-none glow-primary-sm"
        style={{
          left: rect.left - padding,
          top: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute glass rounded-2xl p-5 w-72 shadow-xl z-[201]"
          style={{ top: tooltipTop, left: tooltipLeft }}
        >
          {/* Arrow */}
          <div
            className="absolute -top-2 w-4 h-4 bg-card/60 border-l border-t border-border/50 rotate-45"
            style={{ left: Math.max(20, rect.left + rect.width / 2 - tooltipLeft) }}
          />

          <h4 className="font-bold text-sm mb-1">{TOUR_STEPS[step].title}</h4>
          <p className="text-xs text-muted-foreground mb-4">{TOUR_STEPS[step].description}</p>

          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-1.5">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted-foreground/30"}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={finish} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Skip Tour
              </button>
              <button
                onClick={next}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
              >
                {step === TOUR_STEPS.length - 1 ? "Done" : "Next"}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WalkthroughTour;
