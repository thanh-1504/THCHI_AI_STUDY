import { Link } from "react-router-dom";
import ForgotEmailModal from "../../components/modals/ForgotEmailModal";
import useUIStore from "../../store/useUIStore";

const Login = () => {
  const { showForgotModal, setShowForgotModal } = useUIStore();
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
            <svg
              fill="#eee"
              className="w-9 h-9"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M386.3 228.5c1.8 9.7 3.1 19.4 3.1 32 0 109.8-73.6 187.5-184.4 187.5-106.1 0-192-85.9-192-192S98.9 64 205 64c51.9 0 95.1 18.9 128.6 50.3l-52.1 50c-14.1-13.6-39-29.6-76.5-29.6-65.5 0-118.9 54.2-118.9 121.3S139.5 377.3 205 377.3c76 0 104.5-54.7 109-82.8l-109 0 0-66 181.3 0 0 0zm185.4 6.4l0-55.7-56 0 0 55.7-55.7 0 0 56 55.7 0 0 55.7 56 0 0-55.7 55.7 0 0-56-55.7 0z" />
            </svg>
            <span className="font-semibold">Đăng nhập với G+</span>
          </button>
          <p className="uppercase text-center mt-5 text-xl font-semibold">
            HOẶC
          </p>
        </div>

        {/* Login With Email And Password */}
        <div className="flex flex-col gap-y-5">
          <input
            type="text"
            placeholder="Nhập email tài khoản"
            className="w-[45%] mx-auto rounded-xl p-4 outline-none bg-gray-100"
          />
          <input
            type="password"
            placeholder="Nhập chính xác mật khẩu của bạn"
            className="w-[45%] mx-auto rounded-xl p-4 outline-none bg-gray-100"
          />
          <button
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
        </div>

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
