import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '@/config/queryClient';
import { AppRoutes } from '@/routes';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

const AppContent = () => {
  useAuth();
  const initTheme = useStore(state => state.initTheme);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return <AppRoutes />;
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
