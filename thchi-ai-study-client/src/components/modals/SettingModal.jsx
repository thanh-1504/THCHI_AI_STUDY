import { MessageCircle, Moon, Volume2, X } from "lucide-react";
import { createPortal } from "react-dom";
import useSettingStore from "../../store/useSettingStore";
import Toggle from "../Toggle";
import ModalUserCard from "./shared/ModalUserCard";

const MOCK_USER = {
  name: "thanh",
  email: "thanhthanh15042k4@gmail.com",
  joinedAt: "03/06/2026",
  accountType: "Free Account",
};

/* ────────────────────────────────────────────
   Volume Slider
──────────────────────────────────────────── */
const VolumeSlider = ({ value, onChange }) => (
  <input
    type="range"
    min={0}
    max={100}
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-32 h-1.5 rounded-full appearance-none cursor-pointer accent-blue-500"
    style={{
      background: `linear-gradient(to right, #3b82f6 ${value}%, #d1d5db ${value}%)`,
    }}
  />
);

/* ────────────────────────────────────────────
   Row item 
──────────────────────────────────────────── */
const SettingRow = ({ icon, label, right, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3.5
      ${onClick ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""}`}
  >
    <div className="w-10 h-10 shrink-0 flex items-center justify-center">
      {icon}
    </div>
    <span className="flex-1 font-medium text-gray-700">{label}</span>
    {right && <div className="shrink-0">{right}</div>}
  </div>
);

/* ────────────────────────────────────────────
   SettingModal
──────────────────────────────────────────── */
const SettingModal = ({ onClose }) => {
  const { volume, darkMode, setVolume, setDarkMode } = useSettingStore();

  const handleLogout = () => {
    // TODO: gọi logout action
    onClose?.();
  };

  const handleChangePassword = () => {
    // TODO: mở modal đổi mật khẩu
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl min-w-[50%] max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col">
          {/* ── Header ── */}
          <div className="flex items-center bg-yellow-400 px-4 py-3 relative shrink-0">
            <button
              onClick={onClose}
              className="
                absolute top-2
                p-1 rounded-full bg-white
                cursor-pointer
                shadow-[0_3px_0_rgba(0,0,0,0.102)]
                active:translate-y-[3px] active:shadow-none
                transition-all duration-150
              "
            >
              <X strokeWidth={3.5} className="text-yellow-400" />
            </button>
            <h2 className="mx-auto text-xl font-semibold text-gray-800 pr-9">
              Cài đặt tài khoản
            </h2>
          </div>

          {/* ── Body ── */}
          <div className="overflow-y-auto no-scrollbar px-8 pb-8 flex flex-col gap-5 pt-8">
            <div className="mx-auto">
              <ModalUserCard user={MOCK_USER} showEditName={true} />
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Setting rows */}
            <div className="flex flex-col gap-3">
              {/* Tham gia group */}
              <SettingRow
                icon={
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    F
                  </div>
                }
                label="Tham gia group học viên"
                onClick={() => window.open("https://facebook.com", "_blank")}
              />

              {/* Chat với Thchi */}
              <SettingRow
                icon={
                  <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                }
                label="Chat với Thchi"
                onClick={() => {}}
              />

              {/* Dark mode */}
              <SettingRow
                icon={
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Moon size={20} className="text-gray-600" />
                  </div>
                }
                label="Chế độ darkmode"
                right={<Toggle checked={darkMode} onChange={setDarkMode} />}
              />

              {/* Volume */}
              <SettingRow
                icon={
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Volume2 size={20} className="text-amber-500" />
                  </div>
                }
                label="Hiệu ứng âm thanh"
                right={<VolumeSlider value={volume} onChange={setVolume} />}
              />
            </div>

            {/* Footer links */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <button
                onClick={handleLogout}
                className="text-lg text-[#828282] underline underline-offset-2 transition-colors cursor-pointer font-semibold hover:opacity-80"
              >
                Đăng xuất
              </button>
              <button
                onClick={handleChangePassword}
                className="text-lg text-[#828282] underline underline-offset-2 transition-colors cursor-pointer font-semibold hover:opacity-80"
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default SettingModal;
