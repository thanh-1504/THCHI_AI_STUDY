import { ArrowLeft, ArrowRight } from "lucide-react";

const ActionButton = () => {
  return (
    <div className="flex items-center justify-between">
      <button className="flex justify-center items-center bg-white text-black px-4 py-2 rounded-lg border border-gray-300 gap-x-1 cursor-pointer">
        <ArrowLeft size={20}></ArrowLeft>
        Từ trước
      </button>
      <button className="bg-yellow-400 text-black py-2 rounded-lg border border-gray-300 gap-x-1 px-20 cursor-pointer">
        Tiếp tục
      </button>
      <button className="flex justify-center items-center bg-white text-black px-4 py-2 rounded-lg border border-gray-300 gap-x-1 cursor-pointer">
        Từ sau
        <ArrowRight size={20}></ArrowRight>
      </button>
    </div>
  );
};
export default ActionButton;
