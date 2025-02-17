import { apiInstance } from "../../config/axios.config";

export const BOOKINGAPI = {
  getBookingApi: async () => {
    try {
      const response = await apiInstance().get(
        "https://airbnbnew.cybersoft.edu.vn/api/dat-phong"
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  },
  createBookingApi: async (data) => {
    try {
      const response = await apiInstance().post(
        "https://airbnbnew.cybersoft.edu.vn/api/dat-phong",
        data
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  },
  detailBookingApi: async (id) => {
    try {
      const response = await apiInstance().get(
        `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  },
  updateBookingApi: async (id, data) => {
    try {
      const response = await apiInstance().put(
        `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  },
  deleteBookingApi: async (id) => {
    try {
      const response = await apiInstance().delete(
        `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching location:", error);
    }
  }
};
