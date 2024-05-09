import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
});

// Intercepta requisições para adicionar o token
axiosInstance.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    console.log(authStore)
    const token = authStore.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepta respostas para tratar o erro 401
axiosInstance.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        const authStore = useAuthStore();
        authStore.clearToken();
        // Redirecione para a página de login aqui
        // window.location = '/login';
    }
    return Promise.reject(error);
});

const cepAxios = axios.create({
    baseURL: 'https://api.iziwork.com.br/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;
export { cepAxios };