import {
  Eye,
  Filter,
  LayoutGrid,
  LayoutList,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const TOPIC_COLORS = {
  TOEIC: "bg-blue-100 text-blue-600",
  THPT: "bg-pink-100 text-pink-600",
  IELTS: "bg-green-100 text-green-600",
  "Học sinh": "bg-orange-100 text-orange-600",
  "Luyện thi": "bg-purple-100 text-purple-600",
  "Cơ bản": "bg-yellow-100 text-yellow-600",
  "Nâng cao": "bg-red-100 text-red-600",
};

const COURSE_COLORS = [
  { bg: "bg-blue-500", text: "text-white" },
  { bg: "bg-violet-500", text: "text-white" },
  { bg: "bg-green-600", text: "text-white" },
  { bg: "bg-orange-500", text: "text-white" },
  { bg: "bg-pink-500", text: "text-white" },
  { bg: "bg-teal-500", text: "text-white" },
];

const INITIAL_COURSES = [
  {
    id: 1,
    shortName: "600+",
    prefix: "TOEIC",
    title: "TOEIC 600+",
    subtitle: "Từ vựng theo chủ đề TOEIC 600+",
    topics: ["TOEIC", "Luyện thi"],
    lessons: 12,
    words: 360,
    scope: "Premium",
    visible: true,
    colorIdx: 0,
  },
  {
    id: 2,
    shortName: "THPT",
    prefix: "TỪ VỰNG",
    title: "Từ vựng THPT",
    subtitle: "Từ vựng cho học sinh THPT",
    topics: ["THPT", "Học sinh"],
    lessons: 18,
    words: 540,
    scope: "Free",
    visible: true,
    colorIdx: 1,
  },
  {
    id: 3,
    shortName: "VOCAB",
    prefix: "IELTS",
    title: "IELTS Vocabulary",
    subtitle: "Từ vựng IELTS theo chủ đề",
    topics: ["IELTS", "Luyện thi"],
    lessons: 15,
    words: 450,
    scope: "Premium",
    visible: true,
    colorIdx: 2,
  },
  {
    id: 4,
    shortName: "400+",
    prefix: "TỪ VỰNG",
    title: "TOEIC 400+",
    subtitle: "Từ vựng cơ bản cho TOEIC",
    topics: ["TOEIC", "Cơ bản"],
    lessons: 10,
    words: 300,
    scope: "Free",
    visible: false,
    colorIdx: 3,
  },
];

const ITEMS_PER_PAGE_OPTIONS = [4, 8, 12, 20];
const ALL_TOPICS = ["TOEIC", "THPT", "IELTS", "Học sinh", "Luyện thi", "Cơ bản", "Nâng cao"];
const ALL_SCOPES = ["Free", "Premium"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TopicTag = ({ label }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mr-1 ${
      TOPIC_COLORS[label] || "bg-gray-100 text-gray-500"
    }`}
  >
    {label}
  </span>
);

const ScopeBadge = ({ scope }) =>
  scope === "Premium" ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">
      <Star size={11} fill="currentColor" />
      Premium
    </span>
  ) : (
    <span className="inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
      Free
    </span>
  );

const CourseThumb = ({ course }) => {
  const c = COURSE_COLORS[course.colorIdx % COURSE_COLORS.length];
  return (
    <div
      className={`w-12 h-12 rounded-xl ${c.bg} ${c.text} flex flex-col items-center justify-center leading-tight flex-shrink-0`}
    >
      <span className="text-[9px] font-bold opacity-80">{course.prefix}</span>
      <span className="text-sm font-extrabold">{course.shortName}</span>
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

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
const CourseModal = ({ isOpen, onClose, onSave, editData }) => {
  const isEdit = !!editData;
  const blank = {
    shortName: "",
    prefix: "",
    title: "",
    subtitle: "",
    topics: [],
    lessons: "",
    words: "",
    scope: "Free",
    visible: true,
    colorIdx: 0,
  };
  const [form, setForm] = useState(editData || blank);

  const toggleTopic = (t) =>
    setForm((f) => ({
      ...f,
      topics: f.topics.includes(t)
        ? f.topics.filter((x) => x !== t)
        : [...f.topics, t],
    }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({ ...form, lessons: Number(form.lessons), words: Number(form.words) });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-800">
            {isEdit ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={15} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên khóa học <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="VD: TOEIC 600+"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên viết tắt
              </label>
              <input
                type="text"
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                placeholder="VD: 600+"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Mô tả ngắn về khóa học..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số bài học</label>
              <input
                type="number"
                value={form.lessons}
                onChange={(e) => setForm({ ...form, lessons: e.target.value })}
                placeholder="VD: 12"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số từ vựng</label>
              <input
                type="number"
                value={form.words}
                onChange={(e) => setForm({ ...form, words: e.target.value })}
                placeholder="VD: 360"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phạm vi</label>
              <select
                value={form.scope}
                onChange={(e) => setForm({ ...form, scope: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all bg-white cursor-pointer"
              >
                {ALL_SCOPES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select
                value={form.visible ? "Hiển thị" : "Ẩn"}
                onChange={(e) => setForm({ ...form, visible: e.target.value === "Hiển thị" })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all bg-white cursor-pointer"
              >
                <option>Hiển thị</option>
                <option>Ẩn</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề / Tag</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTopic(t)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    form.topics.includes(t)
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "bg-white text-gray-500 border-gray-200 hover:border-yellow-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            {isEdit ? "Lưu thay đổi" : "Thêm khóa học"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, courseName }) => {
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
          Bạn có chắc muốn xóa khóa học{" "}
          <span className="font-semibold text-gray-700">"{courseName}"</span>?<br />
          Hành động này không thể hoàn tác.
        </p>
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminCourse = () => {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [viewMode, setViewMode] = useState("table"); // "table" | "card"

  // Filters
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [scopeFilter, setScopeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals
  const navigate = useNavigate();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  // ── Filter ───────────────────────────────────────────────────────────────
  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    if (q && !c.title.toLowerCase().includes(q)) return false;
    if (topicFilter !== "all" && !c.topics.includes(topicFilter)) return false;
    if (scopeFilter !== "all" && c.scope !== scopeFilter) return false;
    if (statusFilter === "visible" && !c.visible) return false;
    if (statusFilter === "hidden" && c.visible) return false;
    return true;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, pageCount - 1);
  const offset = safePage * itemsPerPage;
  const paginated = filtered.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  // ── CRUD ─────────────────────────────────────────────────────────────────
  const handleAdd = (data) => {
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses((prev) => [...prev, { ...data, id: newId }]);
  };

  const handleEdit = (data) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === editModal.id ? { ...c, ...data } : c))
    );
  };

  const handleDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== deleteModal.id));
    setDeleteModal(null);
    const newTotal = courses.length - 1;
    const newPageCount = Math.max(1, Math.ceil(newTotal / itemsPerPage));
    if (safePage >= newPageCount) setCurrentPage(newPageCount - 1);
  };

  const toggleVisible = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c))
    );
  };

  return (
    <>
      {/* Modals */}
      <CourseModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleAdd}
        editData={null}
      />
      {editModal && (
        <CourseModal
          isOpen={!!editModal}
          onClose={() => setEditModal(null)}
          onSave={handleEdit}
          editData={editModal}
        />
      )}
      <ConfirmDeleteModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        courseName={deleteModal?.title}
      />

      <div className="min-h-screen bg-gray-50 p-6 space-y-5">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Khóa học</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Danh sách tất cả các khóa học trên hệ thống
            </p>
          </div>
          <button
            onClick={() => setAddModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Plus size={16} />
            Thêm khóa học
          </button>
        </div>

        {/* ── Filter Bar ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
              placeholder="Tìm kiếm theo tên khóa học..."
              className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            />

            {/* Topic filter */}
            <select
              value={topicFilter}
              onChange={(e) => { setTopicFilter(e.target.value); setCurrentPage(0); }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
            >
              <option value="all">Chủ đề</option>
              {ALL_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Scope filter */}
            <select
              value={scopeFilter}
              onChange={(e) => { setScopeFilter(e.target.value); setCurrentPage(0); }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
            >
              <option value="all">Tất cả phạm vi</option>
              {ALL_SCOPES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="visible">Hiển thị</option>
              <option value="hidden">Ẩn</option>
            </select>

            {/* Filter btn */}
            <button
              onClick={() => setCurrentPage(0)}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Filter size={15} />
              Lọc
            </button>

            {/* View toggle */}
            <div className="ml-auto flex items-center bg-gray-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-yellow-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutList size={14} />
                Bảng
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "card"
                    ? "bg-white text-yellow-500 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutGrid size={14} />
                Card
              </button>
            </div>
          </div>
        </div>

        {/* ── Table View ── */}
        {viewMode === "table" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {["Tên khóa học", "Chủ đề / Tag", "Số bài học", "Số từ vựng", "Phạm vi", "Trạng thái", "Thao tác"].map((h) => (
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
                      <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
                        Không tìm thấy khóa học nào
                      </td>
                    </tr>
                  ) : (
                    paginated.map((course, idx) => (
                      <tr
                        key={course.id}
                        className={`hover:bg-yellow-50/30 transition-colors duration-100 ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                        }`}
                      >
                        {/* Name + thumb */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <CourseThumb course={course} />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{course.title}</p>
                              <p className="text-xs text-gray-400">{course.subtitle}</p>
                            </div>
                          </div>
                        </td>

                        {/* Topics */}
                        <td className="px-5 py-4">
                          {course.topics.map((t) => <TopicTag key={t} label={t} />)}
                        </td>

                        {/* Lessons */}
                        <td className="px-5 py-4 text-sm text-gray-600">
                          {course.lessons} bài
                        </td>

                        {/* Words */}
                        <td className="px-5 py-4 text-sm text-gray-600">
                          {course.words} từ
                        </td>

                        {/* Scope */}
                        <td className="px-5 py-4">
                          <ScopeBadge scope={course.scope} />
                        </td>

                        {/* Visibility toggle */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <ToggleSwitch
                              checked={course.visible}
                              onChange={() => toggleVisible(course.id)}
                            />
                            <span className={`text-xs font-medium ${course.visible ? "text-gray-700" : "text-gray-400"}`}>
                              {course.visible ? "Hiển thị" : "Ẩn"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                            <button
                              title="Xem"
                              onClick={() => navigate(`/admin/courses/${course.id}`)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              title="Chỉnh sửa"
                              onClick={() => setEditModal(course)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              title="Xóa"
                              onClick={() => setDeleteModal(course)}
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
                <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
                khóa học
              </p>

              <ReactPaginate.default
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                forcePage={safePage}
                onPageChange={handlePageChange}
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
        )}

        {/* ── Card View ── */}
        {viewMode === "card" && (
          <div>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {paginated.length === 0 ? (
                <p className="col-span-3 text-center py-16 text-gray-400 text-sm">
                  Không tìm thấy khóa học nào
                </p>
              ) : (
                paginated.map((course) => {
                  const c = COURSE_COLORS[course.colorIdx % COURSE_COLORS.length];
                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                    >
                      {/* Card header */}
                      <div className={`${c.bg} px-5 py-4 flex items-center gap-3`}>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex flex-col items-center justify-center leading-tight">
                          <span className="text-[9px] font-bold text-white/80">{course.prefix}</span>
                          <span className="text-sm font-extrabold text-white">{course.shortName}</span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{course.title}</p>
                          <p className="text-white/70 text-xs">{course.subtitle}</p>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="px-5 py-4 space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {course.topics.map((t) => <TopicTag key={t} label={t} />)}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{course.lessons} bài học</span>
                          <span>{course.words} từ vựng</span>
                          <ScopeBadge scope={course.scope} />
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                          <ToggleSwitch
                            checked={course.visible}
                            onChange={() => toggleVisible(course.id)}
                          />
                          <div className="flex gap-1">
                            <button
                              title="Xem"
                              onClick={() => navigate(`/admin/courses/${course.id}`)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              title="Chỉnh sửa"
                              onClick={() => setEditModal(course)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              title="Xóa"
                              onClick={() => setDeleteModal(course)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Card view pagination */}
            <div className="flex items-center justify-between mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
              <p className="text-sm text-gray-500">
                Hiển thị{" "}
                <span className="font-semibold text-gray-700">
                  {filtered.length === 0 ? 0 : offset + 1} –{" "}
                  {Math.min(offset + itemsPerPage, filtered.length)}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
                khóa học
              </p>

              <ReactPaginate.default
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                forcePage={safePage}
                onPageChange={handlePageChange}
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
        )}
      </div>
    </>
  );
};

export default AdminCourse;
