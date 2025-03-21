import { Cell as CellType } from "@/types";
import React from "react";
import styles from "../styles/Board.module.scss";

import Cell from "./Cell";
interface BoardProps {
  board: CellType[][];
  colsNum: number;
  handleCellClick: (row: number, col: number) => void;
  handleRightClick: (e: React.MouseEvent, row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  colsNum,
  handleCellClick,
  handleRightClick,
}) => {
  return (
    <div
      className={styles.board}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${colsNum}, 35px)`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
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

export default Board;
