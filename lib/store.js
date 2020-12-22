import create from 'zustand';
import { devtools } from 'zustand/middleware';

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
      shopOpen: false,
      loggedIn: false,
      /**
       * setUserType
       * @param {'instructor' | 'alumn' | null} type
       */
      setUserType: (type) => set({ userType: type }),
      /**
       * setAppType
       * @param {'normal' | 'gamified'} type
       */
      setAppType: (type) => set({ appType: type }),
      /**
       * setShopOpen
       * @param {boolean} state
       */
      setShopOpen: (state) => set({ shopOpen: state }),
      setLoggedIn: (state) => set({ loggedIn: state }),
    }))
  )
);

export const useUserStore = create(
  persist('userState', (set) => ({
    uid: null,
    user: {},
    /**
     * setUser
     * @param {{user: Record<string, unknown>; uid: String;}} user
     */
    setUser: ({ user, uid }) => set({ user, uid }),
  }))
);

export const useCourseStore = create(
  devtools((set) => ({
    courseId: undefined,
    classData: undefined,
    chatMessages: undefined,
  }))
);
