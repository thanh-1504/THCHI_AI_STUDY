import {
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    role: "User",
    status: "Hoạt động",
    createdAt: "12/05/2024",
    avatar: "NV",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    role: "User",
    status: "Hoạt động",
    createdAt: "11/05/2024",
    avatar: "TT",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    role: "Premium",
    status: "Hoạt động",
    createdAt: "10/05/2024",
    avatar: "LV",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    role: "User",
    status: "Bị khóa",
    createdAt: "09/05/2024",
    avatar: "PT",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@gmail.com",
    role: "Premium",
    status: "Hoạt động",
    createdAt: "08/05/2024",
    avatar: "HV",
  },
  {
    id: 6,
    name: "Đặng Thị F",
    email: "dangthif@gmail.com",
    role: "User",
    status: "Hoạt động",
    createdAt: "07/05/2024",
    avatar: "ĐT",
  },
  {
    id: 7,
    name: "Admin",
    email: "admin@webmochi.com",
    role: "Admin",
    status: "Hoạt động",
    createdAt: "01/05/2024",
    avatar: "AD",
  },
];

const TOTAL_USERS = 12450;
const ITEMS_PER_PAGE_OPTIONS = [7, 10, 20, 50];

// ─── Badge Components ─────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const styles = {
    User: "bg-blue-100 text-blue-600",
    Premium: "bg-purple-100 text-purple-600",
    Admin: "bg-orange-100 text-orange-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        styles[role] || "bg-gray-100 text-gray-500"
      }`}
    >
      {role}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Hoạt động": "bg-green-100 text-green-600",
    "Bị khóa": "bg-red-100 text-red-500",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ initials }) => {
  const colors = [
    "bg-blue-400",
    "bg-purple-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-orange-400",
  ];
  const color = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
};

// ─── Add User Modal ───────────────────────────────────────────────────────────
const AddUserModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-800">
            Thêm người dùng mới
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập họ và tên..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Nhập email..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Nhập mật khẩu..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vai trò
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all bg-white cursor-pointer"
            >
              <option value="User">User</option>
              <option value="Premium">Premium</option>
              <option value="Admin">Admin</option>
            </select>
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
            onClick={onClose}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
          >
            Thêm người dùng
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminUser = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tất cả vai trò");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(MOCK_USERS);

  // ── Filtering ──
  const filtered = users.filter((u) => {
    const matchSearch =
      searchText === "" ||
      u.name.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase());
    const matchRole = roleFilter === "Tất cả vai trò" || u.role === roleFilter;
    const matchStatus =
      statusFilter === "Tất cả trạng thái" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(TOTAL_USERS / itemsPerPage));

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleFilter = () => {
    setCurrentPage(1);
  };

  const handlePageChange = ({ selected }) => {
    // react-paginate uses 0-based index
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <AddUserModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Quản lý người dùng
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Quản lý toàn bộ tài khoản trong hệ thống
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1688676796006-bbd1599bbfb6?q=80&w=687&auto=format&fit=crop"
              alt="Admin"
            />
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Admin</p>
              <p className="text-xs text-gray-400">Quản trị viên</p>
            </div>
          </div>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tìm kiếm theo email, tên người dùng..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all bg-gray-50"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer min-w-[150px]"
            >
              <option>Tất cả vai trò</option>
              <option>User</option>
              <option>Premium</option>
              <option>Admin</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer min-w-[160px]"
            >
              <option>Tất cả trạng thái</option>
              <option>Hoạt động</option>
              <option>Bị khóa</option>
            </select>

            {/* Filter Button */}
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 border border-yellow-400 text-yellow-600 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-yellow-50 transition-colors cursor-pointer"
            >
              <Filter size={15} />
              Lọc
            </button>

            {/* Add User Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer ml-auto shadow-sm"
            >
              <Plus size={16} />
              Thêm người dùng
            </button>
          </div>
        </div>

        {/* ── Data Table ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    Người dùng
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    Email
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    Vai trò
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    Trạng thái
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    Ngày tạo
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-16 text-gray-400 text-sm"
                    >
                      <UserPlus size={36} className="mx-auto mb-3 opacity-30" />
                      Không tìm thấy người dùng nào
                    </td>
                  </tr>
                ) : (
                  filtered.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-yellow-50/30 transition-colors duration-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                      }`}
                    >
                      {/* ID */}
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                        {user.id}
                      </td>

                      {/* Name + Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar initials={user.avatar} />
                          <span className="text-sm font-semibold text-gray-700">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <StatusBadge status={user.status} />
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.createdAt}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* View */}
                          <button
                            title="Xem chi tiết"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                          >
                            <Eye size={16} />
                          </button>
                          {/* Edit */}
                          <button
                            title="Chỉnh sửa"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer"
                          >
                            <Pencil size={16} />
                          </button>
                          {/* Delete */}
                          <button
                            title="Xóa người dùng"
                            onClick={() => handleDelete(user.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            {/* Info */}
            <p className="text-sm text-gray-500">
              Hiển thị{" "}
              <span className="font-semibold text-gray-700">
                {(currentPage - 1) * itemsPerPage + 1} –{" "}
                {Math.min(currentPage * itemsPerPage, TOTAL_USERS)}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-semibold text-gray-700">
                {TOTAL_USERS.toLocaleString()}
              </span>
            </p>

            {/* Pages — react-paginate */}
            <ReactPaginate.default
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              forcePage={currentPage - 1}
              onPageChange={handlePageChange}
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              containerClassName="flex items-center gap-1"
              pageClassName=""
              pageLinkClassName="w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              activeClassName=""
              activeLinkClassName="!bg-yellow-400 !text-white shadow-sm"
              previousClassName=""
              previousLinkClassName="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-bold"
              nextClassName=""
              nextLinkClassName="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-bold"
              breakClassName=""
              breakLinkClassName="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
              disabledClassName="opacity-30 pointer-events-none"
              disabledLinkClassName="cursor-not-allowed"
            />

            {/* Items per page */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Hiển thị</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUser;
