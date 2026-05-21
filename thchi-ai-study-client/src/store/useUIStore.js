import { create } from 'zustand'

const useUIStore = create((set) => ({
    isOpenModal: false,
    isSelectedCourse: false,
    setIsOpenModal: () => set((state) => ({ isOpenModal: !state.isOpenModal })),
    setIsSelectedCourse: value => set({ isSelectedCourse: value })
}))
export default useUIStore