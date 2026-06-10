import { X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ForgotEmailModal = ({ onClose }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { email, setEmail, loading, setLoading } = useAuthStore();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async () => {
    if (!isValidEmail || loading) return;
    setLoading(true);
    // TODO: gọi API gửi OTP
    // await sendForgotPasswordEmail(email.trim());
    await new Promise((r) => setTimeout(r, 600)); // giả lập delay
    setLoading(false);
    onClose();
    navigate("/forgot-password", { state: { email: email.trim() } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 z-[60]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[61] pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl min-w-96 pointer-events-auto relative px-8 pt-10 pb-8 flex flex-col gap-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="
              absolute -top-4 right-3
              p-1 rounded-full bg-white
              cursor-pointer
              shadow-[0_3px_0_rgba(0,0,0,0.15)]
              active:translate-y-[3px] active:shadow-none
              transition-all duration-150
            "
          >
            <X strokeWidth={3.5} size={25} className="text-yellow-400" />
          </button>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 text-center leading-snug">
            Nhập email chính xác để nhận mã xác thực
          </h2>

          {/* Email input */}
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập email tài khoản học"
            autoFocus
            className="
              w-full border border-gray-200 rounded-xl px-4 py-3
              text-gray-700 text-base outline-none
              focus:border-amber-400 focus:ring-2 focus:ring-amber-100
              transition-all duration-150 bg-gray-50
            "
          />

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isValidEmail || loading}
            className={` p-3 rounded-2xl text-base font-semibold
              transition-all duration-200 w-[50%] mx-auto
              ${
                isValidEmail && !loading
                  ? "bg-(image:--my-gradient) text-white shadow-[0_5px_0_#1f8f2f] hover:opacity-90 active:shadow-none active:translate-y-[3px] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Đang gửi..." : "Nhận mã ngay"}
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ForgotEmailModal;
