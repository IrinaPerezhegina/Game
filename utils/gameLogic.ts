import { Cell as CellType } from "../types/index";

// export const generateMines = (
//   rows: number,
//   cols: number,
//   mines: number,
//   firstClick: number[]
// ) => {
//   const board = Array.from({ length: rows }, () => Array(cols).fill(0));
//   const minePositions = new Set();

//   while (minePositions.size < mines) {
//     const x = Math.floor(Math.random() * rows);
//     const y = Math.floor(Math.random() * cols);
//     if (
//       !minePositions.has(`${x},${y}`) &&
//       !(x === firstClick[0] && y === firstClick[1])
//     ) {
//       minePositions.add(`${x},${y}`);
//       board[x][y] = -1; // -1 represents a mine
//       // Increment surrounding cells
//       for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {
//           if (
//             x + i >= 0 &&
//             x + i < rows &&
//             y + j >= 0 &&
//             y + j < cols &&
//             board[x + i][y + j] !== -1
//           ) {
//             board[x + i][y + j]++;
//           }
//         }
//       }
//     }
//   }
//   return board;
// };

export const initializeBoard = (
  rows: number,
  cols: number,
  mineCount: number
): CellType[][] => {
  const board: CellType[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      hasMine: false,
      isRevealed: false,
      isFlagged: false,
      neighboringMines: 0,
    }))
  );

  // Размещаем мины
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].hasMine) {
      board[row][col].hasMine = true;
      minesPlaced++;
    }
  }

  // Подсчитываем соседние мины
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].hasMine) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              !(i === 0 && j === 0)
            ) {
              board[newRow][newCol].neighboringMines++;
            }
          }
        }
      }
    }
  }

  return board;
};
