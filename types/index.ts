export interface Cell {
  hasMine: boolean; // Указывает, содержит ли ячейка мину
  isRevealed: boolean; // Указывает, открыта ли ячейка
  isFlagged: boolean; // Указывает, помечена ли ячейка флагом
  neighboringMines: number; // Количество мин в соседних ячейках
  isQuestioned: boolean; // Установлен ли вопросик
}
export interface Player {
  id?: number;
  name: string;
  time: number;
}

export const enum Sizes {
  Size8 = "40px",
}
