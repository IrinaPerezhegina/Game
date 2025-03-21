"use client";
import Board from "@/components/Board";
import HeaderGame from "@/components/HeaderGame";
import MyModal from "@/components/Modal";
import useGame from "@/hooks/useGame";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../styles/Game.module.scss";
import { Cell as CellType } from "../types/index";
const NUM_ROWS = 10;
const NUM_COLS = 10;
const NUM_MINES = 10;

const Game: React.FC = () => {
  const {
    board,
    gameOver,
    setGameOver,
    setFlags,
    flags,
    timer,
    setVictory,
    victory,
    setIsRunning,
    startGame,
    setBoard,
    checkVictory,
    isRunning,
  } = useGame(NUM_ROWS, NUM_COLS, NUM_MINES);
  console.log(setVictory);
  
  const router = useRouter();
  const [open, setOpen] = useState(false);

  console.log(flags, NUM_MINES, victory);
  useEffect(() => {
    if (victory) {


      setOpen(true);
    }
  }, [victory]);
  const handleCellClick = (row: number, col: number) => {
    if (gameOver) return;
    if (victory) {
      return;
    }
    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.isRevealed || cell.isFlagged) {
      return;
    }

    cell.isRevealed = true;

    if (cell.hasMine) {
      setGameOver(true);
      setOpen(true);
      setIsRunning(false);
    } else {
      // Если ячейка не имеет соседних мин, открываем соседние ячейки
      if (cell.neighboringMines === 0) {
        openAdjacentCells(newBoard, row, col);
      }
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
          newRow < NUM_ROWS &&
          newCol >= 0 &&
          newCol < NUM_COLS &&
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

    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (!cell.isRevealed) {
      cell.isFlagged = !cell.isFlagged; // Переключаем состояние флага
      if (cell.isFlagged) {
        setFlags((prevCount) => prevCount + 1); // Увеличиваем количество флажков
      } else {
        setFlags((prevCount) => prevCount - 1); // Уменьшаем количество флажков
      }
      console.log(checkVictory(newBoard));
      console.log(flags, NUM_MINES);

      setBoard(newBoard);
    }
  };

  return (
    <>
      <Container className={styles.screen}>
        <button
          className={styles.fixedBtn}
          onClick={() => {
            router.push("/settings");
          }}
        >
          <ArrowBackIosNewIcon />
     
        </button>
        <HeaderGame
          isRunning={isRunning || gameOver}
          startGame={startGame}
          timer={timer}
          key={"HeaderGame"}
        />
        {isRunning&&<span>
          Разность между количеством мин и флажков - {NUM_MINES - flags}
        </span>}

        <Board
          board={board}
          colsNum={NUM_COLS}
          handleCellClick={handleCellClick}
          handleRightClick={handleRightClick}
        />
        <MyModal
          victory={victory}
          gameOver={gameOver}
          open={open}
          handleClose={setOpen}
        />
      </Container>
    </>
  );
};

export default Game;
