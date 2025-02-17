import { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash, Ban } from "lucide-react";
import { USERAPI } from "../../API/user/UserAPI";
import avatarDefault from "../../assets/avatar.png";
import { Loading } from "../../components/Loading";
import { toast } from "react-toastify";
import { CreateUserModal } from "../../components/CreateUserModal";
import { formatDate } from "../../constants/formatDate";
import { EditUserModal } from "../../components/EditUserModal";

export const UserManager = () => {
  const [id, setID] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getUserApi = async () => {
    try {
      setLoading(true);
      const response = await USERAPI.getUserApi();
      setUsers(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserApi();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers
    .sort((a, b) => b.id - a.id)
    .slice(startIndex, startIndex + itemsPerPage);

  if (error) toast.error(error, { delay: 1000 });

  const handleDeleteUser = (id) => {
    return async () => {
      try {
        const response = await USERAPI.deleteUserApi(id);
        if (response.statusCode === 200) {
          toast.success("Xóa người dùng thành công");
        }
        getUserApi();
      } catch (error) {
        setError(error);
      }
    };
  };

  return !loading ? (
    <>
      <div className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Quản Lý Người Dùng
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên người dùng"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/2"
          />
          <button
            className="mt-4 md:mt-0 flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setOpen(true)}
          >
            <PlusCircle size={20} className="mr-2" /> Thêm người dùng
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th>
                  <div className="w-[40px] text-center">STT</div>
                </th>
                <th>
                  <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap px-3 py-4">
                    Tên người dùng
                  </div>
                </th>
                <th>
                  <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    Ngày sinh
                  </div>
                </th>
                <th>
                  <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    Email
                  </div>
                </th>
                <th>
                  <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    Vai trò
                  </div>
                </th>
                <th>
                  <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    Hành động
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td>
                    <div className="w-[40px] text-center">
                      {startIndex + index + 1}
                    </div>
                  </td>

                  <td>
                    <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap px-3 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            user.avatar === null ? avatarDefault : user.avatar
                          }
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{user.name}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
                      {user.birthday === null
                        ? "Chưa có ngày sinh"
                        : formatDate(user.birthday)}
                    </div>
                  </td>

                  <td>
                    <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-center font-semibold ${
                        user.role === "ADMIN"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {user.role}
                    </div>
                  </td>
                  <td>
                    <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      <div className="flex space-x-3 items-center justify-center">
                        {user.role === "ADMIN" ? (
                          <button className="text-blue-500 hover:text-blue-700 cursor-not-allowed">
                            <Ban size={18} />
                          </button>
                        ) : (
                          <>
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => {
                                return setOpen2(true), setID(user.id);
                              }}
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={handleDeleteUser(user.id)}
                            >
                              <Trash size={18} />
                            </button>
                          </>
                        )}
                      </div>
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
      <CreateUserModal open={open} setOpen={setOpen} getUserApi={getUserApi} />
      <EditUserModal
        open={open2}
        setOpen={setOpen2}
        id={id}
        getUserApi={getUserApi}
      />
    </>
  ) : (
    <Loading />
  );
};
