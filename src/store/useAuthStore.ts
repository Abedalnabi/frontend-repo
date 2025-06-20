import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { AuthState, AuthActions } from '../types/auth';

export const useAuthStore = create<AuthState & AuthActions>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				token: null,
				setAuth: (user, token) => set({ user, token }, false, 'setAuth'),
				logout: () => set({ user: null, token: null }, false, 'logout'),
			}),
			{
				name: 'auth-storage',
			}
		),
		{ name: 'AuthStore' }
	)
);
