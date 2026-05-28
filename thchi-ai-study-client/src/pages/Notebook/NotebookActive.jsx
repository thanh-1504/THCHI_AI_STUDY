import { CircleX, Star } from "lucide-react";
import useNotebookStore from "../../store/useNotebookStore";
import WordNotebook from "./component/WordNotebook";

const NotebookActive = () => {
  const {
    inputValue,
    setInputValue,
    hasSearch,
    setHasSearch,
    isActiveLevel,
    setIsActiveLevel,
    isCheckedWord,
  } = useNotebookStore();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className=" fixed left-2/4 -translate-x-2/4 z-40 bg-white py-5">
        <div className="flex items-center text-center justify-center">
          <div
            onClick={() => setIsActiveLevel(1)}
            className="min-w-32 cursor-pointer"
          >
            <p>Cấp độ 1</p>
            <div className="flex items-center justify-center gap-x-px mt-px mb-1">
              <Star size={10} fill="#ffcb08" />
              <Star size={10} />
              <Star size={10} />
              <Star size={10} />
              <Star size={10} />
            </div>
            <div
              className={` bg-red-500 rounded-xl focus:h-3.5 ${isActiveLevel === 1 ? "h-3.5" : "h-[6px] transition-all"}`}
            ></div>
          </div>
          <div
            onClick={() => setIsActiveLevel(2)}
            className="min-w-32 cursor-pointer"
          >
            <p>Cấp độ 2</p>

            <div className="flex items-center justify-center gap-x-px mt-px mb-1">
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} />
              <Star size={10} />
              <Star size={10} />
            </div>
            <div
              className={` bg-yellow-400 ${isActiveLevel === 2 ? "h-3.5 rounded-xl" : "h-[6px] transition-all"}`}
            ></div>
          </div>
          <div
            onClick={() => setIsActiveLevel(3)}
            className="min-w-32 cursor-pointer"
          >
            <p>Cấp độ 3</p>
            <div className="flex items-center justify-center gap-x-px mt-px mb-1">
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} />
              <Star size={10} />
            </div>
            <div
              className={` bg-cyan-300 ${isActiveLevel === 3 ? "h-3.5 rounded-xl" : "h-[6px] transition-all"}`}
            ></div>
          </div>
          <div
            onClick={() => setIsActiveLevel(4)}
            className="min-w-32 cursor-pointer"
          >
            <p>Cấp độ 4</p>
            <div className="flex items-center justify-center gap-x-px mt-px mb-1">
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} />
            </div>
            <div
              className={` bg-blue-500 ${isActiveLevel === 4 ? "h-3.5 rounded-xl" : "h-[6px] transition-all"}`}
            ></div>
          </div>
          <div
            onClick={() => setIsActiveLevel(5)}
            className="min-w-32 cursor-pointer"
          >
            <p>Cấp độ 5</p>
            <div className="flex items-center justify-center gap-x-px mt-px mb-1">
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
              <Star size={10} fill="#ffcb08" />
            </div>
            <div
              className={` bg-[#213782] ${isActiveLevel === 5 ? "h-3.5 rounded-xl" : "h-[6px] transition-all"}`}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="mt-10 px-20 flex items-center justify-center gap-3">
            <div className="relative flex items-center bg-gray-input-search rounded-full h-12 w-full max-w-[600px]">
              <input
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value === "") setHasSearch(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue.trim())
                    setHasSearch(true);
                }}
                className="flex-1 h-full bg-transparent rounded-full pl-6 pr-2 outline-none font-semibold placeholder:text-sm placeholder:font-semibold"
                type="text"
                placeholder="Gõ vào đây từ bạn muốn tìm"
                value={inputValue}
              />
              <CircleX
                onClick={() => {
                  setHasSearch(false);
                  setInputValue("");
                }}
                size={20}
                className="text-gray-400 cursor-pointer mr-3 shrink-0 hover:text-gray-600 transition-colors"
              />
              <div className="h-full min-w-[112px]">
                <button
                  onClick={() => {
                    if (inputValue) setHasSearch(true);
                  }}
                  className="bg-text-green w-full relative cursor-pointer text-white font-semibold px-8 h-full rounded-full shrink-0"
                >
                  {!hasSearch && "Search"}
                  {inputValue && hasSearch && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-2 justify-center items-center ">
                      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <button
              className={`bg-gray-100  text-gray-400 font-semibold px-8 h-12 rounded-full shrink-0 ${isCheckedWord ? "bg-text-green text-white cursor-pointer" : " text-white font-semibold"}`}
            >
              Save
            </button>
          </div>
          {hasSearch && (
            <div className="mt-10 flex flex-col items-center text-center">
              <div>
                <img
                  className="w-60 h-60 object-cover"
                  src="/ThChi.png"
                  alt="ThChi"
                />
              </div>
              <div className="font-semibold text-xl">
                <p>
                  Thchi không tìm được từ này trong danh sách từ đã ôn của bạn.
                </p>
                <p>Bạn thử tìm từ khác nha.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-10 py-45  flex flex-col gap-y-8">
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
        <WordNotebook></WordNotebook>
      </div>
    </div>
  );
};
export default NotebookActive;
