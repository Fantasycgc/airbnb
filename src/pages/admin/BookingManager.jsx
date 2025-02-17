import { useEffect, useState } from "react";
import { BOOKINGAPI } from "../../API/booking/bookingApi";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
import { CreateBookingModal } from "../../components/CreateBookingModal";
import { EditBookingModal } from "../../components/EditBookingModal";

export const BookingManager = () => {
  const [id, setID] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [bookingManager, setBookingManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const getBooking = async () => {
    try {
      setLoading(true);
      const data = await BOOKINGAPI.getBookingApi();
      setBookingManager(data.content);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  if (loading) return <Loading />;
  if (error) toast.error(error, { delay: 1000 });

  const filteredBookings = bookingManager.filter((booking) =>
    booking.maPhong.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteBooking = async (id) => {
    try {
      const response = await BOOKINGAPI.deleteBookingApi(id);
      if (response.statusCode !== 200) {
        throw new Error("Xóa booking thất bại");
      }
      toast.success("Xóa booking thành công", { delay: 1000 });
      getBooking();
    } catch (err) {
      console.error(err.message || "Something went wrong");
      toast.error("Có lỗi xảy ra", { delay: 1000 });
    }
  };

  return (
    <div>
      <div className="p-5 bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quản Lý Lịch Booking
        </h1>
        <div className="flex flex-wrap justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo vị trí"
            className="border px-4 py-2 rounded w-full md:w-1/2 mb-4 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto"
            onClick={() => setOpen(true)}
          >
            + Thêm Booking
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Mã phòng</th>
                <th className="px-4 py-2">Ngày đến</th>
                <th className="px-4 py-2">Ngày đi</th>
                <th className="px-4 py-2">Số lượng khách</th>
                <th className="px-4 py-2">Mã người dùng</th>
                <th className="px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedBookings.map((booking, index) => (
                <tr key={booking.id} className="text-center border-t">
                  <td className="px-4 py-2">{startIndex + index + 1}</td>
                  <td className="px-4 py-2 flex items-center justify-center">
                    {booking.maPhong}
                  </td>
                  <td className="px-4 py-2">{booking.ngayDen}</td>
                  <td className="px-4 py-2">{booking.ngayDi}</td>
                  <td className="px-4 py-2">{booking.soLuongKhach}</td>
                  <td className="px-4 py-2">{booking.maNguoiDung}</td>
                  <td className="px-4 py-2 flex justify-center gap-5">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        return setID(booking.id), setOpen2(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ⬅️
          </button>
          <span className="px-3 py-1 bg-gray-200 rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ➡️
          </button>
        </div>
      </div>
      <CreateBookingModal
        isOpen={open}
        onClose={setOpen}
        refreshBookings={getBooking}
      />
      <EditBookingModal
        isOpen={open2}
        onClose={setOpen2}
        id={id}
        refreshBookings={getBooking}
      />
    </div>
  );
};
