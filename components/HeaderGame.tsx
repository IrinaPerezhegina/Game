"use client";
import React from "react";
import "../styles/globals.css";
import styles from "../styles/Header.module.scss";
import Timer from "./Timer";

interface HeaderGameProps {
  timer: number;
  isRunning: boolean;
  startGame: () => void;
}

const HeaderGame: React.FC<HeaderGameProps> = ({
  isRunning,
  timer,
  startGame,
}) => {
  return (
    <header className={styles.header}>
      <button className={styles.btn} onClick={() => startGame()}>
        {isRunning ? "RESTART" : "START"}
      </button>
      <Timer time={timer} />
    </header>
  );
};

export default HeaderGame;
