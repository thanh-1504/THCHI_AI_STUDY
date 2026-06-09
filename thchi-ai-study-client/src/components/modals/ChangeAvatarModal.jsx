import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

const ChangeAvatarModal = ({ onClose, onSave }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSave = () => {
    if (onSave && selectedFile) {
      onSave(selectedFile, preview);
    }
    onClose?.();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[61] pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-[360px] pointer-events-auto relative ">
          {/* Close button */}
          <button
            onClick={onClose}
            className="
              absolute -top-4 right-3
              p-1
              rounded-full
              bg-white
              text-gray-400
              cursor-pointer
              shadow-[0_3px_0_rgba(0,0,0,0.102)]
              active:translate-y-[3px]
              active:shadow-none
              transition-all
              duration-150
              "
          >
            <X strokeWidth={3.5} size={25} className="text-yellow-400" />
          </button>

          {/* Content */}
          <div className="px-8 pt-10 pb-8 flex flex-col items-center gap-5">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Thay đổi ảnh đại diện
            </h2>

            {/* Avatar picker area */}
            <div
              onClick={handleAreaClick}
              className="w-36 h-36 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-amber-400"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={36} className="text-gray-400" />
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Label */}
            <p
              onClick={handleAreaClick}
              className="text-sm text-gray-500 cursor-pointer hover:text-amber-500 transition-colors -mt-2"
            >
              Chọn ảnh
            </p>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={!selectedFile}
              className={`w-full py-3 rounded-full text-base font-semibold transition-all duration-200
                ${
                  selectedFile
                    ? "bg-(image:--my-gradient) hover:opacity-85 text-white shadow-[0_5px_0_#1f8f2f] active:shadow-none active:translate-y-[3px] cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ChangeAvatarModal;
