import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { createThemeSlice } from './slices/themeSlice';
import { createLoadingSlice } from './slices/loadingSlice';

export const useStore = create(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createThemeSlice(...args),
    ...createLoadingSlice(...args),
  }))
);
