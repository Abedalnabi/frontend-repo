import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { getCurrentUser } from '../api/rest-api/auth';
import { setAuthToken } from '../api/axios';

export const useAutoLogin = () => {
	const { token, user, setAuth, initialized } = useAuthStore();

	useEffect(() => {
		if (!initialized || !token || !user) return;

		const tokenFromStorage = localStorage.getItem('token');
		if (!tokenFromStorage) return;
		setAuthToken(tokenFromStorage);

		getCurrentUser()
			.then((user) => {
				setAuth(user, tokenFromStorage);
			})
			.catch(() => {
				setAuthToken(null);
			});
	}, [initialized]);
};
