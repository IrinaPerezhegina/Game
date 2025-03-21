export interface Cell {
    hasMine: boolean;        // Указывает, содержит ли ячейка мину
    isRevealed: boolean;     // Указывает, открыта ли ячейка
    isFlagged: boolean;      // Указывает, помечена ли ячейка флагом
    neighboringMines: number; // Количество мин в соседних ячейках
}