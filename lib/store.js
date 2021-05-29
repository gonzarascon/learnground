import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { StoreItems } from './constants';
import { EventsEnum } from './events';
import { registerEvent } from './firebase/dataFunctions';

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
      profileAlert: false,
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
      setProfileAlert: (boolean) => set({ profileAlert: boolean }),
    }))
  )
);

export const useUserStore = create(
  devtools(
    persist('userState', (set) => ({
      uid: null,
      user: {},
      /**
       * setUser
       * @param {{user: Record<string, unknown>; uid: String;}} user
       */
      setUser: ({ user, uid }) => set({ user, uid }),
      setUserOnly: (user) => set({ user }),
      clearUser: () => set({ uid: null, user: {} }),
    }))
  )
);

export const useProfileStore = create(
  devtools(
    persist('profileStore', (set, get) => ({
      profileData: null,
      visitorIsOwner: false,
      selectedColor: null,
      setProfileData: (profileData) => set({ profileData }),
      setVisitorOwner: (boolean) => set({ visitorIsOwner: boolean }),
      setBadge: (badge) => {
        registerEvent(EventsEnum.ACQUIRE_BADGE, {
          [EventsEnum.ACQUIRE_BADGE]: badge,
        });
        const data = get().profileData;
        const badges = data ? data.badges : [];
        set({
          profileData: {
            ...data,
            badges: [...badges, badge],
          },
        });
      },
      setSelectedColor: (color) => set({ selectedColor: color }),
    }))
  )
);

export const useCourseStore = create(
  devtools(
    persist('actualCourse', (set) => ({
      courseId: undefined,
      classData: undefined,
      chatMessages: undefined,
      courseData: undefined,
      contentsPreview: undefined,
      setCourseData: (courseData) =>
        set({
          courseId: courseData.uid,
          courseData: courseData.data,
          contentsPreview: courseData.contents,
        }),
    }))
  )
);

export const useContentStore = create(
  devtools((set) => ({
    data: undefined,
    title: undefined,
    chatId: undefined,
    uid: undefined,
    active: undefined,
    slug: undefined,
    setContent: (contentData) => set({ ...contentData }),
  }))
);

export const useCourseEditStore = create(
  devtools(
    persist('courseEdit', (set) => ({
      courseData: null,
      contentData: null,
      setCourseData: (courseData) => set({ courseData }),
      setContentData: (contentData) => set({ contentData }),
    }))
  )
);

export const useItemsStore = create(
  persist('itemsStore', (set, get) => ({
    availableItems: StoreItems,
    purchasedItems: [],
    availableMoney: 1500,
    setPurchasedItem: (item) => {
      const prevItems = get().purchasedItems;
      set({ purchasedItems: [...prevItems, item] });
    },
    restMoney: (ammount) => {
      const currentAmmount = get().availableMoney;

      if (currentAmmount > 0) {
        set({ availableMoney: currentAmmount - ammount });
      }
    },
  }))
);
