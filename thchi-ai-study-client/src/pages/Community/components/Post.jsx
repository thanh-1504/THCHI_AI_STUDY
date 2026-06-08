import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import useUIStore from "../../../store/useUIStore";
const Post = ({ hasTrash = false, hasStatus = false }) => {
  const setIsOpenModalComment = useUIStore(
    (state) => state.setIsOpenModalComment,
  );
  const handleRemovePost = () => {
    // ... (nơi bạn gọi hàm xóa)
    Swal.fire({
      title: "Xác nhận xoá",
      text: "Bạn có chắc chắn muốn xoá không?",
      showCancelButton: true,
      confirmButtonText: "Xoá bài viết",
      cancelButtonText: "Huỷ bỏ",
      showCloseButton: true,
      buttonsStyling: false, // Bắt buộc để dùng Tailwind thay thế
      customClass: {
        popup: "!rounded-3xl !p-6 !w-[400px]",
        title: "!text-xl !font-bold !mb-2",
        // Nội dung text
        htmlContainer: "!text-base !text-gray-600 !m-0 !mb-6",
        actions: "!flex !flex-col !items-center !w-full !gap-3 !mt-0",
        confirmButton:
          "w-2/4 py-3 bg-(image:--my-gradient) rounded-2xl text-white hover:opacity-80 shadow-[0_3px_0_#1f8f2f] active:translate-y-[3px] cursor-pointer transition-all active:shadow-none duration-150",
        cancelButton:
          "w-2/4 py-3 bg-white  font-bold rounded-2xl shadow-[0_3px_0_#eee] border border-gray-200 hover:bg-gray-50 active:translate-y-[3px] cursor-pointer transition-all active:shadow-none duration-150",
        closeButton:
          "!absolute !top-0 active:!top-[3px] !right-0 !translate-x-1/3 !-translate-y-1/3 !w-10 !h-10 !bg-yellow-400 !text-white !rounded-full !flex !items-center !justify-center !text-3xl !font-bold !shadow-[0_3px_0_#c49000] hover:!bg-[#e0a600] active:!shadow-none !transition-all !duration-150 !cursor-pointer focus:!outline-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Xử lý logic xóa bài viết
      }
    });
  };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {/* HEADER */}
      <div className="p-5 relative">
        {hasTrash && (
          <button
            onClick={() => {
              handleRemovePost();
            }}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        )}
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div>
              <p className="font-semibold text-lg">MochiMochi</p>
              <span className="text-sm text-[#b0b3b8]">08 tháng 06</span>
              {hasStatus && (
                <span className="ml-10 px-3 py-1 rounded-lg bg-amber-200 text-orange-400 text-sm">
                  Chờ duyệt
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-5">
          <p className="text-[17px] leading-8 text-gray-800 line-clamp-4">
            🎉 BIRTHDAY FLASH DEAL: ƯU ĐÃI MOCHIVOCAB KHỦNG NHẤT NĂM ĐÃ ĐẾN 🎉
            Nhân dịp sinh nhật Mochi, tụi mình tung chương trình siêu hời dành
            cho các bạn đang muốn học tiếng Anh bài bản cùng MochiMochi 📚 Mua
            gói 1 năm → TẶNG thêm 6 THÁNG sử dụng 📚 Mua gói 3 năm → TẶNG thêm 2
            NĂM sử dụng ✨ Đây là cơ hội hiếm để sở hữu MochiVocab Premium với
            thời gian sử dụng dài hơn mà không cần chi thêm.
          </p>

          <button className="mt-2 font-semibold text-lg hover:underline cursor-pointer">
            Xem thêm
          </button>

          <img
            src="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien-server.mochidemy.com%2Fcommunity%2Fposts%2F1780374245-rbA4B0ZKuw.jpg&w=1080&q=75"
            alt=""
            className="mt-5 rounded-2xl w-full object-cover"
          />
        </div>
      </div>

      {/* REACTION BAR */}
      <div className="border-t border-gray-200 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
            <ThumbsUp size={22} />
            <span className="font-medium">59</span>
          </button>

          <button
            className="flex items-center gap-2 text-gray-700 hover:text-orange-400 transition-colors cursor-pointer"
            onClick={() => setIsOpenModalComment(true)}
          >
            <MessageCircle size={22} />
            <span className="font-medium">19</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
