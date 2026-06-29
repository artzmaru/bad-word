export const queryKeys = {
  words: ['words'] as const,
  word: (id: string) => ['words', id] as const,
  wordDetails: (id: string) => ['word-details', id] as const,
  progress: (childId: string) => ['progress', childId] as const,
  wordProgress: (childId: string) => ['word-progress', childId] as const,
  scenarios: ['scenarios'] as const,
  scenario: (id: string) => ['scenarios', id] as const,
  quizQuestions: (wordIds: string[]) => ['quiz-questions', ...wordIds] as const,
  childProfiles: (parentId: string) => ['profiles', parentId] as const,
  parentSettings: (parentId: string) => ['parent-settings', parentId] as const,
  childSettings: (childId: string) => ['child-settings', childId] as const,
}
