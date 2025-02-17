import { apiInstance } from "../../config/axios.config";

export const USERAPI = {
  getUserApi: async () => {
    try {
      const response = await apiInstance().get(
        "https://airbnbnew.cybersoft.edu.vn/api/users"
      );
      return response.data.content;
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  },
  createUserApi: async (user) => {
    try {
      const response = await apiInstance().post(
        "https://airbnbnew.cybersoft.edu.vn/api/users",
        user
      );
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },
  getDetailUserApi: async (id) => {
    try {
      const response = await apiInstance().get(
        `https://airbnbnew.cybersoft.edu.vn/api/users/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  },
  updateUserApi: async (user) => {
    try {
      const response = await apiInstance().put(
        `https://airbnbnew.cybersoft.edu.vn/api/users/${user.id}`,
        user
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
  deleteUserApi: async (id) => {
    try {
      const response = await apiInstance().delete(
        `https://airbnbnew.cybersoft.edu.vn/api/users?id=${id}`
      );
      console.log(response, "123");

      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};
