import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import ForgotEmailModal from "../../components/modals/ForgotEmailModal";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isReady = isValidEmail && password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isReady || loading) return;
    setError("");
    setLoading(true);
    // TODO: gọi API đăng nhập admin
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    // navigate("/admin/dashboard");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin(e);
  };

  return (
    <>
      {/* ── Full-screen dark background ── */}
      <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f0f0f0]">
        {/* ── Login card ── */}
        <div className="relative w-full max-w-md mx-4 rounded-3xl overflow-hidden  bg-white">
          {/* Card top accent line */}
          <div className="px-8 py-10 flex flex-col gap-7">
            {/* ── Brand / Header ── */}
            <div className="flex flex-col items-center gap-4">
              {/* Shield icon */}
              <div className="text-center">
                <h1 className="text-2xl font-black tracking-tight text-yellow-400">
                  ThChi Admin
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Cổng quản trị hệ thống
                </p>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-gray-600 text-sm font-medium tracking-widest uppercase">
                Đăng nhập
              </span>
            </div>

            {/* ── Form ── */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4"
              noValidate
            >
              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider pl-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition-colors duration-200"
                  />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="admin@thchi.edu.vn"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none  placeholder-gray-400 border border-[rgba(255,255,255,0.1)] focus:border-amber-400 focus:ring-2 focus:ring-amber-100
              transition-all duration-150 bg-gray-50"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider pl-1">
                  Mật khẩu
                </label>
                <div className="relative group">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition-colors duration-200"
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm outline-none  placeholder-gray-400 border border-[rgba(255,255,255,0.1)] focus:border-amber-400 focus:ring-2 focus:ring-amber-100
              transition-all duration-150 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors duration-150 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="px-4 py-2.5 rounded-xl text-sm text-red-400 font-medium"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Forgot password — above submit */}
              <div className="flex justify-end">
                <button
                  id="admin-forgot-password-btn"
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs font-medium transition-colors duration-200 cursor-pointer text-yellow-400 hover:opacity-80"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Submit button */}
              <button
                id="admin-login-btn"
                type="submit"
                disabled={!isReady || loading}
                className="relative w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 overflow-hidden"
                style={
                  isReady && !loading
                    ? {
                        background:
                          "linear-gradient(83deg, #58cc02 9.02%, #23ac38 90.81%)",
                        color: "white",
                        boxShadow:
                          "0 8px 0 rgba(35,172,56,0.5), 0 2px 4px rgba(0,0,0,0.2)",
                        cursor: "pointer",
                      }
                    : {
                        background:
                          "linear-gradient(83deg, #58cc02 9.02%, #23ac38 90.81%)",
                        color: "white",
                        opacity: 0.6,
                        cursor: "not-allowed",
                      }
                }
                onMouseEnter={(e) => {
                  if (isReady && !loading) {
                    e.currentTarget.style.opacity = "0.92";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isReady && !loading) {
                    e.currentTarget.style.opacity = "1";
                  }
                }}
                onMouseDown={(e) => {
                  if (isReady && !loading) {
                    e.currentTarget.style.transform = "translateY(6px)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
                onMouseUp={(e) => {
                  if (isReady && !loading) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 0 rgba(35,172,56,0.5), 0 2px 4px rgba(0,0,0,0.2)";
                  }
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Đang xác thực...
                  </span>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Forgot password modal ── */}
      {showForgot && <ForgotEmailModal onClose={() => setShowForgot(false)} />}
    </>
  );
};

export default AdminLogin;
