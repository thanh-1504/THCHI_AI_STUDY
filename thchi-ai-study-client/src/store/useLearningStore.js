import { create } from "zustand";

const useLearningStore = create((set) => ({
  currentIndex: 0,
  setCurrentIndex: (value) => set({ currentIndex: value }),
}));
export default useLearningStore;
