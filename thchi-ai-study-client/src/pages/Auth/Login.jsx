import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../../components/icons/GoogleIcon";
import ForgotEmailModal from "../../components/modals/ForgotEmailModal";
import LoginSchema from "../../schemas/login.schema";
import authService from "../../services/auth.service";
import useUIStore from "../../store/useUIStore";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });
  const { showForgotModal, setShowForgotModal } = useUIStore();
  const handleLogin = async (data) => {
    if (!isValid) return;
    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });
      navigate("/review");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f0f0f0] w-full min-h-screen">
      <div className="w-[60%] min-h-screen mx-auto bg-white">
        {/* Login Header */}
        <div className="bg-yellow-400 text-center py-4 rounded-b-2xl">
          <h2 className="text-2xl font-semibold">Đăng nhập</h2>
        </div>

        {/* Login With Google Account */}
        <div className="mt-8 mb-5">
          <h2 className="text-center text-2xl font-semibold mb-5">
            Đăng nhập tài khoản học ThChi
          </h2>
          <button
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
            }}
            className="
            min-w-66
            flex items-center justify-center gap-x-5
            mx-auto
            bg-[#d21919] text-white
            rounded-3xl p-2
            shadow-[0_5px_0_rgb(255,210,210)]
            active:translate-y-[6px] active:shadow-none
            transition-all duration-100
            cursor-pointer
            "
          >
            <GoogleIcon />
            <span className="font-semibold">Đăng nhập với G+</span>
          </button>
          <p className="uppercase text-center mt-5 text-xl font-semibold">
            HOẶC
          </p>
        </div>

        {/* Login With Email And Password */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-y-5"
        >
          <input
            {...register("email")}
            type="text"
            placeholder="Nhập email tài khoản"
            className="w-[45%] mx-auto rounded-xl p-4 outline-none bg-gray-100"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Nhập chính xác mật khẩu của bạn"
            className="w-[45%] mx-auto rounded-xl p-4 outline-none bg-gray-100"
          />
          <button
            type="submit"
            className="
            min-w-60
            flex items-center justify-center gap-x-5
            mx-auto
            bg-(image:--my-gradient) text-white
            rounded-3xl p-2
            shadow-[0_5px_0_#1c8c2c]
            active:translate-y-[6px] active:shadow-none
            transition-all duration-100
            cursor-pointer font-semibold text-lg
            "
          >
            Đăng nhập
          </button>
        </form>

        {/* Forgot Password And Register */}
        <div className="mt-8 flex flex-col gap-y-3">
          <button
            onClick={() => setShowForgotModal(true)}
            className="text-center text-blue-400 font-normal underline cursor-pointer hover:text-blue-600 transition-colors"
          >
            Quên mật khẩu?
          </button>
          <div className="text-center">
            <span>Chưa có tài khoản?</span>{" "}
            <Link
              to={"/register"}
              className="text-blue-600 font-semibold underline cursor-pointer hover:opacity-80 transition-opacity"
            >
              Tạo tài khoản học mới
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot password modal */}
      {showForgotModal && (
        <ForgotEmailModal onClose={() => setShowForgotModal(false)} />
      )}
    </div>
  );
};

export default Login;
