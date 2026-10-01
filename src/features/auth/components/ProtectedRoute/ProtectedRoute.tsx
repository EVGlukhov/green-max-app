import { Navigate, Outlet } from 'react-router';
import { useGreen } from '@/api';

export const ProtectedRoute = () => {
  const { stateInstance } = useGreen();
  return stateInstance ? <Outlet /> : <Navigate to="/" replace />;
};
