import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

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
