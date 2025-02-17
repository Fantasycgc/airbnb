import { useState, useEffect } from "react";
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

export const EditRoomModal = ({ open, handleClose, id, onSubmit }) => {
  const [editedRoomData, setEditedRoomData] = useState({
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

  useEffect(() => {
    if (id) {
      const getDetailRoomApi = async () => {
        try {
          const response = await ROOMAPI.detailRoomApi(id);
          setEditedRoomData(response.content);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };
      getDetailRoomApi();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedRoomData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await ROOMAPI.updateRoomApi(editedRoomData);
      if (response.statusCode === 200) {
        handleClose(false);
        toast.success("Cập nhật phòng thành công", { delay: 1000 });
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
        <DialogTitle>Chỉnh Sửa Phòng</DialogTitle>
      </div>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tên Phòng"
              name="tenPhong"
              fullWidth
              value={editedRoomData.tenPhong}
              onChange={handleChange}
            />
          </Grid>
          {[
            "khach",
            "phongNgu",
            "giuong",
            "phongTam",
            "giaTien",
            "maViTri"
          ].map((field) => (
            <Grid item xs={4} key={field}>
              <TextField
                label={field}
                type="number"
                name={field}
                fullWidth
                value={editedRoomData[field]}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              label="Mô Tả"
              name="moTa"
              fullWidth
              multiline
              rows={3}
              value={editedRoomData.moTa}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Hình Ảnh URL"
              name="hinhAnh"
              fullWidth
              value={editedRoomData.hinhAnh}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Tiện ích</h3>
            <Grid container spacing={1}>
              {[
                "mayGiat",
                "banLa",
                "tivi",
                "dieuHoa",
                "wifi",
                "bep",
                "doXe",
                "hoBoi",
                "banUi"
              ].map((item) => (
                <Grid item xs={4} key={item}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={editedRoomData[item]}
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
          Chỉnh sửa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
