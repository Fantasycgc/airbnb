import { apiInstance } from "@/config/axios.config.js"
const baseUrl = 'https://airbnbnew.cybersoft.edu.vn/api/auth/signin'
export const SIGNINUSERAPI = {
    LoginUserApi: async (formData) => {
        const { email, password } = formData;
        try {
            const data = await apiInstance().post(`${baseUrl}/`, {
                email, password
            }
            );
            console.log(data)
            // console.log('getUser', data);
            return data;
        } catch (error) {

            console.error("Error fetching data:", error);
        }
    }
}