import axios, { AxiosError } from 'axios';
import { showToast } from '../utils/toast.util';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// request interceptor to add auth token when it gets implemented

//response interceptor to handle global errors
axiosClient.interceptors.response.use(
    (response) => {
        // You can add global success handling here if needed
        showToast(response.status, "data fetched successfully.", 'success');
        return response;
    },
    (error) => {
        showToast(error.response?.status || 500, error.response?.data || {}, 'error');
        console.error('Global error occurred:', error);
        return Promise.reject(error);
    }
)

export default axiosClient;
