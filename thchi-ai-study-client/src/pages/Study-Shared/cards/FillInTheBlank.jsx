import { useEffect, useRef, useState } from "react";

const FillInTheBlank = ({ word, onNext }) => {
  const definition = word?.definitions?.[0]
    ? `${word.definitions[0].meaning} (${word.definitions[0].wordType.toLowerCase()})`
    : "";

  const letters = word?.term?.split("") ?? [];

  // ✅ Bỏ hintIndices prop — tự tính luôn
  const hints = new Set(
    letters.map((_, i) => i).filter((_, rank) => rank !== 0 && rank % 3 === 2),
  );

  const blankIndices = letters.map((_, i) => i).filter((i) => !hints.has(i));
  const [values, setValues] = useState(blankIndices.map(() => ""));
  const inputRefs = useRef([]);

  // ✅ Reset state khi word thay đổi
  useEffect(() => {
    setValues(blankIndices.map(() => ""));
    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  }, [word?.term]);

  const wordIndexToSlot = {};
  blankIndices.forEach((wi, si) => {
    wordIndexToSlot[wi] = si;
  });

  const handleChange = (slotIndex, e) => {
    const char = e.target.value.slice(-1);
    const next = [...values];
    next[slotIndex] = char;
    setValues(next);
    if (char && slotIndex < blankIndices.length - 1) {
      inputRefs.current[slotIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (slotIndex, e) => {
    if (e.key === "Backspace" && !values[slotIndex] && slotIndex > 0) {
      inputRefs.current[slotIndex - 1]?.focus();
    }
  };

  // ✅ Kiểm tra đáp án
  const handleCheck = () => {
    const answer = letters
      .map((letter, i) =>
        hints.has(i) ? letter : values[wordIndexToSlot[i]] || "",
      )
      .join("");

    if (answer.toLowerCase() === word.term.toLowerCase()) {
      onNext(); // đúng → next step
    } else {
      // sai → có thể shake animation hoặc highlight đỏ
      alert("Sai rồi, thử lại!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 my-8 min-h-[360px] justify-center">
      <span className="text-gray-400 text-sm tracking-wide">Điền từ</span>

      <p className="text-2xl font-semibold text-gray-800 text-center px-4">
        {definition}
      </p>

      <div className="flex items-end gap-[6px] border-2 border-[#6fcf97] rounded-2xl px-6 py-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] min-w-[280px] justify-center">
        {letters.map((letter, wordIndex) => {
          const isHint = hints.has(wordIndex);
          const slotIndex = wordIndexToSlot[wordIndex];
          const userVal = isHint ? null : values[slotIndex];

          return (
            <div
              key={wordIndex}
              className="flex flex-col items-center gap-[2px]"
            >
              {isHint ? (
                <span className="w-[22px] text-center text-[18px] font-medium text-gray-700 leading-none pb-[2px]">
                  {letter}
                </span>
              ) : (
                <input
                  ref={(el) => (inputRefs.current[slotIndex] = el)}
                  type="text"
                  maxLength={2}
                  value={userVal}
                  onChange={(e) => handleChange(slotIndex, e)}
                  onKeyDown={(e) => handleKeyDown(slotIndex, e)}
                  className="w-[22px] h-[26px] text-center text-[18px] font-medium text-gray-700 bg-transparent border-none outline-none p-0 leading-none caret-green-500"
                />
              )}
              <div
                className={`h-[2.5px] w-[20px] rounded-full ${isHint ? "bg-gray-300" : "bg-[#F2C94C]"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FillInTheBlank;
