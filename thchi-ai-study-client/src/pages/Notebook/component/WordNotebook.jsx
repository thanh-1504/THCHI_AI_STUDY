import { Check } from "lucide-react";
import useNotebookStore from "../../../store/useNotebookStore";

const WordNotebook = () => {
    const { isCheckedWord, setIsCheckedWord } = useNotebookStore();
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-6">
                <button
                    onClick={setIsCheckedWord}
                    className={`
                        w-7 h-7 rounded-full border-2
                        flex items-center justify-center
                        transition-all duration-200
                        ${isCheckedWord
                            ? "border-green-600"
                            : "border-gray-300"}
                    `}
                >
                    {isCheckedWord && (
                        <Check
                            size={14}
                            strokeWidth={4}
                            className="text-text-green"
                        />
                    )}
                </button>

                <div>
                    <p className="text-xl font-semibold">convict</p>
                    <p className="text-text-green">/kənˈvɪkt/</p>
                </div>
            </div>

            <div className="font-semibold">(n)</div>

            <div className="max-w-50">
                Một người được chứng minh là có tội trước tòa án
            </div>
        </div>
    );
};

export default WordNotebook;