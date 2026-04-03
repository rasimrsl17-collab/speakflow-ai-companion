export const mockUser = {
  id: "1",
  name: "Alex",
  email: "alex@example.com",
  avatar: "",
  nativeLanguage: "Azerbaijani",
  learningLanguage: "English",
  level: "B1 Intermediate",
  streak: 14,
  plan: "Pro",
  dailyGoal: 15,
  correctionStyle: "Balanced",
  learningGoal: "Career growth",
  tutorVoice: "Nova (Female)",
};

export const mockStats = {
  sessionsThisWeek: 4,
  pronunciationScore: 78,
  wordsLearned: 342,
  newWordsThisWeek: 12,
  currentLevel: "B1 Intermediate",
  levelProgress: 65,
  weeklyGoal: { completed: 4, total: 7 },
};

export const mockWeakAreas = [
  { name: "th pronunciation", score: 42, type: "pronunciation" },
  { name: "present perfect", score: 58, type: "grammar" },
  { name: "medical vocabulary", score: 23, type: "vocabulary" },
];

export const mockRecentSessions = [
  { id: "1", date: "2024-03-15", topic: "Restaurant Ordering", duration: "12 min", score: 82 },
  { id: "2", date: "2024-03-14", topic: "Job Interview Practice", duration: "18 min", score: 75 },
  { id: "3", date: "2024-03-13", topic: "Travel Directions", duration: "10 min", score: 88 },
  { id: "4", date: "2024-03-12", topic: "Free Conversation", duration: "15 min", score: 71 },
  { id: "5", date: "2024-03-11", topic: "Shopping Dialogue", duration: "8 min", score: 90 },
];

export const mockProgressData = {
  pronunciationTrend: [
    { week: "W1", score: 52 }, { week: "W2", score: 58 }, { week: "W3", score: 55 },
    { week: "W4", score: 63 }, { week: "W5", score: 68 }, { week: "W6", score: 72 },
    { week: "W7", score: 70 }, { week: "W8", score: 78 },
  ],
  sessionsPerWeek: [
    { week: "W1", sessions: 3 }, { week: "W2", sessions: 5 }, { week: "W3", sessions: 4 },
    { week: "W4", sessions: 6 }, { week: "W5", sessions: 5 }, { week: "W6", sessions: 7 },
    { week: "W7", sessions: 4 }, { week: "W8", sessions: 4 },
  ],
  vocabularyGrowth: [
    { week: "W1", words: 45 }, { week: "W2", words: 82 }, { week: "W3", words: 125 },
    { week: "W4", words: 178 }, { week: "W5", words: 220 }, { week: "W6", words: 265 },
    { week: "W7", words: 310 }, { week: "W8", words: 342 },
  ],
  skills: [
    { name: "Pronunciation", score: 78, trend: "up" as const },
    { name: "Grammar", score: 65, trend: "up" as const },
    { name: "Vocabulary", score: 72, trend: "up" as const },
    { name: "Fluency", score: 58, trend: "down" as const },
  ],
  errorPatterns: [
    { type: "th → t substitution", example: "'I tink' instead of 'I think'", frequency: 23, status: "improving" as const },
    { type: "Present perfect misuse", example: "'I go' instead of 'I have gone'", frequency: 15, status: "needs_work" as const },
    { type: "Article omission", example: "'I went to store'", frequency: 18, status: "improving" as const },
  ],
  vocabularyMap: [
    { category: "Travel", count: 87 },
    { category: "Food", count: 62 },
    { category: "Business", count: 34 },
    { category: "Medical", count: 12 },
    { category: "Technology", count: 45 },
    { category: "Daily Life", count: 102 },
  ],
  achievements: [
    { name: "7 Day Streak", icon: "🔥", earned: true },
    { name: "First 100 Words", icon: "📚", earned: true },
    { name: "Perfect Score", icon: "⭐", earned: true },
    { name: "Night Owl", icon: "🦉", earned: false },
    { name: "Marathon Speaker", icon: "🏃", earned: false },
    { name: "Polyglot", icon: "🌍", earned: false },
    { name: "Grammar Guru", icon: "📝", earned: true },
    { name: "30 Day Streak", icon: "💎", earned: false },
  ],
};

export const mockPracticeMessages = [
  { role: "ai" as const, text: "Hello! Let's practice ordering at a restaurant today. Imagine you just walked into a nice restaurant. The waiter approaches you. What would you say?" },
];

export const testimonials = [
  { name: "Nigar M.", quote: "I improved my IELTS speaking score from 5.5 to 7.0 in just 2 months!", avatar: "N" },
  { name: "Ahmet K.", quote: "Finally, a language app that actually makes me speak. No more boring multiple choice!", avatar: "A" },
  { name: "Olga S.", quote: "The AI remembers my mistakes and keeps pushing me to improve. It's like having a real tutor.", avatar: "O" },
];
