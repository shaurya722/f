import { Navigate } from 'react-router-dom';
import { useStore } from '@/store';
import { constants } from '@/constants';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={constants.routes.login} replace />;
  }

  return children;
};
