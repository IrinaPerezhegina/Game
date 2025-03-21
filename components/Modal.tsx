"use client";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/hooks/hooks";
import styles from "../styles/Modal.module.scss";
import Timer from "./Timer";

interface ModalProps {
  open: boolean;
  handleClose: (data: boolean) => void;
  victory: boolean;
  gameOver: boolean;
}
const styleGameower = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "red",
  border: "5px solid white",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const styleWinner = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#00851c",
  border: "5px solid white",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const MyModal: React.FC<ModalProps> = ({
  victory,
  gameOver,
  open,
  handleClose,
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const timeGame = useAppSelector((state) => state.game.time);
  const onClickClose = () => {
    if (gameOver) {
      handleClose(false);
    }
    if (victory) {
      handleClose(false);
      router.push("/settings");
    }
  };
  useEffect(() => {
    if (!value) {
      setError("Заполните данные");
    }
    if (value) {
      setError("");
    }
  }, [value]);
  const content = gameOver ? (
    <Box sx={styleGameower}>
      <h2 className={styles.gameower}>GAME OVER!</h2>
    </Box>
  ) : (
    <Box sx={styleWinner}>
      <h2 className={styles.winner}>WINNER!</h2>
      <div className={styles.input}>
        <h4>Ваш результат, мин.</h4>
        <Timer time={timeGame} />
        <div className="">
          <label>Ваш имя</label>
          <input
            name=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <div className="">{error}</div>}
        </div>
      </div>
      {value && <button onClick={onClickClose}>Close</button>}
    </Box>
  );
  return (
    <Modal open={open} onClose={onClickClose}>
      {content}
    </Modal>
  );
};

export default MyModal;
