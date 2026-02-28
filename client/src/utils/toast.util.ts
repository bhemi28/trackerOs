import type { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


export const showToast = (status: AxiosResponse['status'], data: any, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    // if we got the response then

    switch (status) {
      case 401:
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        break;
      case 403:
      case 404:
      case 400:
      case 500:
        toast.error(data?.error || data?.message || "An unexpected error occurred."); // This handles most UI feedback
        break;
      default:
        toast.error("An unexpected error occurred.");
    }
};