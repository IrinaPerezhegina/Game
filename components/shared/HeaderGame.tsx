"use client";
import React from "react";
import styles from "../../styles/Header.module.scss";
import Timer from "./Timer";

interface HeaderGameProps {
  timer: number;
  isRunning: boolean;
  mineCount: number;
  flags: number;
  startGame: () => void;
}

export const HeaderGame: React.FC<HeaderGameProps> = ({
  isRunning,
  timer,
  flags,
  startGame,
  mineCount,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.setting}>
        <button className={styles.btn} onClick={() => startGame()}>
          {isRunning ? "RESTART" : "START"}
        </button>
        <Timer time={timer} />
      </div>
      {isRunning && (
        <div className={styles.counter}>
          <span>counter: {mineCount - flags}</span>
        </div>
      )}
    </header>
  );
};
