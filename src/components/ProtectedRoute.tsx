import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;
}

const ProtectedRoute = ({ children, redirectTo = '/login' }: ProtectedRouteProps) => {
	const { token } = useAuthStore();

	if (!token) {
		return <Navigate to={redirectTo} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
