// hooks/useGame.ts
import { getTimeGame } from "@/store/slices/leaderboardStore";
import { useEffect, useState } from "react";
import { Cell as CellType } from "../types/index";
import { initializeBoard } from "../utils/gameLogic";
import { useAppDispatch } from "./hooks";
const useGame = (
  rows: number,
  cols: number,
  mineCount: number,
  time: number
) => {
  const [board, setBoard] = useState<CellType[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [victory, setVictory] = useState(false);
  const [middleMouseDown, setMiddleMouseDown] = useState(false);
  const [middleMouseDownTime, setMiddleMouseDownTime] = useState(0);
  const dispatch = useAppDispatch();

  const startGame = () => {
    setBoard(initializeBoard(rows, cols, mineCount));
    setGameOver(false);
    setFlags(0);
    setTimer(0);
    setVictory(false);
    setIsRunning(true);
  };
  const checkVictory = (board: CellType[][]) => {
    const allCellsChecked = board.every((cellRows: CellType[]) =>
      cellRows.every((cell: CellType) => cell.isRevealed || cell.isFlagged)
    );
    const allMinesFlagged = board
      .flat()
      .filter((cell) => cell.hasMine)
      .every((el) => el.isFlagged);

    const equalFlagsMines =
      board.flat().filter((cell) => cell.hasMine).length === flags;
    if ((allCellsChecked && equalFlagsMines) || allMinesFlagged) {
      setVictory(true);
      dispatch(getTimeGame(timer));
      setIsRunning(false);
      setTimer(0);
    }
    return victory;
  };

  useEffect(() => {
    if (timer >= time) {
      setGameOver(true);
    }
  }, [time, timer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;
    if (victory) {
      return;
    }
    // console.log(board);

    // const allMinesOpen = board.flat().filter((cell) => !cell.isRevealed);

    // console.log(allMinesOpen);
    // if (allMinesOpen) {
    //   setVictory(true);
    //   dispatch(getTimeGame(timer));
    //   setIsRunning(false);
    //   setTimer(0);
    // }
    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.isRevealed || cell.isFlagged) {
      return;
    }

    cell.isRevealed = true;

    if (cell.hasMine) {
      setGameOver(true);
      setIsRunning(false);
    } else {
      // Если ячейка не имеет соседних мин, открываем соседние ячейки
      if (cell.neighboringMines === 0) {
        openAdjacentCells(newBoard, row, col);
      }
    }
    const allСellOpenWithoutMines = newBoard
      .flat()
      .filter((cell) => !cell.isRevealed)
      .every((el) => el.hasMine);
    if (allСellOpenWithoutMines) {
      setVictory(true);
      dispatch(getTimeGame(timer));
      setIsRunning(false);
      setTimer(0);
      return;
    }

    setBoard(newBoard);
  };

  const openAdjacentCells = (board: CellType[][], row: number, col: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !(i === 0 && j === 0)
        ) {
          const adjacentCell = board[newRow][newCol];
          if (!adjacentCell.isRevealed && !adjacentCell.isFlagged) {
            adjacentCell.isRevealed = true;
            if (adjacentCell.neighboringMines === 0) {
              openAdjacentCells(board, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver) return;
    if (victory) {
      return;
    }
    const newBoard = [...board];
    const cell = newBoard[row][col];
    if (!cell.isRevealed) {
      if (cell.isFlagged) {
        setFlags((prevCount) => prevCount - 1);
        cell.isFlagged = false;
        cell.isQuestioned = true;
      } else if (cell.isQuestioned) {
        cell.isQuestioned = false;
      } else {
        setFlags((prevCount) => prevCount + 1);
        cell.isFlagged = true;
      }
      if (checkVictory(newBoard)) {
        setVictory(true);
      }
      setBoard(newBoard);
    }
  };

  const handleMiddleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setMiddleMouseDown(true);
    setMiddleMouseDownTime(Date.now());
  };

  const handleMiddleMouseUp = (
    e: React.MouseEvent,
    row: number,
    col: number
  ) => {
    e.preventDefault();
    setMiddleMouseDown(false);
    const elapsedTime = Date.now() - middleMouseDownTime;

    if (elapsedTime < 1000) {
      const cell = board[row][col];
      if (cell.isRevealed && cell.neighboringMines === flags) {
        openAllUnflaggedCells(board);
      }
    }
  };

  const openAllUnflaggedCells = (board: CellType[][]) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = board[i][j];
        if (!cell.isFlagged && !cell.isRevealed && cell.neighboringMines > 0) {
          cell.isRevealed = true;
          if (cell.neighboringMines === 0) {
            openAdjacentCells(board, i, j);
          }
        }
      }
    }
    setBoard([...board]);
  };
  return {
    board,
    gameOver,
    flags,
    timer,
    victory,
    startGame,
    handleCellClick,
    handleRightClick,
    handleMiddleMouseDown,
    openAllUnflaggedCells,
    handleMiddleMouseUp,
    isRunning,
  };
};

export default useGame;
