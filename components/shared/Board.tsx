import { Cell as CellType } from "@/types";
import React from "react";
import styles from "../../styles/Board.module.scss";
import { Cell } from "./Cell";

interface BoardProps {
  board: CellType[][];
  size: number;
  colsNum: number;
  handleCellClick: (row: number, col: number) => void;
  handleRightClick: (e: React.MouseEvent, row: number, col: number) => void;
}
type SizBoardType = {
  [key: number]: string;
};
const SizeGridTemplateColumns: SizBoardType = {
  8: "easy",
  16: "medium",
  32: "hard",
};
export const Board: React.FC<BoardProps> = ({
  board,
  size,
  handleCellClick,
  handleRightClick,
}) => {
  return (
    <div
      className={`${styles.board} ${styles[SizeGridTemplateColumns[size]]}`}
      style={{
        display: "grid",
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            size={size}
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};
