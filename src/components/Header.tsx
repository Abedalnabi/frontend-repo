import { Link } from 'react-router-dom';
import { useLogout } from '../hooks';
import { useAuthStore } from '../store/useAuthStore';

const Header = () => {
	const { user } = useAuthStore();
	const logout = useLogout();

	return (
		<header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
			<h1 className="text-xl font-bold">
				<Link to="/dashboard">🏡 Property Manager</Link>
			</h1>
			<div className="flex items-center gap-4">
				{user && <span>Hi, {user.name}</span>}
				<button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
					Log out
				</button>
			</div>
		</header>
	);
};

export default Header;
