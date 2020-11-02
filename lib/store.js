import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { configurePersist } from 'zustand-persist';

const isRunningInBrowser = () => typeof window !== 'undefined';

const persist = (name, config) => (set, get, api) => {
  const initialState = config(
    (payload) => {
      set(payload);

      if (isRunningInBrowser()) {
        localStorage.setItem(name, JSON.stringify(get()));
      }
    },
    get,
    api
  );

  const restoredState = isRunningInBrowser()
    ? JSON.parse(localStorage.getItem(name))
    : {};

  return {
    ...initialState,
    ...restoredState,
  };
};

export const useStore = create(
  devtools(
    persist('appState', (set) => ({
      info: '',
      setInfo: (info) => set((state) => ({ info })),
    }))
  )
);
