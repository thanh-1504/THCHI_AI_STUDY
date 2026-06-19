import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const INITIAL_PLANS = [
  {
    id: 1,
    name: "Premium 1 Tháng",
    duration: "1 Tháng",
    price: 99000,
    description: "Truy cập đầy đủ tính năng Premium trong 1 tháng",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Premium 3 Tháng",
    duration: "3 Tháng",
    price: 259000,
    description: "Truy cập đầy đủ tính năng Premium trong 3 tháng",
    status: "Hoạt động",
  },
  {
    id: 3,
    name: "Premium 1 Năm",
    duration: "12 Tháng",
    price: 799000,
    description: "Truy cập đầy đủ tính năng Premium trong 1 năm",
    status: "Hoạt động",
  },
  {
    id: 4,
    name: "Premium Trọn Đời",
    duration: "Trọn đời",
    price: 1999000,
    description: "Truy cập vĩnh viễn tất cả tính năng Premium",
    status: "Không hoạt động",
  },
];

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + "đ";

const StatusBadge = ({ status }) => {
  const map = {
    "Hoạt động": "bg-green-100 text-green-600",
    "Không hoạt động": "bg-red-100 text-red-500",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        map[status] || "bg-gray-100 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
};

// ─── Modal Form ───────────────────────────────────────────────────────────────
const PlanModal = ({ isOpen, onClose, onSave, editData }) => {
  const isEdit = !!editData;
  const [form, setForm] = useState(
    editData || {
      name: "",
      duration: "",
      price: "",
      description: "",
      status: "Hoạt động",
    },
  );

  // Reset form when modal opens with new data
  const handleSave = () => {
    if (!form.name.trim() || !form.duration.trim() || !form.price) return;
    onSave({ ...form, price: Number(form.price) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-800">
            {isEdit ? "Chỉnh sửa gói Premium" : "Thêm gói Premium mới"}
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
                Tên gói <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="VD: Premium 1 Tháng"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời hạn <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="VD: 1 Tháng, 12 Tháng, Trọn đời"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá (VND) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="VD: 99000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all bg-white cursor-pointer"
              >
                <option>Hoạt động</option>
                <option>Không hoạt động</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Mô tả ngắn về gói Premium..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all resize-none"
            />
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
            {isEdit ? "Lưu thay đổi" : "Thêm gói"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, planName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-base font-bold text-gray-800 mb-2">Xác nhận xóa</h3>
        <p className="text-sm text-gray-500">
          Bạn có chắc muốn xóa gói{" "}
          <span className="font-semibold text-gray-700">"{planName}"</span>?
          <br />
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
const AdminPremium = () => {
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [currentPage, setCurrentPage] = useState(0); // react-paginate is 0-based
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null); // holds plan being edited
  const [deleteModal, setDeleteModal] = useState(null); // holds plan being deleted

  // Pagination
  const pageCount = Math.max(1, Math.ceil(plans.length / itemsPerPage));
  const offset = currentPage * itemsPerPage;
  const paginatedPlans = plans.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  // CRUD
  const handleAdd = (formData) => {
    const newId =
      plans.length > 0 ? Math.max(...plans.map((p) => p.id)) + 1 : 1;
    setPlans((prev) => [...prev, { ...formData, id: newId }]);
  };

  const handleEdit = (formData) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === editModal.id ? { ...p, ...formData } : p)),
    );
  };

  const handleDelete = () => {
    setPlans((prev) => prev.filter((p) => p.id !== deleteModal.id));
    setDeleteModal(null);
    // If last item on page deleted, go back one page
    const newTotal = plans.length - 1;
    const newPageCount = Math.max(1, Math.ceil(newTotal / itemsPerPage));
    if (currentPage >= newPageCount) setCurrentPage(newPageCount - 1);
  };

  return (
    <>
      {/* Modals */}
      <PlanModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleAdd}
        editData={null}
      />
      {editModal && (
        <PlanModal
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
        planName={deleteModal?.name}
      />

      <div className="min-h-screen bg-gray-50 p-6 space-y-6">
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Quản lý gói Premium
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Quản lý các gói Premium trong hệ thống
            </p>
          </div>
          <button
            onClick={() => setAddModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Plus size={16} />
            Thêm gói Premium
          </button>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    "ID",
                    "Tên gói",
                    "Thời hạn",
                    "Giá",
                    "Mô tả",
                    "Trạng thái",
                    "Thao tác",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedPlans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-16 text-gray-400 text-sm"
                    >
                      Chưa có gói Premium nào
                    </td>
                  </tr>
                ) : (
                  paginatedPlans.map((plan, idx) => (
                    <tr
                      key={plan.id}
                      className={`hover:bg-yellow-50/30 transition-colors duration-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                      }`}
                    >
                      {/* ID */}
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium w-16">
                        {plan.id}
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {plan.name}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4 text-sm text-gray-600 w-32">
                        {plan.duration}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 w-32">
                        <span className="text-sm font-bold text-gray-700">
                          {formatPrice(plan.price)}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        {plan.description}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 w-36">
                        <StatusBadge status={plan.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 w-24">
                        <div className="flex items-center gap-1">
                          <button
                            title="Chỉnh sửa"
                            onClick={() => setEditModal(plan)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            title="Xóa"
                            onClick={() => setDeleteModal(plan)}
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            {/* Info */}
            <p className="text-sm text-gray-500">
              Hiển thị{" "}
              <span className="font-semibold text-gray-700">
                {plans.length === 0 ? 0 : offset + 1} –{" "}
                {Math.min(offset + itemsPerPage, plans.length)}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-semibold text-gray-700">
                {plans.length}
              </span>
            </p>

            {/* react-paginate */}
            <ReactPaginate.default
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              forcePage={currentPage}
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

            {/* Items per page */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Hiển thị</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(0);
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

export default AdminPremium;
