import { useState } from "react";
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

export const CreateUserModal = ({ open, setOpen, getUserApi }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "USER"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.password || !user.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const response = await USERAPI.createUserApi(user);
      if (response.statusCode === 200) {
        setOpen(false);
        toast.success("Thêm người dùng thành công.");
        getUserApi();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <div>
        <DialogTitle>Thêm Người Dùng</DialogTitle>
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
          label="Mật khẩu"
          name="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          required
          type="password"
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
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={true}>Nam</MenuItem>
          <MenuItem value={false}>Nữ</MenuItem>
        </Select>
        <Select name="role" value={user.role} onChange={handleChange} fullWidth>
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};
