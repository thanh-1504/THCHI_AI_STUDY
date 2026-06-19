import { X } from "lucide-react";

/**
 * StudyHeader — top bar shown during a study/review session.
 *
 * Props:
 *  - progress    : number  0–1   — progress bar fill
 *  - onClose     : fn()          — close/exit session
 *  - logoEmoji   : string        — default 🍊
 *  - showProgress: boolean       — default true
 */
const StudyHeader = ({
  progress = 0,
  onClose,
  logoEmoji = "🍊",
  showProgress = true,
}) => {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      {/* Close button */}
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex-shrink-0"
        aria-label="Đóng"
      >
        <X size={22} strokeWidth={2.5} />
      </button>

      {/* Progress bar */}
      {showProgress && (
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>
      )}

      {/* Logo / branding */}
      <span className="text-2xl select-none flex-shrink-0">{logoEmoji}</span>
    </div>
  );
};

export default StudyHeader;
