import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  name: "",
  setName: (name) => set({ name }),
  password: "",
  setPassword: (password) => set({ password }),
  showPassword: false,
  setShowPassword: (showPassword) => set({ showPassword }),
  showConfirmModal: false,
  setShowConfirmModal: (showConfirmModal) => set({ showConfirmModal }),
}));

export default useAuthStore;
