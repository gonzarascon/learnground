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
      appType: null,
      userType: null,
      /**
       * setUserType
       * @param {'instructor' | 'alumn' | null} type
       */
      setUserType: (type) => set({ userType: type }),
      /**
       * setAppType
       * @param {'normal' | 'gamified'} type
       */
      setAppType: (type) => set({ type }),
    }))
  )
);

export const useUserStore = create();
