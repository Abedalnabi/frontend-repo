// src/api/axios.ts
import axios from 'axios';

let token: string | null = null;

export const setAuthToken = (newToken: string | null) => {
	token = newToken;
	if (newToken) {
		localStorage.setItem('token', newToken);
	} else {
		localStorage.removeItem('token');
	}
};

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(new Error(error.message ?? 'Request error'));
	}
);

export default api;
