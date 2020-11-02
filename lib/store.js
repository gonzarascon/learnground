import create from 'zustand';

export const useStore = create((set) => ({
  info: '',
  setInfo: (info) => set((state) => ({ info })),
}));
