import api from "../lib/axios";
export const authService = {
  login: (data) => api.post("/auth/login", data, { withCredentials: true }),
  register: (data) => api.post("/auth/register", data),
  verifyOtp: (data) => api.post("/auth/verify-otp", data),
  loginGoogle: () => api.get("/auth/google"),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
};
export default authService;
