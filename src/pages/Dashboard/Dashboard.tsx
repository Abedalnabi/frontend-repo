// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { getMyProperties } from '../../api/rest-api';
import type { Property } from '../../types/property';
import { useToast } from '../../hooks';
import { Link } from 'react-router-dom';
import { Header, LoadingSpinner, PropertyCard } from '../../components';
import { useAuthStore } from '../../store/useAuthStore';

const DashboardPage = () => {
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);
	const toast = useToast();
	const { initialized, token } = useAuthStore();

	useEffect(() => {
		if (!initialized || !token) return;

		const fetchData = async () => {
			try {
				const data = await getMyProperties();
				setProperties(data);
			} catch {
				toast.error('Failed to fetch properties');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [initialized, token]);

	return (
		<div className="bg-gray-100 dark:bg-gray-900">
			<Header />
			<main className="max-w-4xl mx-auto mt-10 px-4">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">My Properties</h2>
					<Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
						+ Add Property
					</Link>
				</div>

				{loading && <LoadingSpinner />}
				{!loading && properties.length === 0 && <p>You have no properties yet.</p>}
				{!loading && properties.length > 0 && (
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
