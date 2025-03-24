import React from "react";
import styles from "../../styles/Cell.module.scss";
import { Cell as CellType } from "../../types/index"; // Импортируем тип ячейки

interface CellProps {
  cell: CellType;
  size: number;
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
type SizeCellType = {
  [key: number]: string;
};
const SizeCell: SizeCellType = {
  8: "easy",
  16: "medium",
  32: "hard",
};
export const Cell: React.FC<CellProps> = ({
  size,
  cell,
  onClick,
  onRightClick,
}) => {
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
    } else if (cell.isQuestioned) {
      return "❓";
    } else {
      return ""; // Закрытая ячейка
    }
  };

  return (
    <div
      className={`${styles[SizeCell[size]]} ${styles.cell} cell ${
        cell.isRevealed ? "revealed" : ""
      } ${cell.isFlagged ? "flagged" : ""} `}
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
