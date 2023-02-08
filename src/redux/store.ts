import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users.slice';
import strategiesReducer from './strategies.slice';
import tilesReducer from './tiles.slice';

export const store = configureStore({
  reducer: {
    usersReducer,
    strategiesReducer,
    tilesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
