export type NodeId =
  | 'psicologica'
  | 'patrimonial'
  | 'digital'
  | 'obstetrica'
  | 'institucional'
  | 'sintese'

export type NodeStatus = 'available' | 'completed'

export type SceneKind = 'dialogue' | 'phone' | 'narrative' | 'summary'

export interface DialogueOption {
  id: string
  label: string
  response: string
}

export interface DialogueBeat {
  speaker: string
  text: string
  options?: DialogueOption[]
}

export interface NodeContent {
  id: NodeId
  kind: SceneKind
  title: string
  mapLabel: string
  position: { x: number; y: number }
  intro: string
  beats: DialogueBeat[]
  reveal: {
    term: string
    explanation: string
    signs: string[]
  }
}

export type ViewState = 'home' | 'map' | 'scene' | 'summary'

export interface GameState {
  currentView: ViewState
  activeNodeId: NodeId | null
  completedNodes: Set<NodeId>
  choicesMade: Record<string, string>
}

export type GameAction =
  | { type: 'START_TRAIL' }
  | { type: 'OPEN_NODE'; nodeId: NodeId }
  | { type: 'CLOSE_SCENE' }
  | { type: 'RECORD_CHOICE'; beatIndex: number; optionId: string }
  | { type: 'COMPLETE_NODE'; nodeId: NodeId }
  | { type: 'OPEN_SUMMARY' }
  | { type: 'GO_HOME' }
  | { type: 'RESET' }
