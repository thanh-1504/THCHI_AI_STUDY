import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Post from "./components/Post";

const CommunityMyPost = () => {
  return (
    <div className="relative min-h-screen">
      {/* NO POST */}
      <Link
        to={"/community"}
        className="
        absolute top-10
        p-3
        rounded-full
        bg-white
        text-gray-400
        cursor-pointer
        shadow-[0_3px_0_#ccc]
        active:translate-y-[3px]
        active:shadow-none
        transition-all
        duration-150
      "
      >
        <X />
      </Link>
      {/* <div className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center">
          <FileText size={65} className="text-gray-300 mb-2" />
        </div>
        <span className="text-center text-xl font-medium">
          Chưa có bài viết nào
        </span>
      </div> */}
      {/* HAVE POST */}
      <div className="pt-30">
        <Post hasStatus={true} hasTrash={true}></Post>
      </div>
    </div>
  );
};
export default CommunityMyPost;
