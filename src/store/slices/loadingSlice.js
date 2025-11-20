export const createLoadingSlice = set => ({
  isLoading: false,
  loadingMessage: '',

  setLoading: (loading, message = '') => {
    set({ isLoading: loading, loadingMessage: message }, false, 'loading/setLoading');
  },

  startLoading: (message = 'Loading...') => {
    set({ isLoading: true, loadingMessage: message }, false, 'loading/startLoading');
  },

  stopLoading: () => {
    set({ isLoading: false, loadingMessage: '' }, false, 'loading/stopLoading');
  },
});
