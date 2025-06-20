import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Header, LoadingSpinner, PropertyCard } from '../../components';
import { useFetchData } from '../../hooks/useFetchData';
import { getMyProperties } from '../../api/rest-api';
import { deleteProperty } from '../../api/rest-api/property';
import type { Property } from '../../types/property';
import { useToast } from '../../hooks';

const DashboardPage = () => {
	const { initialized, token } = useAuthStore();
	const navigate = useNavigate();
	const toast = useToast();

	const shouldFetch = initialized && token;
	const { data, loading, error } = useFetchData<Property[]>(getMyProperties, [shouldFetch]);

	const [properties, setProperties] = useState<Property[]>([]);

	useEffect(() => {
		if (!initialized) return;
		if (!token) navigate('/login');
	}, [initialized, token, navigate]);

	useEffect(() => {
		if (data) setProperties(data);
	}, [data]);

	useEffect(() => {
		if (error) toast.error('Failed to fetch properties');
	}, [error, toast]);

	const handleDelete = async (id: number) => {
		try {
			await deleteProperty(id);
			toast.success('Property deleted');
			setProperties((prev) => prev.filter((p) => p.id !== id));
		} catch {
			toast.error('Failed to delete property');
		}
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
			<Header />
			<main className="max-w-4xl mx-auto mt-10 px-4">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Properties</h1>
					<Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
						+ Add Property
					</Link>
				</div>

				{loading && <LoadingSpinner />}
				{!loading && properties.length === 0 && (
					<p className="text-gray-700 dark:text-gray-300">You have no properties yet.</p>
				)}
				{!loading && properties.length > 0 && (
					<div className="grid gap-4">
						{properties.map((prop) => (
							<PropertyCard key={prop.id} prop={prop} onDelete={handleDelete} />
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export default DashboardPage;
