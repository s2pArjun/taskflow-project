import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor: auto-attach Bearer token from memory (set externally)
let _token = null;
export const setAuthToken = (token) => { _token = token; };
export const clearAuthToken = () => { _token = null; };

api.interceptors.request.use((config) => {
  if (_token) config.headers.Authorization = `Bearer ${_token}`;
  return config;
});

// Interceptor: normalize error messages from our { success, message } shape
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong.';
    return Promise.reject(new Error(message));
  }
);

export default api;
