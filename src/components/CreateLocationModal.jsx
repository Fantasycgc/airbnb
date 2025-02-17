import { useState } from "react";

import { toast } from "react-toastify";
import { LOCATIONAPI } from "../API/location/LocationAPI";

export const CreateLocationModal = ({ isOpen, onClose, refreshLocations }) => {
  const [formData, setFormData] = useState({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await LOCATIONAPI.addLocationApi(formData);
      if (response.statusCode === 200) {
        onClose(false);
        toast.success("Thêm vị trí thành công", { delay: 1000 });
        refreshLocations();
      }
    } catch (err) {
      console.log(err.message || "Something went wrong");
      toast.error("Có lỗi xảy ra", { delay: 1000 });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return onClose(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Thêm vị trí mới</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="tenViTri"
            placeholder="Tên vị trí"
            className="border p-2 w-full mb-2 rounded"
            value={formData.tenViTri}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tinhThanh"
            placeholder="Tỉnh thành"
            className="border p-2 w-full mb-2 rounded"
            value={formData.tinhThanh}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="quocGia"
            placeholder="Quốc gia"
            className="border p-2 w-full mb-2 rounded"
            value={formData.quocGia}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="hinhAnh"
            placeholder="URL Hình ảnh"
            className="border p-2 w-full mb-2 rounded"
            value={formData.hinhAnh}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => onClose(false)}
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
