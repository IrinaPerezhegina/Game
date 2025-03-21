import { combineReducers } from "redux";
import gameReducer from "./leaderboardStore";

const rootReducer = combineReducers({
  game: gameReducer,
  // Добавьте другие редюсеры здесь
});

export default rootReducer;
