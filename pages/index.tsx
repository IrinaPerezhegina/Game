import { useAppDispatch } from "@/hooks/hooks";
import { initBestPlayers } from "@/store/slices/leaderboardStore";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initBestPlayers());
  }, [dispatch]);

  return (
    <Container className="screen">
      <button className="btn" onClick={() => router.push("/settings")}>
        Game
      </button>
      <button className="btn" onClick={() => router.push("/loaderboard")}>
        Leaderboard
      </button>
    </Container>
  );
};

export default Home;
