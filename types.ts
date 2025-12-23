export enum AppPhase {
  Start = 'START',
  Diagnose = 'DIAGNOSE',
  Visualize = 'VISUALIZE', // New Phase
  Interpret = 'INTERPRET',
  Judge = 'JUDGE',
  Enlighten = 'ENLIGHTEN',
}

export enum SufferingType {
  Loss = 'LOSS',
  Unknown = 'UNKNOWN',
  Desire = 'DESIRE',
  Order = 'ORDER',
  Meaning = 'MEANING',
  Relationship = 'RELATIONSHIP',
  Self = 'SELF',
  Past = 'PAST',
  Future = 'FUTURE',
}

export interface MoodCard {
  id: string;
  imageUrl: string;
  abstractKey: string;
  label: string; // New field for the Chinese name of the card (e.g., "Chaos", "Void")
}

export interface UserInput {
  selectedCards: string[]; // IDs of selected cards
  confusionText: string;
  sufferingType: SufferingType;
}

export interface ThreeMirrors {
  essence: string; // Self
  circumstance: string; // External
  action: string; // Return
}

export interface FutureScenario {
  name: string;
  description: string; // Narrative description
}

export interface AnalysisResult {
  verse: string; // The activated verse
  threeMirrors: ThreeMirrors;
  stickingPointQuestion: string; // The "Why not turn back" question
  philosopherNote: string;
  futureScenarios: FutureScenario[];
  godsSigh: string; // "The God sits back turned..."
  awakeningStone: string; // Smallest actionable step
  timestamp: number;
  generatedImage?: string; // Base64 data URI for the generated mind image
  verseAudio?: string; // Base64 audio string for the spoken verse
}

export interface ArchiveItem extends AnalysisResult {
  id: string;
  originalInput: string;
}