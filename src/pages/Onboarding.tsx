import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronRight } from "lucide-react";

const steps = [
  {
    title: "What's your native language?",
    key: "nativeLanguage",
    options: [
      { label: "Azerbaijani", emoji: "🇦🇿" },
      { label: "Turkish", emoji: "🇹🇷" },
      { label: "Russian", emoji: "🇷🇺" },
      { label: "Arabic", emoji: "🇸🇦" },
      { label: "Other", emoji: "🌍" },
    ],
  },
  {
    title: "What do you want to learn?",
    key: "learningLanguage",
    options: [
      { label: "English", emoji: "🇬🇧" },
      { label: "German", emoji: "🇩🇪" },
      { label: "Turkish", emoji: "🇹🇷" },
      { label: "Russian", emoji: "🇷🇺" },
      { label: "French", emoji: "🇫🇷" },
    ],
  },
  {
    title: "What's your current level?",
    key: "level",
    options: [
      { label: "Complete Beginner", emoji: "🌱", desc: "I know almost nothing" },
      { label: "Elementary", emoji: "📗", desc: "I know basic words and phrases" },
      { label: "Intermediate", emoji: "📘", desc: "I can have simple conversations" },
      { label: "Advanced", emoji: "📕", desc: "I want to polish and perfect" },
    ],
  },
  {
    title: "What's your goal?",
    key: "learningGoal",
    options: [
      { label: "Pass an exam", emoji: "🎓", desc: "IELTS, TOEFL" },
      { label: "Career growth", emoji: "💼" },
      { label: "Travel confidently", emoji: "✈️" },
      { label: "Daily conversation", emoji: "💬" },
      { label: "Just for fun", emoji: "🎯" },
    ],
  },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const current = steps[step];

  const select = (value: string) => {
    const newSelections = { ...selections, [current.key]: value };
    setSelections(newSelections);
    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const finish = () => {
    updateUser(selections);
    navigate("/dashboard");
  };

  const isLastStep = step === steps.length - 1 && selections[current.key];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Progress */}
      <div className="w-full max-w-md mb-12">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <p className="text-muted-foreground text-xs mt-3 text-center">Step {step + 1} of {steps.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">{current.title}</h1>
          <div className="grid grid-cols-1 gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => select(opt.label)}
                className={`glass rounded-2xl p-4 text-left flex items-center gap-4 transition-all hover:scale-[1.02] hover:border-primary/50 ${selections[current.key] === opt.label ? "border-primary glow-primary-sm" : ""}`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <p className="font-semibold">{opt.label}</p>
                  {"desc" in opt && <p className="text-xs text-muted-foreground">{opt.desc}</p>}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {isLastStep && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
          <button onClick={finish} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 glow-primary flex items-center gap-2">
            Your AI tutor is ready! Let's start <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      {step > 0 && (
        <button onClick={() => setStep(step - 1)} className="mt-6 text-muted-foreground text-sm hover:text-foreground transition-colors">← Back</button>
      )}
    </div>
  );
};

export default Onboarding;
