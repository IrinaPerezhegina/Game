"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/Settings.module.scss";
import "../styles/globals.css";
const Setting = () => {
  const router = useRouter();
  const [gameSelected, setGameSelected] = useState<string>("");
  const dispatch = useAppDispatch;
  const count = useAppSelector((state) => state.game.name);
  console.log(dispatch, count);
  // const count = useAppSelector((state) => state.counter.name);
  return (
    <>
      <Container className={styles.screen}>
        <button
          className={styles.fixedBtn}
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowBackIosNewIcon />
       
        </button>
        <h1 className={styles.title}>Выберите уровень сложности игры:</h1>
        <div className={styles.btnWrapper}>
          <button
            onClick={() => setGameSelected("easy")}
            className={gameSelected === "easy" ? styles.selected : styles.btn}
          >
            Простой (8x8, 10 мин)
          </button>

          <button
            onClick={() => setGameSelected("medium")}
            className={gameSelected === "medium" ? styles.selected : styles.btn}
          >
            Средний 16x16, 40 мин
          </button>

          <button
            onClick={() => setGameSelected("hard")}
            className={gameSelected === "hard" ? styles.selected : styles.btn}
          >
            Сложный 32x16, 100 мин
          </button>
        </div>
        {gameSelected && (
          <button
            className={styles.start}
            onClick={() => {
              router.push("/game");
            }}
          >
            Начать игру
          </button>
        )}
      </Container>
    </>
  );
};

export default Setting;
