import { create } from 'zustand'

type SessionPhase = 'idle' | 'browsing' | 'playing'
type ScenarioPhase = 'situation' | 'choosing' | 'outcome'

interface ChoiceResult {
  choiceId: string
  outcomeType: string
  outcomeText: string
  xpEarned: number
  starsEarned: number
  characterExpr: string
}

interface ScenarioState {
  sessionPhase: SessionPhase
  scenarioPhase: ScenarioPhase
  activeScenarioId: string | null
  result: ChoiceResult | null

  startBrowsing: () => void
  openScenario: (id: string) => void
  selectChoice: (result: ChoiceResult) => void
  resetScenario: () => void
  endSession: () => void
}

export const useScenarioStore = create<ScenarioState>()((set) => ({
  sessionPhase: 'idle',
  scenarioPhase: 'situation',
  activeScenarioId: null,
  result: null,

  startBrowsing: () => set({ sessionPhase: 'browsing' }),

  openScenario: (id) =>
    set({
      sessionPhase: 'playing',
      scenarioPhase: 'situation',
      activeScenarioId: id,
      result: null,
    }),

  selectChoice: (result) =>
    set({
      scenarioPhase: 'outcome',
      result,
    }),

  resetScenario: () =>
    set({
      scenarioPhase: 'situation',
      activeScenarioId: null,
      result: null,
      sessionPhase: 'browsing',
    }),

  endSession: () =>
    set({
      sessionPhase: 'idle',
      scenarioPhase: 'situation',
      activeScenarioId: null,
      result: null,
    }),
}))
