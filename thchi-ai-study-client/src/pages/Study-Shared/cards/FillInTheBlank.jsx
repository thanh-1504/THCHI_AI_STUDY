import { useEffect, useRef, useState } from "react";

/**
 * FillInTheBlank — "Điền từ" card
 *
 * Props (all optional for now, demo data is hard-coded as default):
 *   word        – the full answer word, e.g. "student"
 *   definition  – displayed above the input, e.g. "Học sinh, sinh viên (n)"
 *   hintIndices – array of 0-based indices that are revealed as hints
 *                 defaults to roughly 30 % of the letters spread evenly
 */
const FillInTheBlank = ({
  word = "student",
  definition = "Học sinh, sinh viên (n)",
  hintIndices,
}) => {
  // ── derive hint positions ──────────────────────────────────────────────────
  const letters = word.split(""); // ['s','t','u','d','e','n','t']

  const hints = hintIndices
    ? new Set(hintIndices)
    : new Set(
        letters
          .map((_, i) => i)
          .filter((_, rank) => {
            // reveal ~every 3rd letter but NOT the first
            return rank !== 0 && rank % 3 === 2;
          })
      );
  // For "student" (len=7): indices 2 ('u') and 5 ('n') → matches the mockup

  // ── user input state: one entry per non-hint slot ─────────────────────────
  const blankIndices = letters.map((_, i) => i).filter((i) => !hints.has(i));
  const [values, setValues] = useState(blankIndices.map(() => ""));
  const inputRefs = useRef([]);

  // map word-index → blank-slot index for fast lookup
  const wordIndexToSlot = {};
  blankIndices.forEach((wi, si) => {
    wordIndexToSlot[wi] = si;
  });

  // ── focus first blank on mount ─────────────────────────────────────────────
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // ── handlers ───────────────────────────────────────────────────────────────
  const handleChange = (slotIndex, e) => {
    const char = e.target.value.slice(-1); // keep only the last typed char
    const next = [...values];
    next[slotIndex] = char;
    setValues(next);

    // auto-advance to next blank
    if (char && slotIndex < blankIndices.length - 1) {
      inputRefs.current[slotIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (slotIndex, e) => {
    if (e.key === "Backspace" && !values[slotIndex] && slotIndex > 0) {
      // move focus back
      inputRefs.current[slotIndex - 1]?.focus();
    }
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-8 my-8 min-h-[360px] justify-center">
      {/* Label */}
      <span className="text-gray-400 text-sm tracking-wide">Điền từ</span>

      {/* Definition */}
      <p className="text-2xl font-semibold text-gray-800 text-center px-4">
        {definition}
      </p>

      {/* Letter-slot input box */}
      <div
        className="
          flex items-end gap-[6px]
          border-2 border-[#6fcf97] rounded-2xl
          px-6 py-4
          bg-white
          shadow-[0_2px_12px_rgba(0,0,0,0.06)]
          min-w-[280px]
          justify-center
        "
      >
        {letters.map((letter, wordIndex) => {
          const isHint = hints.has(wordIndex);
          const slotIndex = wordIndexToSlot[wordIndex];
          const userVal = isHint ? null : values[slotIndex];

          return (
            <div
              key={wordIndex}
              className="flex flex-col items-center gap-[2px]"
            >
              {/* Letter display or hidden input */}
              {isHint ? (
                /* Revealed hint letter */
                <span className="w-[22px] text-center text-[18px] font-medium text-gray-700 leading-none pb-[2px]">
                  {letter}
                </span>
              ) : (
                /* User-typed letter */
                <input
                  ref={(el) => (inputRefs.current[slotIndex] = el)}
                  type="text"
                  maxLength={2}
                  value={userVal}
                  onChange={(e) => handleChange(slotIndex, e)}
                  onKeyDown={(e) => handleKeyDown(slotIndex, e)}
                  className="
                    w-[22px] h-[26px]
                    text-center
                    text-[18px] font-medium text-gray-700
                    bg-transparent
                    border-none outline-none
                    p-0 leading-none
                    caret-green-500
                  "
                />
              )}

              {/* Underline — yellow for blank slots, gray for hints */}
              <div
                className={`
                  h-[2.5px] w-[20px] rounded-full
                  ${isHint ? "bg-gray-300" : "bg-[#F2C94C]"}
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FillInTheBlank;
