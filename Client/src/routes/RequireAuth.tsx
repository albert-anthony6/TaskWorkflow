import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import { toast } from 'react-toastify';

export default function RequireAuth() {
  const { token } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!token) {
    toast.error('Unauthorized');
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
