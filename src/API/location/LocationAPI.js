import { apiInstance } from "../../config/axios.config";

export const LOCATIONAPI = {
  getLocationApi: async () => {
    try {
      const response = await apiInstance().get(
        "https://airbnbnew.cybersoft.edu.vn/api/vi-tri"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
  addLocationApi: async (location) => {
    try {
      const response = await apiInstance().post(
        "https://airbnbnew.cybersoft.edu.vn/api/vi-tri",
        location
      );
      return response.data;
    } catch (error) {
      console.error("Error adding location:", error);
    }
  },
  detailLocationApi: async (id) => {
    try {
      const response = await apiInstance().get(
        `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching location detail:", error);
    }
  },
  updateLocationApi: async (id, location) => {
    try {
      const response = await apiInstance().put(
        `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${id}`,
        location
      );
      return response.data;
    } catch (error) {
      console.error("Error updating location:", error);
    }
  },
  deleteLocationApi: async (id) => {
    try {
      const response = await apiInstance().delete(
        `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  }
};
