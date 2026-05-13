import { CircleX } from "lucide-react";

const HeaderModal = ({ setIsOpen }) => {
  console.log(setIsOpen);
  return (
    <div>
      <div className="relative bg-yellow-400 h-18 flex items-center rounded-b-2xl">
        {/* Close button */}
        <button className="absolute left-5 z-50">
          <CircleX
            size={40}
            onClick={() => setIsOpen(false)}
            className="text-white hover:cursor-pointer drop-shadow-[0_4px_3px_rgba(0,0,0,0.20)] "
          />
        </button>
        <p className="text-2xl font-semibold text-neutral-800 uppercase flex justify-center flex-1">
          Danh sách khóa học
        </p>
      </div>
      <p className="text-center text-2xl mt-5 text-neutral-700 font-medium">
        Lộ trình gợi ý cho bạn
      </p>
    </div>
  );
};
export default HeaderModal;
