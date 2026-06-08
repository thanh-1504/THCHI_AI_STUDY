import { Bell, Clock3, SquarePen } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import useCommunityStore from "../../store/useCommunityStore";
import useUIStore from "../../store/useUIStore";
import AddPostModal from "./AddPostModal";
import CommentModal from "./CommentModal";
import Post from "./components/Post";

const Community = () => {
  const { isOpenModalComment } = useUIStore();
  const { isAddPost, setIsAddPost } = useCommunityStore();
  return (
    <div className="pt-6 min-h-screen">
      {/* THCHI HUB HEADER */}
      <div className="flex items-center justify-between gap-4 fixed top-18 z-40 py-5 w-full md:w-[60%] left-1/2 -translate-x-1/2 px-6 pb-4 bg-white border-b border-b-gray-200">
        <button
          onClick={() => setIsAddPost(true)}
          className="bg-blue-600 p-3 rounded-xl text-white cursor-pointer hover:opacity-80 transition-all"
        >
          <SquarePen size={20} />
        </button>
        <span className="font-semibold text-2xl text-gray-800">ThchiHub</span>
        <div className="p-3 bg-white shadow-sm cursor-pointer rounded-xl text-gray-600 hover:bg-gray-50">
          <Bell size={20} />
        </div>
      </div>

      <div className="py-20">
        {/* THCHI HUB MY POST */}
        <div className="bg-white px-5 border border-gray-100 rounded-2xl p-5 shadow-[0_8px_24px_hsla(210,8%,62%,.2)]">
          {/* THCHI HUB MY POST HEADER*/}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">
              Bài viết của tôi
            </span>
            <Link
              to={"my-post"}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
          {/* THCHI HUB LIST POST */}
          <Link
            to={"my-post"}
            className="flex items-center mt-4 gap-x-4 border border-gray-100 rounded-2xl p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-500">
              <Clock3 size={28} />
            </div>
            <div>
              <p className="font-bold text-gray-800">Đang chờ xem xét (0)</p>
              <span className="text-gray-500 text-sm font-medium">
                • 0 bài viết
              </span>
            </div>
          </Link>
        </div>

        {/* THCHI HUB POST */}
        <div className="mt-6">
          <Post></Post>
        </div>
        <Outlet></Outlet>
      </div>

      {/* MODAL CHI TIẾT BÀI VIẾT / BÌNH LUẬN */}
      {isOpenModalComment && <CommentModal />}
      {/* MODAL Add Post */}
      {isAddPost && <AddPostModal />}
    </div>
  );
};

export default Community;
