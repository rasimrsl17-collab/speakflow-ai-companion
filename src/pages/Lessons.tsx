import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, Lock, Crown, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Scenario {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  completed?: number | null; // score if completed
  locked?: boolean;
}

interface Category {
  emoji: string;
  name: string;
  scenarios: Scenario[];
}

const categories: Category[] = [
  {
    emoji: "🍽️", name: "Food & Dining", scenarios: [
      { name: "Ordering at a Restaurant", difficulty: "Beginner", duration: "~10 min", completed: 82 },
      { name: "Making a Reservation", difficulty: "Beginner", duration: "~8 min", completed: 90 },
      { name: "Complaining About Food", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Asking for Recommendations", difficulty: "Beginner", duration: "~8 min" },
      { name: "Splitting the Bill", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Describing Dietary Needs", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Ordering Delivery", difficulty: "Beginner", duration: "~8 min" },
      { name: "Wine Pairing Discussion", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Food Critic Review", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Cooking Class Instructions", difficulty: "Intermediate", duration: "~12 min", locked: true },
      { name: "Street Food Bargaining", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Fine Dining Etiquette", difficulty: "Advanced", duration: "~12 min", locked: true },
    ],
  },
  {
    emoji: "💼", name: "Work & Business", scenarios: [
      { name: "Job Interview Basics", difficulty: "Intermediate", duration: "~15 min", completed: 75 },
      { name: "Introducing Yourself at Work", difficulty: "Beginner", duration: "~8 min" },
      { name: "Giving a Presentation", difficulty: "Advanced", duration: "~18 min" },
      { name: "Negotiating a Salary", difficulty: "Advanced", duration: "~15 min" },
      { name: "Team Meeting Discussion", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Writing Emails (Dictation)", difficulty: "Beginner", duration: "~10 min" },
      { name: "Client Phone Call", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Handling Complaints", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Networking at Events", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Performance Review", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Project Pitch", difficulty: "Advanced", duration: "~18 min", locked: true },
      { name: "Office Small Talk", difficulty: "Beginner", duration: "~8 min" },
      { name: "Remote Work Communication", difficulty: "Intermediate", duration: "~12 min", locked: true },
      { name: "Resignation Conversation", difficulty: "Advanced", duration: "~12 min", locked: true },
      { name: "Onboarding Day", difficulty: "Beginner", duration: "~10 min", locked: true },
    ],
  },
  {
    emoji: "✈️", name: "Travel", scenarios: [
      { name: "Checking In at Airport", difficulty: "Beginner", duration: "~10 min", completed: 88 },
      { name: "Asking for Directions", difficulty: "Beginner", duration: "~8 min" },
      { name: "Hotel Check-In", difficulty: "Beginner", duration: "~10 min" },
      { name: "Renting a Car", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Dealing with Lost Luggage", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Booking a Tour", difficulty: "Beginner", duration: "~10 min" },
      { name: "Customs & Immigration", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Complaining at Hotel", difficulty: "Intermediate", duration: "~12 min", locked: true },
      { name: "Emergency Abroad", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Train Station Navigation", difficulty: "Beginner", duration: "~8 min", locked: true },
    ],
  },
  {
    emoji: "🏥", name: "Health", scenarios: [
      { name: "Describing Symptoms", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Pharmacy Visit", difficulty: "Beginner", duration: "~8 min" },
      { name: "Making an Appointment", difficulty: "Beginner", duration: "~8 min" },
      { name: "Emergency Room", difficulty: "Advanced", duration: "~15 min" },
      { name: "Dental Appointment", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Mental Health Discussion", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Insurance Questions", difficulty: "Advanced", duration: "~12 min", locked: true },
      { name: "Follow-up Visit", difficulty: "Intermediate", duration: "~10 min", locked: true },
    ],
  },
  {
    emoji: "🛍️", name: "Shopping", scenarios: [
      { name: "Buying Clothes", difficulty: "Beginner", duration: "~10 min" },
      { name: "Returning an Item", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Asking for Help in Store", difficulty: "Beginner", duration: "~8 min" },
      { name: "Online Order Issues", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Negotiating Price", difficulty: "Advanced", duration: "~12 min", locked: true },
      { name: "Electronics Shopping", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Grocery Shopping", difficulty: "Beginner", duration: "~8 min" },
    ],
  },
  {
    emoji: "📞", name: "Communication", scenarios: [
      { name: "Making a Phone Call", difficulty: "Beginner", duration: "~8 min", completed: 74 },
      { name: "Leaving a Voicemail", difficulty: "Beginner", duration: "~6 min" },
      { name: "Video Call Meeting", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Scheduling Appointment", difficulty: "Beginner", duration: "~8 min" },
      { name: "Customer Service Call", difficulty: "Intermediate", duration: "~12 min", locked: true },
      { name: "Conference Call", difficulty: "Advanced", duration: "~15 min", locked: true },
    ],
  },
  {
    emoji: "🏠", name: "Daily Life", scenarios: [
      { name: "Introducing Yourself", difficulty: "Beginner", duration: "~6 min" },
      { name: "Talking About Hobbies", difficulty: "Beginner", duration: "~8 min" },
      { name: "Describing Your Home", difficulty: "Beginner", duration: "~8 min" },
      { name: "Making Plans with Friends", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Talking to Neighbors", difficulty: "Beginner", duration: "~8 min" },
      { name: "Reporting a Problem", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Giving Opinions", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Storytelling Practice", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Debating a Topic", difficulty: "Advanced", duration: "~15 min", locked: true },
    ],
  },
  {
    emoji: "🎓", name: "Education", scenarios: [
      { name: "Asking Questions in Class", difficulty: "Beginner", duration: "~8 min" },
      { name: "Group Project Discussion", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Presenting Homework", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Parent-Teacher Meeting", difficulty: "Intermediate", duration: "~12 min" },
      { name: "University Enrollment", difficulty: "Intermediate", duration: "~10 min", locked: true },
      { name: "Tutoring Session", difficulty: "Beginner", duration: "~10 min", locked: true },
      { name: "Academic Discussion", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Study Abroad Interview", difficulty: "Advanced", duration: "~15 min", locked: true },
    ],
  },
  {
    emoji: "🎉", name: "Social", scenarios: [
      { name: "Party Small Talk", difficulty: "Beginner", duration: "~8 min" },
      { name: "Meeting New People", difficulty: "Beginner", duration: "~8 min" },
      { name: "Planning a Birthday", difficulty: "Beginner", duration: "~10 min" },
      { name: "Wedding Conversation", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Discussing Movies/Shows", difficulty: "Beginner", duration: "~8 min" },
      { name: "Sports Discussion", difficulty: "Intermediate", duration: "~10 min" },
      { name: "Cultural Exchange", difficulty: "Intermediate", duration: "~12 min" },
      { name: "Telling Jokes", difficulty: "Advanced", duration: "~10 min", locked: true },
      { name: "Formal Event Speech", difficulty: "Advanced", duration: "~15 min", locked: true },
      { name: "Conflict Resolution", difficulty: "Advanced", duration: "~12 min", locked: true },
      { name: "Farewell Conversation", difficulty: "Intermediate", duration: "~10 min", locked: true },
    ],
  },
];

const examCards = [
  { name: "IELTS Speaking Part 1", desc: "Personal questions & familiar topics" },
  { name: "IELTS Speaking Part 2", desc: "Long turn — describe a topic for 2 minutes" },
  { name: "IELTS Speaking Part 3", desc: "Abstract discussion & deeper analysis" },
  { name: "TOEFL Speaking Tasks", desc: "Integrated & independent speaking tasks" },
];

function difficultyStyle(d: Scenario["difficulty"]) {
  if (d === "Beginner") return "bg-secondary/20 text-secondary";
  if (d === "Intermediate") return "bg-yellow-400/20 text-yellow-400";
  return "bg-accent/20 text-accent";
}

function scoreColor(s: number) {
  if (s >= 80) return "text-secondary bg-secondary/20";
  if (s >= 60) return "text-yellow-400 bg-yellow-400/20";
  return "text-accent bg-accent/20";
}

const Lessons = () => {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const activeCat = categories.find((c) => c.name === selectedCat);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <AnimatePresence mode="wait">
        {activeCat ? (
          <motion.div
            key="scenarios"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Back header */}
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedCat(null)} className="p-2 rounded-xl glass hover:bg-surface-hover transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-3xl">{activeCat.emoji}</span> {activeCat.name}
                </h1>
                <p className="text-sm text-muted-foreground">{activeCat.scenarios.length} scenarios</p>
              </div>
            </div>

            {/* Scenario list */}
            <div className="space-y-3">
              {activeCat.scenarios.map((sc, i) => (
                <div key={i} className={`glass rounded-2xl p-4 flex items-center gap-4 ${sc.locked ? "opacity-60" : "glass-hover"}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-sm">{sc.name}</p>
                      {sc.locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                      {sc.locked && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold">Pro</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${difficultyStyle(sc.difficulty)}`}>
                        {sc.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">{sc.duration}</span>
                      {sc.completed != null && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${scoreColor(sc.completed)}`}>
                          {sc.completed}%
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => !sc.locked && navigate("/practice")}
                    disabled={sc.locked}
                    className={`shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                      sc.locked
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {sc.locked ? <Lock className="w-3 h-3" /> : <>Start <ChevronRight className="w-3 h-3" /></>}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="categories"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold">Practice Scenarios</h1>
              <p className="text-muted-foreground text-sm mt-1">Choose a topic and start speaking</p>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCat(cat.name)}
                  className="glass rounded-2xl p-5 text-left glass-hover group transition-all"
                >
                  <span className="text-4xl block mb-3">{cat.emoji}</span>
                  <p className="font-semibold text-sm">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.scenarios.length} scenarios</p>
                </button>
              ))}
            </div>

            {/* Exam Preparation */}
            <div>
              <h2 className="text-lg font-bold mb-1">Exam Preparation</h2>
              <p className="text-sm text-muted-foreground mb-4">Get ready for English proficiency tests</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {examCards.map((ex) => (
                  <div key={ex.name} className="glass rounded-2xl p-5 opacity-70 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-sm">{ex.name}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-bold flex items-center gap-1">
                        <Crown className="w-3 h-3" /> Premium
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{ex.desc}</p>
                    <button disabled className="bg-muted text-muted-foreground px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-not-allowed">
                      <Lock className="w-3 h-3" /> Locked
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade banner */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-3xl">🔓</span>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold">Unlock all 86 scenarios with Pro</p>
                <p className="text-sm text-muted-foreground">Get unlimited access to every practice scenario and exam prep</p>
              </div>
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all shrink-0">
                Upgrade
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lessons;
