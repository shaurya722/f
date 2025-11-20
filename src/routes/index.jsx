import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { GuestRoute } from '@/components/auth/GuestRoute';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Users } from '@/pages/Users';
import { Profile } from '@/pages/Profile';
import { constants } from '@/constants';

export const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path={constants.routes.home} element={<Home />} />

      <Route
        path={constants.routes.login}
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path={constants.routes.dashboard}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={constants.routes.users}
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path={constants.routes.profile}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to={constants.routes.home} replace />}
      />
    </Routes>
  </Layout>
);
