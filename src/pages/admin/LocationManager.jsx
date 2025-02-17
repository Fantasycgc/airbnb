import { useEffect, useState } from "react";
import { LOCATIONAPI } from "../../API/location/LocationAPI";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
import { CreateLocationModal } from "../../components/CreateLocationModal";
import { EditLocationModal } from "../../components/EditLocationModal";

export const LocationManager = () => {
  const [id, setID] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getLocations = async () => {
    try {
      setLoading(true);
      const data = await LOCATIONAPI.getLocationApi();
      setLocations(data.content);
      setFilteredLocations(data.content);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    const filtered = locations.filter((location) =>
      location.tenViTri.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
    setCurrentPage(1);
  }, [searchTerm, locations]);

  if (loading) return <Loading />;
  if (error) toast.error(error, { delay: 1000 });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLocations
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);

  const handleDeleteLocation = async (id) => {
    try {
      const response = await LOCATIONAPI.deleteLocationApi(id);
      if (response.statusCode === 200) {
        getLocations();
        toast.success("Xóa vị trí thành công", { delay: 1000 });
      }
    } catch (err) {
      console.log(err.message || "Something went wrong");
      toast.error("Có lỗi xảy ra", { delay: 1000 });
    }
  };

  return (
    <div className="p-5 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Quản Lý Vị Trí
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
          + Thêm vị trí
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">STT</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Tỉnh thành</th>
              <th className="px-4 py-2">Tên vị trí</th>
              <th className="px-4 py-2">Quốc gia</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((location, index) => (
              <tr key={location.id} className="text-center border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 flex items-center justify-center">
                  <img
                    src={location.hinhAnh || "https://via.placeholder.com/50"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                </td>
                <td className="px-4 py-2">{location.tinhThanh}</td>
                <td className="px-4 py-2">{location.tenViTri}</td>
                <td className="px-4 py-2 font-bold">{location.quocGia}</td>
                <td className="px-4 py-2 flex justify-center gap-5">
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      return setID(location.id), setOpen2(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteLocation(location.id)}
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
      <CreateLocationModal
        isOpen={open}
        onClose={setOpen}
        refreshLocations={getLocations}
      />
      <EditLocationModal
        isOpen={open2}
        onClose={setOpen2}
        id={id}
        refreshLocations={getLocations}
      />
    </div>
  );
};
