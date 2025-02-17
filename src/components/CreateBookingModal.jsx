import { useState } from "react";
import { toast } from "react-toastify";
import { BOOKINGAPI } from "../API/booking/bookingApi";

export const CreateBookingModal = ({ isOpen, onClose, refreshBookings }) => {
  const [formData, setFormData] = useState({
    maPhong: 0,
    ngayDen: new Date().toISOString(),
    ngayDi: new Date().toISOString(),
    soLuongKhach: 0,
    maNguoiDung: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await BOOKINGAPI.createBookingApi(formData);

      if (response.statusCode !== 201) {
        throw new Error("Tạo booking thất bại");
      }

      toast.success("Tạo booking thành công", { delay: 1000 });
      onClose(false);
      refreshBookings();
    } catch (err) {
      console.error(err.message || "Something went wrong");
      toast.error("Có lỗi xảy ra", { delay: 1000 });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Thêm Booking</h2>
        <div className="mb-4">
          <label className="block">Mã Phòng</label>
          <input
            type="number"
            name="maPhong"
            value={formData.maPhong}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>
        <div className="mb-4">
          <label className="block">Ngày Đến</label>
          <input
            type="datetime-local"
            name="ngayDen"
            value={formData.ngayDen}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Ngày Đi</label>
          <input
            type="datetime-local"
            name="ngayDi"
            value={formData.ngayDi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block">Số Lượng Khách</label>
          <input
            type="number"
            name="soLuongKhach"
            value={formData.soLuongKhach}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>
        <div className="mb-4">
          <label className="block">Mã Người Dùng</label>
          <input
            type="number"
            name="maNguoiDung"
            value={formData.maNguoiDung}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min={0}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onClose(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
