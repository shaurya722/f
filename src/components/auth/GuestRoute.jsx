import { Navigate } from 'react-router-dom';
import { useStore } from '@/store';
import { constants } from '@/constants';

export const GuestRoute = ({ children }) => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={constants.routes.dashboard} replace />;
  }

  return children;
};
