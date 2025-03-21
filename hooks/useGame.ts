// hooks/useGame.ts
import { getTimeGame } from "@/store/slices/leaderboardStore";
import { useEffect, useState } from "react";
import { Cell as CellType } from "../types/index";
import { initializeBoard } from "../utils/gameLogic";
import { useAppDispatch } from "./hooks";
const useGame = (rows: number, cols: number, mineCount: number) => {
  const [board, setBoard] = useState<CellType[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [victory, setVictory] = useState(false);
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
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    board,
    gameOver,
    flags,
    setFlags,
    setVictory,
    victory,
    timer,
    setGameOver,
    startGame,
    isRunning,
    setBoard,
    setIsRunning,
    checkVictory,
  };
};

export default useGame;
