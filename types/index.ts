export interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighboringMines: number;
  isQuestioned: boolean;
}
export interface Player {
  id?: number;
  name: string;
  time: number;
}
