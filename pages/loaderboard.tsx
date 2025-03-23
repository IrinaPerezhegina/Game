import { LeaderboardTable } from "@/components/shared";
import { BackButton } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { initBestPlayers } from "@/store/slices/leaderboardStore";
import { Container } from "@mui/material";
import { useEffect } from "react";

const Leaderboard = () => {
  const players = useAppSelector((state) => state.game.bestPlayers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initBestPlayers());
  }, [dispatch]);

  return (
    <Container>
      <BackButton href="/" />
      <LeaderboardTable players={players} />
    </Container>
  );
};

export default Leaderboard;
