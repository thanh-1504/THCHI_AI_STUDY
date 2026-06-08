import { create } from "zustand";

const useCommunityStore = create((set) => ({
  image: null,
  previewUrl: null,
  commentImage: null,
  isAddPost: false,
  setImage: (value) => set({ image: value }),
  setIsAddPost: (value) => set({ isAddPost: value }),
  setPreviewUrl: (value) => set({ previewUrl: value }),
  setCommentImage: (value) => set({ commentImage: value }),
}));

export default useCommunityStore;
