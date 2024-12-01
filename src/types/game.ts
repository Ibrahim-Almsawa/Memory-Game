export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  status: 'idle' | 'playing' | 'completed';
  moves: number;
  time: number;
  cards: Card[];
  flippedCards: Card[];
}

export interface Score {
  moves: number;
  time: number;
  date: string;
}

export type Difficulty = '3x4' | '4x4' | '5x5';

export interface GameSettings {
  difficulty: Difficulty;
  darkMode: boolean;
}