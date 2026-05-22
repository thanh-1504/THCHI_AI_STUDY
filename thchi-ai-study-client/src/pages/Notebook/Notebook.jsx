import { CircleX } from "lucide-react"
import StatsCard from "../../components/StatsCard"

const Notebook = () => {
    return (
        <div className="relative min-h-screen">
            <div className="mt-4">
                <h2 className="text-center font-semibold text-2xl">SỔ TAY THCHI CỦA BẠN</h2>
                <div className="mt-10 px-20 flex items-center justify-center gap-3">
                    <div className="relative flex items-center bg-gray-input-search rounded-full h-12 w-full max-w-[600px]">
                        <input
                            className="flex-1 h-full bg-transparent rounded-full pl-6 pr-2 outline-none font-semibold placeholder:text-sm placeholder:font-semibold"
                            type="text"
                            placeholder="Gõ vào đây từ bạn muốn tìm"
                        />
                        <CircleX
                            size={20}
                            className="text-gray-400 cursor-pointer mr-3 shrink-0 hover:text-gray-600 transition-colors"
                        />
                        <button className="bg-text-green cursor-pointer text-white font-semibold px-8 h-full rounded-full shrink-0">
                            Search
                        </button>
                    </div>
                    <button className="bg-gray-100 cursor-pointer text-gray-400 font-semibold px-8 h-12 rounded-full shrink-0">
                        Save
                    </button>

                </div>
                <div className="mt-10 flex flex-col items-center text-center">
                    <div>
                        <img className="w-60 h-60 object-cover" src="/ThChi.png" alt="ThChi" />
                    </div>
                    <div className="font-semibold text-xl">
                        <p >Thchi không tìm được từ này trong danh sách từ đã ôn của bạn.</p>
                        <p>Bạn thử tìm từ khác nha.</p>
                    </div>

                </div>
            </div>
            {/* <div className="mt-15 px-10 flex items-center justify-evenly">
                <StatsCard
                    variant="yellow"
                    label="từ ngủ đông"
                />
                <StatsCard
                    variant="blue"
                    label="từ đã học"
                />
            </div> */}
        </div>
    )
}
export default Notebook