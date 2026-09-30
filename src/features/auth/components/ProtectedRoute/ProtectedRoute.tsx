import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/auth';

export const ProtectedRoute = () => {
  const { stateInstance } = useAuth();
  return stateInstance ? <Outlet /> : <Navigate to="/" replace />;
};
