import { mockUser, mockStats, mockWeakAreas, mockRecentSessions, mockProgressData, mockPracticeMessages } from "./mockData";

// Placeholder API functions — replace with real API calls later

export const fetchUser = async () => mockUser;
export const fetchStats = async () => mockStats;
export const fetchWeakAreas = async () => mockWeakAreas;
export const fetchRecentSessions = async () => mockRecentSessions;
export const fetchProgressData = async () => mockProgressData;
export const fetchPracticeMessages = async () => mockPracticeMessages;

export const updateUserProfile = async (data: Partial<typeof mockUser>) => {
  console.log("Updating profile:", data);
  return { ...mockUser, ...data };
};

export const startPracticeSession = async (scenario: string, difficulty: string) => {
  console.log("Starting session:", scenario, difficulty);
  return { sessionId: "new-session-1", topic: scenario };
};

export const sendVoiceMessage = async (_sessionId: string, _transcript: string) => {
  await new Promise((r) => setTimeout(r, 1500));
  return {
    response: "That's great! Now try saying: 'I would like to order the grilled salmon, please.'",
    corrections: [{ type: "grammar", original: "I want have", suggestion: "I would like to have" }],
    pronunciationScore: 76,
  };
};

export const endPracticeSession = async (_sessionId: string) => {
  return { score: 82, duration: "12 min", wordsSpoken: 156, errorsCount: 3 };
};
