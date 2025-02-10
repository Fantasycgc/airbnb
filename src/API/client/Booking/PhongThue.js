import { apiInstance } from "@/config/axios.config.js"
const baseUrl = 'https://airbnbnew.cybersoft.edu.vn/api'
export const ROOMAPI = {
    getRoomApi: async () => {
        try {
            const { data } = await apiInstance().get(
                `${baseUrl}/phong-thue`
            );
            console.log('getrooom', data)
            return data;
        } catch (error) {
            console.error("Error fetching location:", error);
        }

    },
    getRoomByID: async (id) => {
        try {
            const { data } = await apiInstance().get(
                `${baseUrl}/phong-thue/${id}`
            );
            console.log('getrooom', data)
            return data;
        } catch (error) {
            console.error("Error fetching location:", error);
        }

    }

}