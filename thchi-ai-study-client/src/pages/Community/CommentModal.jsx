import { ImageIcon, MessageCircle, Send, ThumbsUp, X } from "lucide-react";
import { useEffect, useRef } from "react";
import useCommunityStore from "../../store/useCommunityStore";
import useUIStore from "../../store/useUIStore";

const CommentModal = () => {
  const imageInputRef = useRef(null);
  const { commentImage, setCommentImage } = useCommunityStore();
  const { isOpenModalComment, setIsOpenModalComment } = useUIStore();
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCommentImage(url);
    // Reset input để cho phép chọn lại cùng file
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    if (commentImage) URL.revokeObjectURL(commentImage);
    setCommentImage(null);
  };

  // Remove scrollbar when modal comment open
  useEffect(() => {
    if (isOpenModalComment) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenModalComment]);
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm transition-opacity">
      {/* Khung Modal chính (max-w-6xl để đủ độ rộng chia 2 cột) */}
      <div className="bg-white w-full max-w-5xl h-[90vh] sm:h-[85vh] rounded-[24px] flex overflow-hidden shadow-2xl relative">
        <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
          <div className="flex-1 overflow-y-auto p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pr-4">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://ui-avatars.com/api/?name=Mochi+Mochi&background=10b981&color=fff"
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  MochiMochi
                </h3>
                <p className="text-sm text-gray-500 font-medium">02 tháng 06</p>
              </div>
            </div>
            <div className="text-[16px] leading-8 text-gray-800 space-y-4">
              <p className="font-bold">
                🎉 BIRTHDAY FLASH DEAL: ƯU ĐÃI MOCHIVOCAB KHỦNG NHẤT NĂM ĐÃ ĐẾN
                🎉
              </p>
              <p>
                Nhân dịp sinh nhật Mochi, tụi mình tung chương trình siêu hời
                dành cho các bạn đang muốn học tiếng Anh bài bản cùng MochiMochi
              </p>
              <div>
                <p>
                  📚 Mua gói 1 năm → <strong>TẶNG thêm 6 THÁNG</strong> sử dụng
                </p>
                <p>
                  📚 Mua gói 3 năm → <strong>TẶNG thêm 2 NĂM</strong> sử dụng
                </p>
              </div>
              <p>
                ✨ Đây là cơ hội hiếm để sở hữu MochiVocab Premium với thời gian
                sử dụng dài hơn mà không cần chi thêm.
              </p>
              <p>⏰ Ưu đãi áp dụng đến hết ngày 14/06/2026</p>
              <p>
                Nhanh tay nhận quà sinh nhật từ Mochi trước khi chương trình kết
                thúc nhé!
              </p>
            </div>
            <div className="mt-6">
              <img
                src="https://learn.mochidemy.com/_next/image?url=https%3A%2F%2Fmochien-server.mochidemy.com%2Fcommunity%2Fposts%2F1780374245-rbA4B0ZKuw.jpg&w=1080&q=75"
                alt="Sale Mochi"
                className="w-full rounded-2xl object-cover border border-gray-100"
              />
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-gray-700 font-semibold hover:text-blue-600 transition-colors cursor-pointer">
                <ThumbsUp size={22} />
                <span>59</span>
              </button>
              <button className="flex items-center gap-2 text-gray-700 font-semibold hover:text-orange-400 transition-colors pointer-events-none">
                <MessageCircle size={22} />
                <span>21</span>
              </button>
            </div>
          </div>
        </div>
        {/* COMMENT */}
        <div className="w-[360px] lg:w-[400px] flex flex-col bg-white shrink-0">
          {/* Header Comment */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-[18px] text-gray-900">Bình luận</h3>
            <button
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition-all cursor-pointer"
              onClick={() => setIsOpenModalComment(false)}
            >
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>
          {/* List Comment */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pr-3">
            {/* Item Comment */}
            <div className="flex gap-3">
              <img
                src="https://ui-avatars.com/api/?name=M&background=fbcfe8"
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover mt-1"
              />
              <div className="flex-1">
                <div className="bg-[#f2f3f5] rounded-2xl rounded-tl-none px-4 py-2.5">
                  <p className="font-bold text-[13px] text-gray-900 mb-0.5">
                    Mochi-er 1780905252
                  </p>
                  <p className="text-[14px] text-gray-800">
                    Mochi cho app học free đc kh 😭
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium ml-2">
                  2 giờ trước
                </p>
              </div>
            </div>

            {/* Item Comment 2 */}
            <div className="flex gap-3">
              <img
                src="https://ui-avatars.com/api/?name=T+L&background=bfdbfe"
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover mt-1"
              />
              <div className="flex-1">
                <div className="bg-[#f2f3f5] rounded-2xl rounded-tl-none px-4 py-2.5">
                  <p className="font-bold text-[13px] text-gray-900 mb-0.5">
                    Trần Đại Lâm
                  </p>
                  <p className="text-[14px] text-gray-800">Uwf</p>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium ml-2">
                  3 giờ trước
                </p>
              </div>
            </div>

            {/* Item Comment 3 */}
            <div className="flex gap-3">
              <img
                src="https://ui-avatars.com/api/?name=M&background=fecaca"
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover mt-1"
              />
              <div className="flex-1">
                <div className="bg-[#f2f3f5] rounded-2xl rounded-tl-none px-4 py-2.5">
                  <p className="font-bold text-[13px] text-gray-900 mb-0.5">
                    Mochi-er 1780905252
                  </p>
                  <p className="text-[14px] text-gray-800 leading-snug">
                    minh nghĩ app cho học free thi sẽ nhiều người học lắm =)
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium ml-2">
                  4 giờ trước
                </p>
              </div>
            </div>
          </div>

          {/* Box For User Enter Comment */}
          <div className="px-5 py-4 border-t border-gray-100 bg-white">
            {/* Image preview */}
            {commentImage && (
              <div className="mb-3 relative inline-block">
                <img
                  src={commentImage}
                  alt="preview"
                  className="rounded-2xl w-full max-h-48 object-cover border border-gray-200"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-gray-800/70 hover:bg-gray-900/80 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=Thanh+Nhật"
                alt="my-avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 border border-gray-200">
                <input
                  type="text"
                  placeholder="Viết một bình luận..."
                  className="bg-transparent flex-1 outline-none text-[14px] text-gray-700 placeholder:text-gray-500"
                />
                <div className="flex items-center gap-2 pl-2">
                  {/* Hidden file input */}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                    title="Đính kèm ảnh"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentModal;
