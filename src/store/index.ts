import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import optionsReducer from './optionsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    options: optionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
