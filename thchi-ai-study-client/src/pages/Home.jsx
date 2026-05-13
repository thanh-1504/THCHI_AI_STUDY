import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-start min-h-screen bg-white">
      {/* Sidebar Left */}
      <div className="bg-[#f0f0f0] w-[20%] self-stretch relative border-r border-gray-200">
        <span className="fixed w-[20%] bottom-6 text-xl text-[#ff9600] font-semibold text-center">
          ThchiVocab ver0.0.1
        </span>
      </div>

      {/* Main Content */}
      <div className="w-[60%] p-6">
        {/* <Chart /> */}
        <Outlet />
      </div>

      {/* Sidebar Right */}
      <div className="bg-[#f0f0f0] w-[20%] self-stretch p-4 flex flex-col items-center gap-4 border-l border-gray-200">
        {/* Card 1: Số từ đã học */}
        <div className="relative w-full max-w-[280px] aspect-[16/10] bg-[url('/reviewwords.png')] bg-contain bg-no-repeat bg-center flex flex-col items-center justify-center">
          <div className="-translate-y-2 text-center">
            <p className="text-[#2d9d41] text-lg font-bold">Bạn đã học được</p>
            <p className="text-[#ff9600] text-2xl font-black">3565 từ</p>
          </div>
        </div>

        {/* Card 2: Streak - Thêm rounded và shadow để giống mẫu */}
        <div className="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="bg-gradient-to-b from-[#ff9600] to-[#ffb347] text-center py-3">
            <p className="text-white text-lg font-bold">Bạn đã học liên tục</p>
          </div>

          <div className="flex items-center justify-center p-4 bg-white">
            <img
              src="/ThChi.png"
              alt="Nhân vật ThChi"
              className="w-16 h-16 object-contain"
            />

            <div className="flex flex-col ml-2">
              <div className="flex items-center leading-none">
                <span className="text-5xl font-bold text-gray-300">0</span>
                <img
                  src="/streak_unfire.png"
                  alt="Streak chưa cháy"
                  className="w-12 h-12"
                />
              </div>
              <p className="text-xs font-semibold text-gray-500 mt-1">
                Ngày streak!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
