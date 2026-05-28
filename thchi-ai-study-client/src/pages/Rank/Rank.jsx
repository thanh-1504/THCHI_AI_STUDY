import { Award, Crown, Trophy } from "lucide-react";
const Rank = () => {
  return (
    <div className="relative min-h-screen">
      {/* <RecommendationUI
        textButton="Đăng nhập ngay"
        path="/login"
        text={`Bạn chưa đăng nhập. \n Đăng nhập để xem bảng xếp hạng`}
        imgUrl="ThChi_Login.png"
      ></RecommendationUI> */}
      <div className="p-6">
        {/* Ranking Header */}
        {/* <div className="text-center">
          <p className="font-semibold text-3xl">Hạng Đồng</p>
          <span className="text-sm text-gray-400 font-medium">
            3 ngày còn lại
          </span>
          <div className="shadow-[0_8px_24px_rgba(150,158,166,0.2)] w-1/2 mx-auto mt-5 rounded-xl">
            <div className="">
              <img
                src="bronze.png"
                alt="Hạng Đồng"
                className="w-40 h-40 object-contain mx-auto"
              />
            </div>
          </div>
        </div> */}
        {/* Ranking Content */}
        <div>
          {/* Ranking Info */}
          <div className="flex items-center gap-2">
            <div className="max-w-15 max-h-15">
              <img
                src="bronze.png"
                alt="Hạng Đồng"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="uppercase font-bold text-xl">HẠNG ĐỒNG</p>
              <span className="text-xs text-gray-500 font-medium">
                Còn 3 ngày
              </span>
            </div>
          </div>
          {/* Ranking Top 3 */}
          <div className="relative">
            <img
              src="award.png"
              alt="background giải thưởng"
              className="min-h-60 max-h-60"
            />
            <div className="absolute top-15 left-1/2 translate-x-[-74%]">
              <div className="flex flex-col">
                <div className="relative w-fit mx-auto">
                  <Crown
                    size={40}
                    fill="#FDC711"
                    className="absolute -top-9 left-1/2 -translate-x-1/2 text-yellow-400"
                  />
                  <img
                    src="useravatar.png"
                    alt=""
                    className="w-15 h-15 rounded-full border-4 border-yellow-400"
                  />
                  <Award
                    size={40}
                    fill="#FDC711"
                    className="absolute -right-4 -bottom-4 text-yellow-400  "
                  />
                </div>
                <div className="mt-3 font-semibold">
                  <p>Nhat Thanh</p>
                  <p className="flex items-center gap-x-1 mt-1 text-sm justify-center">
                    <Trophy size={20} />
                    <span>3565 từ</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-[78px] left-[24%] translate-x-[-74%]">
              <div className="flex flex-col">
                <div className="relative w-fit mx-auto">
                  <img
                    src="useravatar.png"
                    alt=""
                    className="w-15 h-15 rounded-full border-4 border-gray-300"
                  />
                  <Award
                    size={40}
                    fill="#C0C0C0"
                    className="absolute -right-4 -bottom-4 text-[#c0c0c0]"
                  />
                </div>
                <div className="mt-3 font-semibold">
                  <p>Nhat Thanh</p>
                  <p className="flex items-center gap-x-1 mt-1 text-sm justify-center">
                    <Trophy
                      fill="#FDC711"
                      size={20}
                      className="text-yellow-300"
                    />
                    <span className="text-red-600">3565 từ</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-[78px] right-37">
              <div className="flex flex-col">
                <div className="relative w-fit mx-auto">
                  <img
                    src="useravatar.png"
                    alt=""
                    className="w-15 h-15 rounded-full border-4 border-amber-600"
                  />
                  <Award
                    size={40}
                    fill="#d97706"
                    className="absolute -right-4 -bottom-4 text-[#d97706]"
                  />
                </div>
                <div className="mt-3 font-semibold">
                  <p>Nhat Thanh</p>
                  <p className="flex items-center gap-x-1 mt-1 text-sm justify-center">
                    <Trophy
                      fill="#FDC711"
                      size={20}
                      className="text-yellow-300"
                    />
                    <span className="text-red-600">3565 từ</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Ranking Table */}
          <div className="mt-6 bg-white rounded-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="grid grid-cols-4 py-4 bg-[#fafafa] border-b text-gray-400 font-semibold text-sm text-center">
              <p>Hạng</p>
              <p>Người dùng</p>
              <p>Số từ học được</p>
              <p>Chuỗi ngày</p>
            </div>

            {/* Row */}
            <div className="grid grid-cols-4 items-center py-5 border-b   transition-all border-b-gray-400 cursor-pointer hover:bg-yellow-100">
              {/* Rank */}
              <div className="flex justify-center">
                <Award size={28} fill="#FDC711" className="text-yellow-400 " />
              </div>

              {/* User */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src="useravatar.png"
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex items-center gap-2">
                  <p className="font-semibold">Nhat Thanh</p>
                </div>
              </div>

              {/* Score */}
              <div className="font-bold text-orange-500 mx-auto">3565 từ</div>

              {/* Streak */}
              <div className="mx-auto gap-1 text-orange-500 font-bold justify-center">
                🔥 12
              </div>
            </div>

            {/* Row */}
            <div className="grid grid-cols-4 items-center py-5 border-b hover:bg-gray-50 transition-all border-b-gray-400">
              {/* Rank */}
              <div className="flex justify-center">
                <Award size={28} fill="#FDC711" className="text-yellow-400 " />
              </div>

              {/* User */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src="useravatar.png"
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex items-center gap-2">
                  <p className="font-semibold">Nhat Thanh</p>
                </div>
              </div>

              {/* Score */}
              <div className="font-bold text-orange-500 mx-auto">3565 từ</div>

              {/* Streak */}
              <div className="mx-auto gap-1 text-orange-500 font-bold justify-center">
                🔥 12
              </div>
            </div>

            <div className="grid grid-cols-4 items-center py-5 border-b hover:bg-gray-50 transition-all border-b-gray-400">
              {/* Rank */}
              <div className="flex justify-center">
                <Award size={28} fill="#FDC711" className="text-yellow-400 " />
              </div>

              {/* User */}
              <div className="flex items-center justify-center gap-3">
                <img
                  src="useravatar.png"
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex items-center gap-2">
                  <p className="font-semibold">Nhat Thanh</p>
                </div>
              </div>

              {/* Score */}
              <div className="font-bold text-orange-500 mx-auto">3565 từ</div>

              {/* Streak */}
              <div className="mx-auto gap-1 text-orange-500 font-bold justify-center">
                🔥 12
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative translate-y-53">
          <RecommendationUI
            textButton="Ôn tập ngay"
            path="/review"
            text={`Đừng ngủ quên! Hãy học và bắt đầu cuộc đua của tuần này nào`}
            imgUrl="ThChi_Sleep.png"
            showMoreButton
          ></RecommendationUI>
        </div> */}
      </div>
    </div>
  );
};

export default Rank;
