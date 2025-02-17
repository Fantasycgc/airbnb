import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid
} from "@mui/material";
import { toast } from "react-toastify";
import { ROOMAPI } from "../API/room/RoomAPI";

export const CreateRoomModal = ({ open, handleClose, onSubmit }) => {
  const [roomData, setRoomData] = useState({
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await ROOMAPI.createRoomApi(roomData);
      if (response.statusCode === 200) {
        handleClose(false);
        toast.success("Thêm phòng thành công", { delay: 1000 });
        onSubmit();
      }
    } catch (error) {
      console.log(error.message || "Something went wrong");
      toast.error("Có lỗi xảy ra", { delay: 1000 });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      fullWidth
      maxWidth="md"
    >
      <div>
        <DialogTitle>Thêm Phòng Mới</DialogTitle>
      </div>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tên Phòng"
              name="tenPhong"
              fullWidth
              value={roomData.tenPhong}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số Khách"
              type="number"
              name="khach"
              fullWidth
              value={roomData.khach}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Phòng Ngủ"
              type="number"
              name="phongNgu"
              fullWidth
              value={roomData.phongNgu}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giường"
              type="number"
              name="giuong"
              fullWidth
              value={roomData.giuong}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Phòng Tắm"
              type="number"
              name="phongTam"
              fullWidth
              value={roomData.phongTam}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Giá Tiền"
              type="number"
              name="giaTien"
              fullWidth
              value={roomData.giaTien}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Mã Vị Trí"
              type="number"
              name="maViTri"
              fullWidth
              value={roomData.maViTri}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô Tả"
              name="moTa"
              fullWidth
              multiline
              rows={3}
              value={roomData.moTa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Hình Ảnh URL"
              name="hinhAnh"
              fullWidth
              value={roomData.hinhAnh}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Tiện ích</h3>
            <Grid container spacing={1}>
              {[
                "Máy giặt",
                "Bàn là",
                "Ti vi",
                "Điều hòa",
                "Wifi",
                "Bếp",
                "Đỗ xe",
                "Hồ bơi",
                "Bàn ủi"
              ].map((item) => (
                <Grid item xs={4} key={item}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={roomData[item]}
                        onChange={handleChange}
                        name={item}
                      />
                    }
                    label={item}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
