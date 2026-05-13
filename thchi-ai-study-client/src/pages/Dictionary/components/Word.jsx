import { CirclePlus, Volume2 } from "lucide-react";
const Word = () => {
  return (
    <div className="mt-5">
      <div>
        <h1 className="text-blue-800 font-semibold text-3xl">People</h1>
        <div className="flex items-center mt-5 justify-between max-w-60">
          <span className="text-blue-400 font-semibold">Bre</span>
          <button className="w-13 h-13 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:cursor-pointer">
            <Volume2 className="text-blue-500" size={20} strokeWidth={2.5} />
          </button>
          <span>/abcdf/</span>
        </div>
        <div className="flex items-center mt-5 justify-between max-w-60">
          <span className="text-red-400 font-semibold">Bre</span>
          <button className="w-13 h-13 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:cursor-pointer">
            <Volume2 className="text-red-400" size={20} strokeWidth={2.5} />
          </button>
          <span>/abcdf/</span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-start">
          <span>1.</span>
          <h2 className="mx-5">
            Người (những sinh vật thuộc loài người; nam nữ và trẻ em)
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-(image:--my-gradient) text-white font-semibold
              shadow-[0_6px_0_#1f8f2f]
              hover:brightness-105
              active:shadow-[0_2px_0_#1f8f2f]
              transition-all
              duration-100
              cursor-pointer
              select-none
             "
          >
            <CirclePlus size={20} className="text-white" />
            <span>Lưu từ</span>
          </button>
        </div>
      </div>
      <div className="mt-5 ml-15">
        <ul className="list-disc ">
          <li>
            <p className="text-base font-medium text-gray-900">
              People in the form of men, women, and children gathered at the
              park for a picnic.
            </p>
            <p className="text-gray-500 mt-1">
              Những người trong hình dạng của nam, nữ và trẻ em tụ tập tại công
              viên để đi dã ngoại.
            </p>
          </li>
        </ul>
      </div>
      <hr className="mt-5 h-[2px] border-gray-400" />
    </div>
  );
};
export default Word;
