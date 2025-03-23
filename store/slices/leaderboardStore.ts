import { Player } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const BestPlayer = [
  {
    id: 1,
    name: "Nik",
    time: 36,
  },
  {
    id: 2,
    name: "Iris",
    time: 45,
  },
  {
    id: 3,
    name: "Katya",
    time: 20,
  },
  {
    id: 4,
    name: "Serg",
    time: 75,
  },
  {
    id: 5,
    name: "Kolya",
    time: 125,
  },
  {
    id: 6,
    name: "Marin",
    time: 55,
  },
  {
    id: 7,
    name: "Nelly",
    time: 130,
  },
  {
    id: 8,
    name: "Nelly",
    time: 56,
  },
  {
    id: 9,
    name: "Rick",
    time: 120,
  },
  {
    id: 10,
    name: "Jan",
    time: 222,
  },
];

interface GameState {
  rows: number;
  cols: number;
  countMines: number;
  time: number;
  bestPlayers: Player[];
}

const initialState: GameState = {
  rows: 0,
  cols: 0,
  countMines: 0,
  time: 100,
  bestPlayers: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initBestPlayers: (state) => {
      const storedResults = localStorage.getItem("playerResults");

      // Проверяем, есть ли данные
      if (storedResults) {
        try {
          // Парсим данные из JSON-строки в объект
          const parsedData = JSON.parse(storedResults);
          const result = (parsedData || BestPlayer) as Player[];
          state.bestPlayers = result
            .sort((a, b) => a.time - b.time)
            .slice(0, 10);
        } catch (error) {
          console.error("Ошибка при парсинге данных:", error);
        }
      } else {
        if (!storedResults) {
          localStorage.setItem("playerResults", JSON.stringify(BestPlayer));
        }
      }
    },
    setPlayerToLocalStorage: (state, action: PayloadAction<Player>) => {
      const storedResults = localStorage.getItem("playerResults");
      let arrayPlayers = [];
      if (storedResults) {
        try {
          // Парсим существующие данные
          arrayPlayers = JSON.parse(storedResults);

          // Проверяем, что данные - это массив
          if (!Array.isArray(arrayPlayers)) {
            console.error(
              "Данные не являются массивом. Инициализируем пустой массив."
            );
            arrayPlayers = [];
          }
        } catch (error) {
          console.error("Ошибка при парсинге существующих данных:", error);
        }
      }
      arrayPlayers.push({ ...action.payload, id: arrayPlayers.length + 1 });

      // Сохраняем обновленный массив обратно в localStorage
      localStorage.setItem("playerResults", JSON.stringify(arrayPlayers));
      state.bestPlayers = [
        ...state.bestPlayers,
        { ...action.payload, id: arrayPlayers.length + 1 },
      ];
    },
    getTimeGame: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setSettings: (
      state,
      action: PayloadAction<{ cols: number; rows: number; time: number }>
    ) => {
      localStorage.setItem(
        "levelGame",
        JSON.stringify({
          rows: action.payload.rows,
          cols: action.payload.cols,
          time: action.payload.time,
        })
      );
      state.cols = action.payload.cols;
      state.rows = action.payload.rows;
      state.time = action.payload.time;
      state.countMines = (state.cols * state.rows) / 8;
    },
  },
});

export const {
  setPlayerToLocalStorage,
  setSettings,
  getTimeGame,
  initBestPlayers,
} = gameSlice.actions;
export default gameSlice.reducer;
