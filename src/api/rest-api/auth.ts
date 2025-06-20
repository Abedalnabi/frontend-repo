// src/rest-api/auth.ts
import api from '../axios';

import type { AuthResponse, RegisterInput, LoginInput, User } from '../../types/auth';

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>('/auth/register', data);
	return response.data;
};

export const login = async (data: LoginInput): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>('/auth/login', data);
	return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
	const response = await api.get<User>('/auth/me');
	return response.data;
};
