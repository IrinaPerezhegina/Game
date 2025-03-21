import React from "react";
import styles from "../styles/Cell.module.scss";
import "../styles/globals.css";
import { Cell as CellType } from "../types/index"; // Импортируем тип ячейки

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}
type ColorCellType = {
  [key: number]: string;
};
const ColorCell: ColorCellType = {
  0: "#9ba0a9",
  1: "#0810ae",
  2: "#19ca02",
  3: "#cf0707",
  4: "#060269",
  5: "#ad0008",
  6: "#14ffe8",
  7: "#00020f",
  8: "#ffffff",
};

const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick }) => {
  const getCellContent = () => {
    if (cell.isRevealed) {
      if (cell.hasMine) {
        return "💣"; // Отображаем мину
      } else if (cell.neighboringMines > 0) {
        return cell.neighboringMines; // Отображаем количество соседних мин
      } else {
        return ""; // Пустая ячейка
      }
    } else if (cell.isFlagged) {
      return "🚩"; // Отображаем флаг
    } else {
      return ""; // Закрытая ячейка
    }
  };

  return (
    <div
      className={`${styles.cell} cell ${cell.isRevealed ? "revealed" : ""} ${
        cell.isFlagged ? "flagged" : ""
      } `}
      style={{
        background: cell.isRevealed ? "#9ba0a9" : "#2A333D",
        color: ColorCell[cell.neighboringMines],
      }}
      onClick={onClick}
      onContextMenu={onRightClick} // Обрабатываем правый клик
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;
