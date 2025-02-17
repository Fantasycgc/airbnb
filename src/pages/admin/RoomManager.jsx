import { useEffect, useState } from "react";
import { ROOMAPI } from "../../API/room/RoomAPI";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
import { CreateRoomModal } from "../../components/CreateRoomModal";
import { EditRoomModal } from "../../components/EditRoomModal";

export const RoomManager = () => {
  const [id, setID] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [roomManager, setRoomManager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getRoom = async () => {
    try {
      setLoading(true);
      const data = await ROOMAPI.getRoomApi();
      setRoomManager(data.content);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);

  if (loading) return <Loading />;
  if (error) toast.error(error, { delay: 1000 });

  const filteredRooms = roomManager
    .sort((a, b) => a.id - b.id)
    .filter((room) =>
      room.tenPhong.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const handleDeleteRoom = async (id) => {
    try {
      const response = await ROOMAPI.deleteRoomApi(id);
      if (response.statusCode === 200) {
        toast.success("Xóa phòng thành công", { delay: 1000 });
        getRoom();
      }
    } catch (error) {
      console.log(error.message, "Something went wrong");
      toast.error("Có lỗi xảy ra", { delay: 1000 });
    }
  };

  return (
    <div>
      <div className="p-5 bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quản Lý Phòng
        </h1>
        <div className="flex flex-wrap justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên phòng"
            className="border px-4 py-2 rounded w-full md:w-1/2 mb-4 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto"
            onClick={() => setOpen(true)}
          >
            + Thêm phòng
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 w-1/12">STT</th>
                <th className="px-4 py-2 w-7/12">Tên phòng</th>
                <th className="px-4 py-2 w-1/12">Vị trí</th>
                <th className="px-4 py-2 w-1/12">Chi tiết</th>
                <th className="px-4 py-2 w-3/12 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room, index) => (
                <tr key={room.id} className="border-t text-left">
                  <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={room.hinhAnh || "https://via.placeholder.com/50"}
                      alt="avatar"
                      className="w-1/2 h-1/2 mr-4"
                    />
                    <span>{room.tenPhong}</span>
                  </td>
                  <td className="px-4 py-2">{room.maViTri}</td>
                  <td className="px-4 py-2">
                    <button>Chi tiết</button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-4">
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          return setOpen2(true), setID(room.id);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        🗑️
                      </button>
                    </div>
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
      <CreateRoomModal open={open} handleClose={setOpen} onSubmit={getRoom} />
      <EditRoomModal
        open={open2}
        handleClose={setOpen2}
        id={id}
        onSubmit={getRoom}
      />
    </div>
  );
};
