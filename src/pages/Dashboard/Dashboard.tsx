// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Header, LoadingSpinner, PropertyCard } from '../../components';
import { useFetchData } from '../../hooks/useFetchData';
import { getMyProperties } from '../../api/rest-api';
import type { Property } from '../../types/property';
import { useToast } from '../../hooks';

const DashboardPage = () => {
	const { initialized, token } = useAuthStore();
	const navigate = useNavigate();
	const toast = useToast();

	const { data: properties, loading, error } = useFetchData<Property[]>(getMyProperties, [initialized, token]);

	useEffect(() => {
		if (initialized && !token) {
			navigate('/login');
		}
	}, [initialized, token, navigate]);

	useEffect(() => {
		if (error) toast.error('Failed to fetch properties');
	}, [error]);

	return (
		<div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
			<Header />
			<main className="max-w-4xl mx-auto mt-10 px-4">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">My Properties</h1>
					<Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
						+ Add Property
					</Link>
				</div>

				{loading ? (
					<LoadingSpinner />
				) : !properties || properties.length === 0 ? (
					<p>You have no properties yet.</p>
				) : (
					<div className="grid gap-4">
						{properties.map((prop) => (
							<PropertyCard key={prop.id} prop={prop} />
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;
