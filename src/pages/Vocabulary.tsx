import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Volume2, ChevronDown, ChevronUp, BookOpen, ChevronRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Strength = "strong" | "moderate" | "weak";

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  translation: string;
  topic: string;
  strength: Strength;
  exampleEn: string;
  exampleTranslation: string;
  lastPracticed: string;
  timesCorrect: number;
  isNew?: boolean;
}

const mockWords: Word[] = [
  { id: "1", word: "appreciate", pronunciation: "/əˈpriːʃieɪt/", translation: "qiymətləndirmək", topic: "Business", strength: "strong", exampleEn: "I really appreciate your help with this project.", exampleTranslation: "Bu layihədə köməyinizi həqiqətən qiymətləndirirəm.", lastPracticed: "2 days ago", timesCorrect: 7 },
  { id: "2", word: "approximately", pronunciation: "/əˈprɒksɪmətli/", translation: "təxminən", topic: "Daily Life", strength: "strong", exampleEn: "It takes approximately 30 minutes to get there.", exampleTranslation: "Oraya çatmaq təxminən 30 dəqiqə çəkir.", lastPracticed: "1 day ago", timesCorrect: 12 },
  { id: "3", word: "accommodate", pronunciation: "/əˈkɒmədeɪt/", translation: "yerləşdirmək", topic: "Travel", strength: "moderate", exampleEn: "The hotel can accommodate up to 200 guests.", exampleTranslation: "Otel 200-ə qədər qonaq yerləşdirə bilər.", lastPracticed: "3 days ago", timesCorrect: 4 },
  { id: "4", word: "thorough", pronunciation: "/ˈθʌrə/", translation: "hərtərəfli", topic: "Business", strength: "weak", exampleEn: "We need a thorough investigation of the issue.", exampleTranslation: "Məsələnin hərtərəfli araşdırılmasına ehtiyacımız var.", lastPracticed: "5 days ago", timesCorrect: 1 },
  { id: "5", word: "prescription", pronunciation: "/prɪˈskrɪpʃən/", translation: "resept", topic: "Medical", strength: "moderate", exampleEn: "You need a prescription from your doctor.", exampleTranslation: "Həkiminizdən resept almalısınız.", lastPracticed: "4 days ago", timesCorrect: 3 },
  { id: "6", word: "itinerary", pronunciation: "/aɪˈtɪnərəri/", translation: "marşrut", topic: "Travel", strength: "weak", exampleEn: "Let me check my travel itinerary.", exampleTranslation: "İcazə verin, səyahət marşrutumu yoxlayım.", lastPracticed: "1 week ago", timesCorrect: 1 },
  { id: "7", word: "comprehensive", pronunciation: "/ˌkɒmprɪˈhensɪv/", translation: "hərtərəfli", topic: "Business", strength: "strong", exampleEn: "This is a comprehensive guide to English.", exampleTranslation: "Bu İngilis dilinə hərtərəfli bələdçidir.", lastPracticed: "1 day ago", timesCorrect: 9, isNew: true },
  { id: "8", word: "symptom", pronunciation: "/ˈsɪmptəm/", translation: "simptom", topic: "Medical", strength: "moderate", exampleEn: "What symptoms are you experiencing?", exampleTranslation: "Hansı simptomlarınız var?", lastPracticed: "3 days ago", timesCorrect: 5 },
  { id: "9", word: "departure", pronunciation: "/dɪˈpɑːtʃər/", translation: "yola düşmə", topic: "Travel", strength: "strong", exampleEn: "The departure time is 8 AM.", exampleTranslation: "Yola düşmə vaxtı səhər 8-dir.", lastPracticed: "2 days ago", timesCorrect: 11 },
  { id: "10", word: "reservoir", pronunciation: "/ˈrezəvwɑːr/", translation: "su anbarı", topic: "Daily Life", strength: "weak", exampleEn: "The reservoir supplies water to the whole city.", exampleTranslation: "Su anbarı bütün şəhəri su ilə təmin edir.", lastPracticed: "1 week ago", timesCorrect: 0, isNew: true },
];

const strengthDot: Record<Strength, string> = {
  strong: "bg-secondary",
  moderate: "bg-yellow-500",
  weak: "bg-accent",
};

const strengthBadge: Record<Strength, string> = {
  strong: "bg-secondary/20 text-secondary",
  moderate: "bg-yellow-500/20 text-yellow-400",
  weak: "bg-accent/20 text-accent",
};

const filters = ["All", "Strong", "Moderate", "Weak", "New This Week"] as const;
const sorts = ["Recently Learned", "Alphabetical", "Strength (low to high)"] as const;

const Vocabulary = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Recently Learned");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSort, setShowSort] = useState(false);

  const totalWords = 347;
  const strongCount = 210;
  const moderateCount = 89;
  const weakCount = 48;

  let filtered = mockWords.filter((w) => {
    if (search && !w.word.toLowerCase().includes(search.toLowerCase()) && !w.translation.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "Strong") return w.strength === "strong";
    if (filter === "Moderate") return w.strength === "moderate";
    if (filter === "Weak") return w.strength === "weak";
    if (filter === "New This Week") return w.isNew;
    return true;
  });

  if (sort === "Alphabetical") filtered.sort((a, b) => a.word.localeCompare(b.word));
  if (sort === "Strength (low to high)") {
    const order: Record<Strength, number> = { weak: 0, moderate: 1, strong: 2 };
    filtered.sort((a, b) => order[a.strength] - order[b.strength]);
  }

  const isEmpty = filtered.length === 0 && !search && filter === "All";

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold">{totalWords} Total Words</span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${strengthBadge.strong}`}>{strongCount} Strong</span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${strengthBadge.moderate}`}>{moderateCount} Moderate</span>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${strengthBadge.weak}`}>{weakCount} Weak</span>
        <span className="text-xs text-secondary font-medium">+12 this week</span>
      </div>

      {/* Search + sort */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 glass rounded-xl text-sm bg-transparent border border-border/30 focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="glass rounded-xl px-4 py-2.5 text-sm flex items-center gap-2 border border-border/30 hover:border-primary/50 transition-colors"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="hidden sm:inline text-muted-foreground">Sort</span>
          </button>
          {showSort && (
            <div className="absolute right-0 top-12 glass rounded-xl border border-border/30 py-1 z-10 min-w-[200px]">
              {sorts.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSort(s); setShowSort(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === s ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === f ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="glass rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold">Your vocabulary library is empty</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Start a voice practice session to begin building your word collection!</p>
          <button onClick={() => navigate("/practice")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 inline-flex items-center gap-2">
            Start Practice <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Word list */
        <div className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No words match your search.</p>
          )}
          {filtered.map((w) => {
            const isExpanded = expandedId === w.id;
            return (
              <div
                key={w.id}
                className="glass rounded-2xl overflow-hidden transition-all cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : w.id)}
              >
                <div className="flex items-center gap-3 p-4">
                  {/* Strength dot */}
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${strengthDot[w.strength]}`} />

                  {/* Word info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm">{w.word}</span>
                      <span className="text-xs text-muted-foreground">{w.pronunciation}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{w.translation}</p>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${strengthBadge[w.strength]} hidden sm:inline`}>
                      {w.topic}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 border-t border-border/20 space-y-3">
                        <div className="pt-3 space-y-1">
                          <p className="text-sm italic text-foreground">"{w.exampleEn}"</p>
                          <p className="text-xs text-muted-foreground">"{w.exampleTranslation}"</p>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                          <span>Last practiced: <span className="text-foreground">{w.lastPracticed}</span></span>
                          <span>Times used correctly: <span className="text-foreground">{w.timesCorrect}</span></span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate("/practice"); }}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-xs font-medium transition-all"
                        >
                          Practice This Word
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
