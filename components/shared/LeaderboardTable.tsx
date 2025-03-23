"use client";
import { Player } from "@/types";
import { getTime } from "@/utils/getTime";
import { Container } from "@mui/material";
import React from "react";
import styles from "../../styles/Leaderboard.module.scss";

// Определяем типы для свойств компонента
interface LeaderboardTableProps {
  players: Player[];
}

// Компонент таблицы лидеров
export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  players,
}) => {
  const bestPlayer = players[0];
  const otherPlayers = players.slice(1, 10);

  return (
    <Container>
      <div className={styles.resultsTable}>
        <div className={styles.header}>
          <div className={styles.cell}>1 Place</div>
          <div className={styles.cell}>
            <span>Player:</span> {bestPlayer?.name}
          </div>
          <div className={styles.cell}>
            <span>Time: </span>
            {getTime(bestPlayer?.time)}
          </div>
        </div>
        {otherPlayers.map((player, index) => (
          <div className={styles.row} key={player.id}>
            <div className={styles.cell}>{index + 2} Place</div>
            <div className={styles.cell}>
              <span>Player: </span> {player?.name}
            </div>
            <div className={styles.cell}>
              {" "}
              <span>Time:</span> {getTime(player?.time)}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
