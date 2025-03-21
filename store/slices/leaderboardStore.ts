import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  value: number;
  name: string;
  time: number;
  numCheckboxes: number;
}

const initialState: GameState = {
  value: 0,
  name: "",
  time: 0,
  numCheckboxes: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    getTimeGame: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setValue, getTimeGame } =
  gameSlice.actions;
export default gameSlice.reducer;
