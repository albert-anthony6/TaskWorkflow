import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { taskSlice } from './slices/taskSlice';
import { userSlice } from './slices/userSlice';
import { usersSlice } from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
