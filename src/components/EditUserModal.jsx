import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem
} from "@mui/material";
import { toast } from "react-toastify";
import { USERAPI } from "../API/user/UserAPI";

export const EditUserModal = ({ open, setOpen, id, getUserApi }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "USER"
  });

  useEffect(() => {
    if (id) {
      const getUserDetail = async () => {
        const response = await USERAPI.getDetailUserApi(id);
        setUser(response.content);
      };

      getUserDetail();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name) => (event) => {
    setUser((prev) => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const response = await USERAPI.updateUserApi(user);

      if (response.statusCode === 200) {
        setOpen(false);
        toast.success("Cập nhật thành công.");
        getUserApi();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <div>
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
      </div>
      <DialogContent className="space-y-4">
        <TextField
          label="Tên người dùng"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          required
          type="email"
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Ngày sinh"
          name="birthday"
          value={user.birthday}
          onChange={handleChange}
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <Select
          name="gender"
          value={user.gender}
          onChange={handleSelectChange("gender")}
          fullWidth
        >
          <MenuItem value={true}>Nam</MenuItem>
          <MenuItem value={false}>Nữ</MenuItem>
        </Select>
        <Select
          name="role"
          value={user.role}
          onChange={handleSelectChange("role")}
          fullWidth
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Chỉnh sửa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
