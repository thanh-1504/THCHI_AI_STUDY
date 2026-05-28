import { create } from "zustand";

const useNotebookStore = create((set) => ({
    inputValue: "",
    hasSearch: false,
    notebookActive: false,
    isActiveLevel: 1,
    isCheckedWord: true,
    setInputValue: value => set({ inputValue: value }),
    setHasSearch: value => set({ hasSearch: value }),
    setIsActiveLevel: value => set({ isActiveLevel: value }),
    setIsCheckedWord: () => set((state) => ({ isCheckedWord: !state.isCheckedWord }))

}))
export default useNotebookStore;