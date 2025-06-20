import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { AuthState, AuthActions } from '../types/auth';

export const useAuthStore = create<AuthState & AuthActions>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				token: null,
				initialized: false,
				setAuth: (user, token) => set({ user, token, initialized: true }, false, 'setAuth'),
				logout: () => set({ user: null, token: null, initialized: true }, false, 'logout'),
			}),
			{
				name: 'auth-storage',
				onRehydrateStorage: () => (state?: AuthState & AuthActions) => {
					if (state) {
						state.initialized = true;
					}
				},
			}
		),
		{ name: 'AuthStore' }
	)
);
