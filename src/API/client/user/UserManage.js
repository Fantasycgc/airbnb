import { apiInstance } from "@/config/axios.config.js"

export const USERAPI = {
    getUserApi: async () => {
        try {
            const { data } = await apiInstance().get(
                'https://airbnbnew.cybersoft.edu.vn/api/users'
            );
            console.log('getUser', data);
            return data;
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }
}