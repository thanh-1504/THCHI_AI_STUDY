import { Calendar, Camera, Mail, Pencil } from "lucide-react";
import { useState } from "react";
import ChangeAvatarModal from "../ChangeAvatarModal";
import ChangeNameModal from "../ChangeNameModal";

const ModalUserCard = ({ user = {}, showEditName = false, onNameSave }) => {
  const {
    name = "",
    email = "",
    joinedAt = "",
    accountType = "Free Account",
    avatar: initialAvatar = null,
  } = user;

  const [avatar, setAvatar] = useState(initialAvatar);
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);
  const [nameValue, setNameValue] = useState(name);

  const handleSaveAvatar = (_file, previewUrl) => {
    setAvatar(previewUrl);
  };

  const handleSaveName = (newName) => {
    setNameValue(newName);
    onNameSave?.(newName);
  };

  return (
    <>
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 rounded-full border-4 border-green-400 overflow-hidden bg-gray-100 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl select-none">🐣</span>
            )}
          </div>
          {/* Camera button */}
          <button
            onClick={() => setShowChangeAvatar(true)}
            className="absolute bottom-2 -right-2 w-8 h-8 bg-white rounded-full border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors z-40"
          >
            <Camera size={16} className="text-gray-500 cursor-pointer" />
          </button>
          {/* Free Account badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-gradient text-white font-bold px-4 py-1 rounded-full shadow z-30">
            {accountType}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 pt-1">
          {/* Name row */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">
              {nameValue}
            </span>
            {showEditName && (
              <button
                onClick={() => setShowChangeName(true)}
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Pencil size={16} />
              </button>
            )}
          </div>

          {/* Email */}
          {email && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={15} className="shrink-0 text-gray-400" />
              <span>
                <span className="font-semibold text-gray-600">Email: </span>
                <span className="text-blue-500">{email}</span>
              </span>
            </div>
          )}

          {/* Joined date */}
          {joinedAt && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={15} className="shrink-0 text-gray-400" />
              <span>
                <span className="font-semibold text-gray-600">
                  Ngày kích hoạt:{" "}
                </span>
                {joinedAt}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Change avatar sub-modal */}
      {showChangeAvatar && (
        <ChangeAvatarModal
          onClose={() => setShowChangeAvatar(false)}
          onSave={handleSaveAvatar}
        />
      )}

      {/* Change name sub-modal */}
      {showChangeName && (
        <ChangeNameModal
          currentName={nameValue}
          onClose={() => setShowChangeName(false)}
          onSave={handleSaveName}
        />
      )}
    </>
  );
};

export default ModalUserCard;
