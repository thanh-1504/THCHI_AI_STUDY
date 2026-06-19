import { Volume2 } from "lucide-react";

const ListendAndType = () => {
  return (
    <div className="flex flex-col gap-8 my-8 items-center justify-center min-h-[360px]">
      <span>Nghe và viết lại</span>
      {/* Audio Button */}
      <div className="">
        <button
          className="
            w-14 h-14
            rounded-full
            bg-white
            flex items-center justify-center
            border border-gray-100
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
            active:translate-y-[3px]
            active:shadow-none
            transition-all
            duration-150
            cursor-pointer
          "
        >
          <Volume2 size={28} className="text-yellow-400" strokeWidth={2.5} />
        </button>
      </div>
      {/* Input */}
      <div className="w-full">
        <input
          type="text"
          name=""
          id=""
          placeholder="Gõ lại từ bạn nghe được"
          className="
        border-2 border-gray-100 rounded-lg p-4 bg-white outline-none
        focus:border-2
        focus:border-green-600
        transition-all
        duration-150
        w-full
        "
        />
      </div>
    </div>
  );
};
export default ListendAndType;
