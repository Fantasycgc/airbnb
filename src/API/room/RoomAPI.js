import { apiInstance } from "../../config/axios.config";

export const ROOMAPI = {
  getRoomApi: async () => {
    try {
      const response = await apiInstance().get(
        "https://airbnbnew.cybersoft.edu.vn/api/phong-thue"
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
  createRoomApi: async (data) => {
    try {
      const response = await apiInstance().post(
        "https://airbnbnew.cybersoft.edu.vn/api/phong-thue",
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
  detailRoomApi: async (id) => {
    try {
      const response = await apiInstance().get(
        `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
  updateRoomApi: async (data) => {
    try {
      const response = await apiInstance().put(
        `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${data.id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
  deleteRoomApi: async (id) => {
    try {
      const response = await apiInstance().delete(
        `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }
};
