import { useAuthStore } from '../store/useAuthStore';
import { setAuthToken } from '../api/axios';

export const useLogout = () => {
	const logout = useAuthStore((state) => state.logout);

	return () => {
		logout();
		setAuthToken(null);
	};
};
