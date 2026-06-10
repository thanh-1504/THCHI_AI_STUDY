import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmEmailModal from "../../components/modals/ConfirmEmailModal";
import useAuthStore from "../../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const {
    name,
    email,
    password,
    showPassword,
    showConfirmModal,
    loading,
    setName,
    setEmail,
    setPassword,
    setShowPassword,
    setShowConfirmModal,
    setLoading,
  } = useAuthStore();

  // Kích hoạt nút khi cả 3 trường đều có dữ liệu và email hợp lệ
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isReady = name.trim() !== "" && isValidEmail && password.length >= 1;

  const handleSubmit = () => {
    if (!isReady) return;
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    // TODO: gọi API đăng ký / gửi OTP
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setShowConfirmModal(false);
    navigate("/verify-email", { state: { email: email.trim() } });
  };

  return (
    <div className="bg-[#f0f0f0] w-full min-h-screen">
      <div className="w-[60%] min-h-screen mx-auto bg-white flex flex-col">
        {/* ── Header ── */}
        <div className="px-5 pt-6 shrink-0">
          <button
            onClick={() => navigate("/register")}
            className="
              w-9 h-9 flex items-center justify-center
              rounded-full bg-gray-100
              cursor-pointer
              shadow-[0_3px_0_rgba(0,0,0,0.10)]
              active:translate-y-[3px] active:shadow-none
              transition-all duration-150
              hover:bg-gray-200
            "
          >
            <ChevronLeft
              size={20}
              className="text-gray-600"
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col items-center gap-6 pt-10 pb-10 px-10 flex-1">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center leading-snug">
            Cùng tạo 1 tài khoản ThChi nào
          </h2>

          {/* Form */}
          <div className="w-[60%] flex flex-col gap-4">
            {/* Tên */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên của bạn"
              className="
                w-full border border-gray-200 rounded-2xl px-5 py-4
                text-gray-700 text-base outline-none bg-white
                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                transition-all duration-150
              "
            />

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập chính xác email của bạn"
              className="
                w-full border border-gray-200 rounded-2xl px-5 py-4
                text-gray-700 text-base outline-none bg-white
                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                transition-all duration-150
              "
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tạo mật khẩu (dễ nhớ chút nhé ^^)"
                className="
                  w-full border border-gray-200 rounded-2xl px-5 py-4 pr-20
                  text-gray-700 text-base outline-none bg-white
                  focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                  transition-all duration-150
                "
              />
              {password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 font-semibold text-sm cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff size={15} />
                      <span>Ẩn</span>
                    </>
                  ) : (
                    <>
                      <Eye size={15} />
                      <span>Hiện thị</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isReady}
            className={`
              w-[40%] py-3 rounded-full text-base font-semibold
              transition-all duration-200
              ${
                isReady
                  ? "bg-(image:--my-gradient) text-white shadow-[0_5px_0_#1f8f2f] hover:opacity-90 active:shadow-none active:translate-y-[3px] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Nhận mã xác thực
          </button>
        </div>
      </div>

      {/* Confirm email modal */}
      {showConfirmModal && (
        <ConfirmEmailModal
          email={email.trim()}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Register;
