import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RESEND_DELAY = 60;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email ?? "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, []);

  const startCountdown = () => {
    setCanResend(false);
    setCountdown(RESEND_DELAY);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    // TODO: gọi API gửi lại OTP
    startCountdown();
  };

  const handleUpdateEmail = () => {
    navigate("/register-email");
  };

  const handleVerify = async () => {
    if (otp.trim().length === 0 || loading) return;
    setLoading(true);
    // TODO: gọi API xác thực OTP đăng ký
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    // TODO: navigate về trang chủ / login sau khi xác thực thành công
    navigate("/login");
  };

  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(val);
  };

  const isReady = otp.trim().length > 0;

  return (
    <div className="bg-[#f0f0f0] w-full min-h-screen">
      <div className="w-[60%] min-h-screen mx-auto bg-white">
        {/* ── Header ── */}
        <div className="bg-yellow-400 flex items-center px-4 py-4 rounded-b-2xl relative">
          <button
            onClick={() => navigate("/register-email")}
            className="
              w-9 h-9 flex items-center justify-center
              rounded-full bg-white
              cursor-pointer
              shadow-[0_3px_0_rgba(0,0,0,0.12)]
              active:translate-y-[3px] active:shadow-none
              transition-all duration-150
            "
          >
            <ChevronLeft size={20} className="text-gray-600" strokeWidth={2.5} />
          </button>
          <h2 className="flex-1 text-center text-2xl font-semibold text-gray-800 pr-9">
            Tạo tài khoản mới
          </h2>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col items-center gap-6 pt-12 px-12">
          {/* Description */}
          <p className="text-center text-gray-700 text-xl leading-relaxed">
            Thchi đã gửi mã xác thực đến email:
            <br />
            <span className="font-bold text-gray-900">{email}</span>
          </p>

          {/* OTP Input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Nhập mã xác thực"
            autoFocus
            className="
              w-[55%] border border-gray-200 rounded-xl px-4 py-3
              text-gray-700 text-base outline-none text-center tracking-widest
              focus:border-amber-400 focus:ring-2 focus:ring-amber-100
              transition-all duration-150 bg-gray-50
            "
          />

          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={!isReady || loading}
            className={`
              w-[30%] py-3 rounded-2xl text-base font-semibold
              transition-all duration-200
              ${
                isReady && !loading
                  ? "bg-(image:--my-gradient) text-white shadow-[0_5px_0_#1f8f2f] hover:opacity-90 active:shadow-none active:translate-y-[3px] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Đang xác thực..." : "Xác thực email"}
          </button>

          {/* Resend section */}
          <div className="flex flex-col gap-2 text-center text-gray-600 mt-2">
            <p className="font-medium">Bạn không nhận được mã xác thực?</p>

            {/* 1. Cập nhật lại email */}
            <p>
              <span className="text-text-green font-semibold">1. </span>
              <button
                onClick={handleUpdateEmail}
                className="text-text-green font-semibold cursor-pointer hover:opacity-80 transition-opacity"
              >
                Cập nhật lại email
              </button>
            </p>

            {/* 2. Nhận 1 mã mới – không có countdown, luôn là link xanh */}
            <p>
              <span className="text-text-green font-semibold">2. </span>
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-text-green font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Nhận 1 mã mới
                </button>
              ) : (
                <button
                  disabled
                  className="text-gray-400 font-semibold cursor-not-allowed"
                >
                  Nhận 1 mã mới{" "}
                  <span className="font-normal">
                    (chờ{" "}
                    <span className="font-bold text-amber-500">{countdown}s</span>
                    )
                  </span>
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
