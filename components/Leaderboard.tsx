import React from "react";
import styles from "../styles/Leaderboard.module.scss";
// Определяем тип для игрока
interface Player {
  name: string;
  score: number;
}

// Определяем типы для свойств компонента
interface LeaderboardProps {
  players: Player[];
}

// Компонент таблицы лидеров
const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Таблица лидеров</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Имя</th>
            <th className={styles.header}>Очки</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>{player.name}</td>
              <td className={styles.cell}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
