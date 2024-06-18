import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

export default function RequireAuth() {
  const { token } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
