
export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Tetromino {
  shape: number[][];
  color: string;
  type: TetrominoType;
}

export interface Position {
  x: number;
  y: number;
}

export interface PieceState {
  type: TetrominoType;
  shape: number[][];
  position: Position;
  color: string;
}

export interface GameState {
  grid: (string | null)[][];
  activePiece: PieceState | null;
  nextPiece: PieceState;
  holdPiece: PieceState | null;
  score: number;
  lines: number;
  level: number;
  gameOver: boolean;
  isPaused: boolean;
  canHold: boolean;
}

export interface SettingsState {
  bgmVolume: number;
  sfxVolume: number;
  controlType: 'buttons' | 'swipe';
  showGhost: boolean;
  theme: 'classic' | 'neon' | 'flat';
  vibration: boolean;
}
