"use client";
import React from "react";
import styles from "../../styles/Timer.module.scss";

interface TimerProps {
  time: number; // Время в секундах
}

export const Timer: React.FC<TimerProps> = ({ time }) => {
  // Преобразуем время в минуты и секунды
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Форматируем минуты и секунды, чтобы они всегда были двухзначными
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <div className={styles.timer}>
      <h1>
        {formattedMinutes}:{formattedSeconds}
      </h1>
    </div>
  );
};

export default Timer;
