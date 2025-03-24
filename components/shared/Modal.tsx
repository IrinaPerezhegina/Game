"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setPlayerToLocalStorage } from "@/store/slices/leaderboardStore";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Modal.module.scss";
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

export const MyModal: React.FC<ModalProps> = ({
  gameOver,
  open,
  handleClose,
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const timeGame = useAppSelector((state) => state.game.time);
  const dispatch = useAppDispatch();

  const onClickClose = () => {
    handleClose(false);
  };

  const onClickCloseVictory = () => {
    if (value) {
      dispatch(setPlayerToLocalStorage({ name: value, time: timeGame }));

      handleClose(false);
      router.push("/settings");
    }
  };

  useEffect(() => {
    if (!value) {
      setError("Fill in the details");
    }
    if (value) {
      setError("");
    }
  }, [value]);
  const content = gameOver ? (
    <Box sx={styleGameower} className={styles.gameower}>
      <h2 className={styles.gameower}>GAME OVER!</h2>
    </Box>
  ) : (
    <Box sx={styleWinner} className={styles.winner}>
      <h2 className={styles.winner}>WINNER!</h2>
      <div className={styles.input}>
        <h4>Ваш результат, мин.</h4>
        <Timer time={timeGame} />
        <div className={styles.label}>
          <label>Your Nickname: </label>
          <input
            name="name"
            placeholder="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
      {value && (
        <button onClick={onClickCloseVictory} className={styles.btn}>
          Close
        </button>
      )}
    </Box>
  );
  return (
    <Modal open={open} onClose={gameOver ? onClickClose : onClickCloseVictory}>
      {content}
    </Modal>
  );
};
