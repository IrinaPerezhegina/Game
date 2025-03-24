"use client";
import { useAppDispatch } from "@/hooks/hooks";
import { setSettings } from "@/store/slices/leaderboardStore";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../styles/Settings.module.scss";
import { BackButton } from "../ui";

const Settings = {
  easy: {
    cols: 8,
    rows: 8,
    time: 600,
  },
  medium: {
    cols: 16,
    rows: 16,
    time: 2400,
  },
  hard: {
    cols: 32,
    rows: 16,
    time: 6000,
  },
};

export const Setting = () => {
  const router = useRouter();
  const [gameSelected, setGameSelected] = useState<
    "easy" | "medium" | "hard" | ""
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameSelected) {
      dispatch(setSettings(Settings[gameSelected]));
    }
  }, [gameSelected, dispatch]);

  return (
    <>
      <Container className={styles.screen}>
        <BackButton href="/" />

        <h1 className={styles.title}>
          Choose the difficulty level of the game:
        </h1>
        <div className={styles.btnWrapper}>
          <button
            onClick={() => setGameSelected("easy")}
            className={gameSelected === "easy" ? styles.selected : styles.btn}
          >
            Easy (8x8, 10 min)
          </button>

          <button
            onClick={() => setGameSelected("medium")}
            className={gameSelected === "medium" ? styles.selected : styles.btn}
          >
            Medium 16x16, 40 min
          </button>

          <button
            onClick={() => setGameSelected("hard")}
            className={gameSelected === "hard" ? styles.selected : styles.btn}
          >
            Hard 32x16, 100 min
          </button>
        </div>
        {gameSelected && (
          <button
            className={styles.start}
            onClick={() => {
              router.push("/game");
            }}
          >
            START GAME
          </button>
        )}
      </Container>
    </>
  );
};
