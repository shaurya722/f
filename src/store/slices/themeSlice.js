import { constants } from '@/constants';
import { themeStore } from '@/utils/tokenStore';

export const createThemeSlice = set => ({
  mode: constants.theme.light,

  setMode: mode => {
    themeStore.set(mode);
    
    // Update document class
    if (mode === constants.theme.dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ mode }, false, 'theme/setMode');
  },

  toggleMode: () => {
    set(
      state => {
        const newMode =
          state.mode === constants.theme.light
            ? constants.theme.dark
            : constants.theme.light;
        
        themeStore.set(newMode);
        
        if (newMode === constants.theme.dark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        return { mode: newMode };
      },
      false,
      'theme/toggleMode'
    );
  },

  initTheme: () => {
    const savedMode = themeStore.get();
    if (savedMode === constants.theme.dark) {
      document.documentElement.classList.add('dark');
    }
    set({ mode: savedMode }, false, 'theme/initTheme');
  },
});
