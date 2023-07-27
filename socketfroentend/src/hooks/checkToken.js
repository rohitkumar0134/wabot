import axios from 'axios';
import { checkToken_url } from '../contants/const';
const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const checkToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      const response = await axios.post(checkToken_url, { token });
      console.log(response.data.valid);
      if (!response.data.valid) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  } catch (err) {
    console.error(err);
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};
