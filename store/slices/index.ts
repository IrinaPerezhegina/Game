import { combineReducers } from "redux";
import gameReducer from "./leaderboardStore";

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
