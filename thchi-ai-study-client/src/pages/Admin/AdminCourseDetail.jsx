import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronRight,
  Download,
  Eye,
  GripVertical,
  House,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Pencil,
  Plus,
  Save,
  Strikethrough,
  Trash2,
  Underline as UnderlineIcon,
  Upload,
  Volume2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";

// ─── Mock DB ──────────────────────────────────────────────────────────────────
const COURSE_DB = {
  1: {
    id: 1,
    shortName: "600+",
    prefix: "TOEIC",
    title: "TOEIC 600+",
    subtitle: "Từ vựng theo chủ đề TOEIC 600+",
    colorBg: "bg-blue-500",
    lessons: [
      { id: 1, order: 1, title: "Unit 1 – Văn phòng", words: 30, visible: true },
      { id: 2, order: 2, title: "Unit 2 – Đi công tác", words: 28, visible: true },
      { id: 3, order: 3, title: "Unit 3 – Giao tiếp qua điện thoại", words: 32, visible: true },
      { id: 4, order: 4, title: "Unit 4 – Email & Thư từ", words: 25, visible: false },
      { id: 5, order: 5, title: "Unit 5 – Cuộc họp", words: 30, visible: true },
      { id: 6, order: 6, title: "Unit 6 – Thuyết trình", words: 27, visible: true },
      { id: 7, order: 7, title: "Unit 7 – Tiếp thị", words: 24, visible: true },
      { id: 8, order: 8, title: "Unit 8 – Tài chính", words: 33, visible: true },
      { id: 9, order: 9, title: "Unit 9 – Nhân sự", words: 29, visible: true },
      { id: 10, order: 10, title: "Unit 10 – Vận chuyển", words: 31, visible: true },
      { id: 11, order: 11, title: "Unit 11 – Pháp lý", words: 22, visible: true },
      { id: 12, order: 12, title: "Unit 12 – Công nghệ", words: 35, visible: true },
    ],
  },
  2: {
    id: 2,
    shortName: "THPT",
    prefix: "TỪ VỰNG",
    title: "Từ vựng THPT",
    subtitle: "Từ vựng cho học sinh THPT",
    colorBg: "bg-violet-500",
    lessons: Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      order: i + 1,
      title: `Bài ${i + 1} – Chủ đề ${i + 1}`,
      words: 20 + i,
      visible: true,
    })),
  },
  3: {
    id: 3,
    shortName: "VOCAB",
    prefix: "IELTS",
    title: "IELTS Vocabulary",
    subtitle: "Từ vựng IELTS theo chủ đề",
    colorBg: "bg-green-600",
    lessons: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      order: i + 1,
      title: `Bài ${i + 1} – IELTS Topic ${i + 1}`,
      words: 25 + i,
      visible: i % 4 !== 3,
    })),
  },
  4: {
    id: 4,
    shortName: "400+",
    prefix: "TỪ VỰNG",
    title: "TOEIC 400+",
    subtitle: "Từ vựng cơ bản cho TOEIC",
    colorBg: "bg-orange-500",
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      order: i + 1,
      title: `Bài ${i + 1} – Cơ bản ${i + 1}`,
      words: 15 + i,
      visible: true,
    })),
  },
};

const WORD_TYPES = ["noun", "verb", "adj", "adv", "phrase"];
const ITEMS_PER_PAGE_OPTIONS = [6, 10, 20];

// ─── Tiptap Toolbar ───────────────────────────────────────────────────────────
const TipBtn = ({ onClick, isActive, children, title }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`p-1.5 rounded transition-colors cursor-pointer text-sm ${
      isActive
        ? "bg-yellow-100 text-yellow-600"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    }`}
  >
    {children}
  </button>
);

const LessonEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: "Nhập mô tả ngắn về bài học..." }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "min-h-[80px] px-4 py-3 focus:outline-none text-gray-700 text-sm leading-6",
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-300 focus-within:border-yellow-400 transition-all">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50 flex-wrap">
        <TipBtn title="In đậm" onClick={() => editor?.chain().focus().toggleBold().run()} isActive={editor?.isActive("bold")}>
          <Bold size={14} />
        </TipBtn>
        <TipBtn title="In nghiêng" onClick={() => editor?.chain().focus().toggleItalic().run()} isActive={editor?.isActive("italic")}>
          <Italic size={14} />
        </TipBtn>
        <TipBtn title="Gạch chân" onClick={() => editor?.chain().focus().toggleUnderline().run()} isActive={editor?.isActive("underline")}>
          <UnderlineIcon size={14} />
        </TipBtn>
        <TipBtn title="Gạch ngang" onClick={() => editor?.chain().focus().toggleStrike().run()} isActive={editor?.isActive("strike")}>
          <Strikethrough size={14} />
        </TipBtn>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <TipBtn title="Danh sách" onClick={() => editor?.chain().focus().toggleBulletList().run()} isActive={editor?.isActive("bulletList")}>
          <List size={14} />
        </TipBtn>
        <TipBtn title="Danh sách số" onClick={() => editor?.chain().focus().toggleOrderedList().run()} isActive={editor?.isActive("orderedList")}>
          <ListOrdered size={14} />
        </TipBtn>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <TipBtn title="Căn trái" onClick={() => editor?.chain().focus().setTextAlign?.("left").run()} isActive={false}>
          <AlignLeft size={14} />
        </TipBtn>
        <TipBtn title="Căn giữa" onClick={() => editor?.chain().focus().setTextAlign?.("center").run()} isActive={false}>
          <AlignCenter size={14} />
        </TipBtn>
        <TipBtn title="Căn phải" onClick={() => editor?.chain().focus().setTextAlign?.("right").run()} isActive={false}>
          <AlignRight size={14} />
        </TipBtn>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <TipBtn title="Link" onClick={() => {}} isActive={false}>
          <Link size={14} />
        </TipBtn>
        <TipBtn title="Ảnh" onClick={() => {}} isActive={false}>
          <Image size={14} />
        </TipBtn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

// ─── Toggle Switch ────────────────────────────────────────────────────────────
const ToggleSwitch = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
      checked ? "bg-yellow-400" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// ─── Audio Upload Cell ────────────────────────────────────────────────────────
const AudioUploadCell = ({ value, onChange }) => {
  const inputRef = useRef();
  return (
    <div className="flex items-center gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => onChange?.(e.target.files[0])}
      />
      {value ? (
        <button
          type="button"
          title="Phát âm"
          className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer"
          onClick={() => {
            const url = typeof value === "string" ? value : URL.createObjectURL(value);
            new Audio(url).play();
          }}
        >
          <Volume2 size={12} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1 text-xs text-gray-400 border border-dashed border-gray-300 px-2 py-1 rounded-lg hover:border-yellow-400 hover:text-yellow-500 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Upload size={11} />
          Upload
        </button>
      )}
      {value && (
        <button
          type="button"
          onClick={() => onChange?.(null)}
          className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

// ─── Add / Edit Lesson Modal ──────────────────────────────────────────────────
const LessonModal = ({ isOpen, onClose, onSave, editData, lessonCount }) => {
  const isEdit = !!editData;
  const blank = {
    title: "",
    description: "",
    thumbnail: null,
    thumbnailPreview: null,
    visible: true,
    vocab: [{ id: Date.now(), word: "", phonetic: "", type: "noun", meaning: "", example: "", audio: null, difficulty: 1 }],
  };
  const [form, setForm] = useState(
    editData
      ? { ...editData, thumbnailPreview: editData.thumbnailPreview || null }
      : blank
  );

  const thumbnailRef = useRef();

  const updateVocab = (idx, field, val) =>
    setForm((f) => {
      const v = [...f.vocab];
      v[idx] = { ...v[idx], [field]: val };
      return { ...f, vocab: v };
    });

  const addVocab = () =>
    setForm((f) => ({
      ...f,
      vocab: [...f.vocab, { id: Date.now(), word: "", phonetic: "", type: "noun", meaning: "", example: "", audio: null, difficulty: 1 }],
    }));

  const removeVocab = (idx) =>
    setForm((f) => ({ ...f, vocab: f.vocab.filter((_, i) => i !== idx) }));

  const clearAllVocab = () => setForm((f) => ({ ...f, vocab: [] }));

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, thumbnail: file, thumbnailPreview: URL.createObjectURL(file) }));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-6 px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {isEdit ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Bài học #{isEdit ? editData.order : lessonCount + 1}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              <Eye size={14} /> Xem trước
            </button>
            <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              <Download size={14} /> Import CSV
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Save size={14} />
              {isEdit ? "Lưu thay đổi" : "Thêm bài học"}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X size={15} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-6">
          {/* Top two-column: form + thumbnail */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left: name + description */}
            <div className="col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên bài học <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="VD: Unit 1 – Văn phòng"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mô tả ngắn
                </label>
                <LessonEditor
                  content={form.description}
                  onChange={(html) => setForm((f) => ({ ...f, description: html }))}
                />
              </div>
            </div>

            {/* Right: thumbnail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail bài học
              </label>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {form.thumbnailPreview ? (
                  <img
                    src={form.thumbnailPreview}
                    alt="Thumbnail"
                    className="w-full h-36 object-cover"
                  />
                ) : (
                  <div className="w-full h-36 bg-gray-50 flex items-center justify-center text-gray-300">
                    <Image size={32} />
                  </div>
                )}
                <div className="p-3 flex flex-col gap-2">
                  <input
                    ref={thumbnailRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnail}
                  />
                  <button
                    type="button"
                    onClick={() => thumbnailRef.current?.click()}
                    className="flex items-center justify-center gap-2 text-xs text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Upload size={12} /> Thay đổi ảnh
                  </button>
                  {form.thumbnailPreview && (
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, thumbnail: null, thumbnailPreview: null }))}
                      className="flex items-center justify-center gap-2 text-xs text-red-500 border border-red-200 rounded-lg py-1.5 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <X size={12} /> Xóa ảnh
                    </button>
                  )}
                  <p className="text-[11px] text-gray-400 text-center">JPG, PNG hoặc WEBP. Tối đa 2MB.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vocab table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-800">
                Danh sách từ vựng trong bài ({form.vocab.length} từ)
              </h4>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="w-8 py-3 px-2"></th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">STT</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Từ (Word)</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Phiên âm</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Loại từ</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Nghĩa tiếng Việt</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Câu ví dụ</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Audio</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Độ khó</th>
                    <th className="w-8 py-3 px-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {form.vocab.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-gray-400 text-sm">
                        Chưa có từ vựng nào. Nhấn "+ Thêm từ vựng" để thêm.
                      </td>
                    </tr>
                  )}
                  {form.vocab.map((v, idx) => (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2 px-2 text-gray-300 cursor-grab">
                        <GripVertical size={14} />
                      </td>
                      <td className="py-2 px-2 text-gray-500 text-xs font-medium">{idx + 1}</td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          value={v.word}
                          onChange={(e) => updateVocab(idx, "word", e.target.value)}
                          placeholder="office"
                          className="w-24 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-400"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          value={v.phonetic}
                          onChange={(e) => updateVocab(idx, "phonetic", e.target.value)}
                          placeholder="/ˈɒfɪs/"
                          className="w-24 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-400"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <select
                          value={v.type}
                          onChange={(e) => updateVocab(idx, "type", e.target.value)}
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-yellow-300 cursor-pointer"
                        >
                          {WORD_TYPES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          value={v.meaning}
                          onChange={(e) => updateVocab(idx, "meaning", e.target.value)}
                          placeholder="văn phòng"
                          className="w-28 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-400"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="text"
                          value={v.example}
                          onChange={(e) => updateVocab(idx, "example", e.target.value)}
                          placeholder="I work in a modern office."
                          className="w-44 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-400"
                        />
                      </td>
                      <td className="py-2 px-1">
                        <AudioUploadCell
                          value={v.audio}
                          onChange={(file) => updateVocab(idx, "audio", file)}
                        />
                      </td>
                      <td className="py-2 px-1">
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={v.difficulty}
                          onChange={(e) => updateVocab(idx, "difficulty", Number(e.target.value))}
                          className="w-14 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-400"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <button
                          type="button"
                          onClick={() => removeVocab(idx)}
                          className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom action row */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={addVocab}
                  className="flex items-center gap-1.5 text-sm font-semibold text-yellow-500 border border-yellow-300 rounded-xl px-4 py-2 hover:bg-yellow-50 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Thêm từ vựng
                </button>
                <p className="text-xs text-gray-400">Mẹo: Kéo thả để sắp xếp thứ tự từ vựng</p>
              </div>
              {form.vocab.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllVocab}
                  className="flex items-center gap-1.5 text-sm font-semibold text-red-400 border border-red-200 rounded-xl px-4 py-2 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} /> Xóa tất cả
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Confirm Delete ───────────────────────────────────────────────────────────
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
        <p className="text-sm text-gray-500">
          Bạn có chắc muốn xóa bài học{" "}
          <span className="font-semibold text-gray-700">"{name}"</span>?<br />
          Hành động này không thể hoàn tác.
        </p>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Hủy</button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors cursor-pointer">Xóa</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const courseData = COURSE_DB[id] || COURSE_DB[1];
  const [lessons, setLessons] = useState(courseData.lessons);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Modals
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  // Filter
  const filtered = lessons.filter((l) => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter === "visible" && !l.visible) return false;
    if (statusFilter === "hidden" && l.visible) return false;
    return true;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, pageCount - 1);
  const offset = safePage * itemsPerPage;
  const paginated = filtered.slice(offset, offset + itemsPerPage);

  // CRUD
  const handleAdd = (data) => {
    const newId = lessons.length > 0 ? Math.max(...lessons.map((l) => l.id)) + 1 : 1;
    setLessons((prev) => [
      ...prev,
      { ...data, id: newId, order: lessons.length + 1, words: data.vocab?.length || 0 },
    ]);
  };

  const handleEdit = (data) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === editModal.id ? { ...l, ...data, words: data.vocab?.length || l.words } : l
      )
    );
  };

  const handleDelete = () => {
    setLessons((prev) => prev.filter((l) => l.id !== deleteModal.id));
    setDeleteModal(null);
  };

  const toggleVisible = (id) =>
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));

  return (
    <>
      {/* Modals */}
      <LessonModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleAdd}
        editData={null}
        lessonCount={lessons.length}
      />
      {editModal && (
        <LessonModal
          isOpen={!!editModal}
          onClose={() => setEditModal(null)}
          onSave={handleEdit}
          editData={editModal}
          lessonCount={lessons.length}
        />
      )}
      <ConfirmDeleteModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        name={deleteModal?.title}
      />

      <div className="min-h-screen bg-gray-50 p-6 space-y-5">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/admin/courses")}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
              >
                <ChevronRight size={16} className="text-gray-500 rotate-180" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Danh sách Bài học</h1>
            </div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-400">
              <House size={13} />
              <span
                onClick={() => navigate("/admin/courses")}
                className="hover:text-yellow-500 cursor-pointer transition-colors"
              >
                Khóa học
              </span>
              <ChevronRight size={13} />
              <span className="font-medium text-gray-600">{courseData.title}</span>
              <ChevronRight size={13} />
              <span className="text-gray-500">Bài học</span>
            </div>
          </div>
        </div>

        {/* ── Filter + Add button ── */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
            placeholder="Tìm kiếm bài học..."
            className="flex-1 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all shadow-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
            className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer shadow-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="visible">Hiển thị</option>
            <option value="hidden">Ẩn</option>
          </select>
          <button
            onClick={() => setAddModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer shadow-sm whitespace-nowrap"
          >
            <Plus size={15} />
            Thêm bài học
          </button>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {["Thứ tự", "Tên bài học", "Số từ vựng", "Trạng thái", "Thao tác"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400 text-sm">
                      Không tìm thấy bài học nào
                    </td>
                  </tr>
                ) : (
                  paginated.map((lesson, idx) => (
                    <tr
                      key={lesson.id}
                      className={`hover:bg-yellow-50/30 transition-colors duration-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                      }`}
                    >
                      {/* Order */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <GripVertical size={16} className="text-gray-300 cursor-grab" />
                          <span className="text-sm font-medium text-gray-700">{lesson.order}</span>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="px-5 py-4 text-sm text-gray-700 font-medium">
                        {lesson.title}
                      </td>

                      {/* Words */}
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {lesson.words} từ
                      </td>

                      {/* Visibility toggle */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <ToggleSwitch
                            checked={lesson.visible}
                            onChange={() => toggleVisible(lesson.id)}
                          />
                          <span className={`text-xs font-medium ${lesson.visible ? "text-gray-700" : "text-gray-400"}`}>
                            {lesson.visible ? "Hiển thị" : "Ẩn"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            title="Xem"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            title="Chỉnh sửa"
                            onClick={() => setEditModal(lesson)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            title="Xóa"
                            onClick={() => setDeleteModal(lesson)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination Footer ── */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Hiển thị{" "}
              <span className="font-semibold text-gray-700">
                {filtered.length === 0 ? 0 : offset + 1} –{" "}
                {Math.min(offset + itemsPerPage, filtered.length)}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-semibold text-gray-700">{filtered.length}</span> bài học
            </p>

            <ReactPaginate.default
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              forcePage={safePage}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              containerClassName="flex items-center gap-1"
              pageLinkClassName="w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              activeClassName=""
              activeLinkClassName="!bg-yellow-400 !text-white shadow-sm"
              previousClassName=""
              previousLinkClassName="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-bold"
              nextClassName=""
              nextLinkClassName="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-bold"
              breakLinkClassName="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
              disabledLinkClassName="opacity-30 cursor-not-allowed pointer-events-none"
            />

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Hiển thị</span>
              <select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(0); }}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCourseDetail;
