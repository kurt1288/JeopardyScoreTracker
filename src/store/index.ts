import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { initialState } from './reducer';

const state = localStorage.getItem('state');
const persistedState = state !== null ? JSON.parse(state) : initialState;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

export type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

export default store;