"use client";
import Setting from "@/components/Setting";
import { Container } from "@mui/material";
import React from "react";
import styles from "../styles/Settings.module.scss";

const Settings: React.FC = () => {
  return (
    <Container className={styles.screen}>
      <Setting />
    </Container>
  );
};

export default Settings;
