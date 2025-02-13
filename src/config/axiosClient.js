import axios from 'axios';
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MyIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0ODkwODgwMDAwMCIsIm5iZiI6MTcyMTkyNjgwMCwiZXhwIjoxNzQ5MDU2NDAwfQ.4vXhg2MxiO2LMiVclRYdrEmoivaG2QbYXjyqWf9mxGk";

const axiosInstance = axios.create({
    baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
    withCredentials: true,
    headers: {
        // ...settings.headers,
        TokenCybersoft: TOKEN_CYBERSOFT,
        // Authorization: AUTHORIZATION,
    },
});

export default axiosInstance;
