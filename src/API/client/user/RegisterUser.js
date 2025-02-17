import { apiInstance } from "@/config/axios.config.js"
const baseUrl = 'https://airbnbnew.cybersoft.edu.vn/api/auth/signup'
export const SIGNUPUSERAPI = {
    AddUserApi: async (formData) => {
        const { name, email, password } = formData;
        try {
            const data = await apiInstance().post(`${baseUrl}/`, {
                name, email, password
            }
            );
            console.log(data)
            // console.log('getUser', data);
            return data;
        } catch (error) {

            console.error("Error fetching location:", error);
        }
    }
}