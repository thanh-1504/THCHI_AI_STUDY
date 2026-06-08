import { CircleX } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import useNotebookStore from "../../store/useNotebookStore";

const Notebook = () => {
  const { inputValue, setInputValue, hasSearch, setHasSearch } =
    useNotebookStore();
  return (
    <div className="relative min-h-screen pt-6">
      {/* <RecommendationUI></RecommendationUI> */}
      {
        <div className="mt-4">
          <h2 className="text-center font-semibold text-2xl">
            SỔ TAY THCHI CỦA BẠN
          </h2>
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
            <button className="bg-gray-100 cursor-pointer text-gray-400 font-semibold px-8 h-12 rounded-full shrink-0">
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
      }
      <div className="mt-15 px-10 flex items-center justify-evenly">
        <StatsCard variant="yellow" label="từ ngủ đông" path="word-sleep" />
        <StatsCard variant="blue" label="từ đã học" path="word-active" />
      </div>
    </div>
  );
};
export default Notebook;
