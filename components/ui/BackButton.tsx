"use client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/BackButton.module.scss";

interface BackButtonProps {
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  const router = useRouter();
  return (
    <button
      className={styles.backdBtn}
      onClick={() => {
        router.push(href);
      }}
    >
      <ArrowBackIosNewIcon />
    </button>
  );
};
