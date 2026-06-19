import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ConfirmEmailModal from "../../components/modals/ConfirmEmailModal";
import RegisterSchema from "../../schemas/register.schema";
import useAuthStore from "../../store/useAuthStore";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
  });
  const {
    showPassword,
    showConfirmModal,
    setShowPassword,
    setShowConfirmModal,
    setName,
    setEmail,
    setPassword,
  } = useAuthStore();

  const emailValue = watch("email");
  const passwordValue = watch("password");

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
          <form className="w-[60%] flex flex-col gap-4">
            {/* Tên */}
            <input
              type="text"
              {...register("name", {
                onChange: (e) => setName(e.target.value),
              })}
              placeholder="Tên của bạn"
              className="
                w-full border border-gray-200 rounded-2xl px-5 py-4
                text-gray-700 text-base outline-none bg-white
                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                transition-all duration-150
              "
            />
            {errors.name?.message && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}

            {/* Email */}
            <input
              type="email"
              {...register("email", {
                onChange: (e) => setEmail(e.target.value),
              })}
              placeholder="Nhập chính xác email của bạn"
              className="
                w-full border border-gray-200 rounded-2xl px-5 py-4
                text-gray-700 text-base outline-none bg-white
                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                transition-all duration-150
              "
            />
            {errors.email?.message && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  placeholder="Tạo mật khẩu (dễ nhớ chút nhé ^^)"
                  className="
        w-full
        border border-gray-200
        rounded-2xl
        px-5 py-4
        pr-24
        text-gray-700
        outline-none
        bg-white
        focus:border-amber-400
        focus:ring-2
        focus:ring-amber-100
        transition-all
      "
                />

                {passwordValue?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          text-green-500
          font-semibold
          text-sm
          flex
          items-center
          gap-1
          cursor-pointer
          hover:opacity-80
        "
                  >
                    {showPassword ? (
                      <>
                        <EyeOff size={16} />
                        <span>Ẩn</span>
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        <span>Hiện</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {errors.password?.message && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Submit button */}
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className={`
              w-[60%] py-3 rounded-full text-base font-semibold
              transition-all duration-200 mx-auto
              ${
                isValid
                  ? "bg-(image:--my-gradient) text-white shadow-[0_5px_0_#1f8f2f] hover:opacity-90 active:shadow-none active:translate-y-[3px] cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
              }
            `}
            >
              Nhận mã xác thực
            </button>
          </form>
        </div>
      </div>

      {/* Confirm email modal */}
      {showConfirmModal && (
        <ConfirmEmailModal onClose={() => setShowConfirmModal(false)} />
      )}
    </div>
  );
};

export default Register;
