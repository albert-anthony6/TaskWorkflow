import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../store/configureStore';
import { logoutUser } from '../store/slices/userSlice';

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  // Redirect to home page after logout
  return <Navigate to="/" replace />;
}
