import { create } from "zustand";

const useUIStore = create((set) => ({
  isOpenModal: false,
  isOpenModalComment: false,
  isSelectedCourse: false,
  setIsOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
  setIsOpenModalComment: (value) => set({ isOpenModalComment: value }),
  setIsSelectedCourse: (value) => set({ isSelectedCourse: value }),
}));
export default useUIStore;
