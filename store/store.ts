import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/index"; // Импортируйте корневый редюсер

const store = configureStore({
  reducer: rootReducer,

  
  // Вы можете добавить middleware, если это необходимо
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
