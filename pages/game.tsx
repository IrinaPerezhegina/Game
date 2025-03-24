"use client";

import { Board, HeaderGame, MyModal } from "@/components/shared";
import { BackButton } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import useGame from "@/hooks/useGame";
import { setSettings } from "@/store/slices/leaderboardStore";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../styles/Game.module.scss";

const Game: React.FC = () => {
  const { cols, rows, time, countMines } = useAppSelector(
    (state) => state.game
  );
  const {
    board,
    gameOver,
    flags,
    timer,
    victory,
    startGame,
    handleCellClick,
    handleRightClick,
    isRunning,
  } = useGame(rows, cols, countMines, time);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const level = localStorage.getItem("levelGame");

    if (level) {
      dispatch(setSettings(JSON.parse(level)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (gameOver) {
      setOpen(true);
    }
    if (victory) {
      setOpen(true);
    }
  }, [victory, gameOver]);

  return (
    <>
      <Container className={styles.screen}>
        <BackButton href="/settings" />
        <HeaderGame
          isRunning={isRunning || gameOver}
          startGame={startGame}
          timer={timer}
          key={"HeaderGame"}
          mineCount={countMines}
          flags={flags}
        />

        <Board
          size={cols}
          board={board}
          colsNum={cols}
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
