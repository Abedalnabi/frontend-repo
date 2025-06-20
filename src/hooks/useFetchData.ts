// src/hooks/useFetchData.ts
import { useEffect, useState } from 'react';

export function useFetchData<T>(fetchFn: () => Promise<T>, dependencies: React.DependencyList = []) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setLoading(true);
			try {
				const result = await fetchFn();
				if (isMounted) {
					setData(result);
				}
			} catch (err) {
				if (isMounted) {
					console.error('Error fetching data:', err);
					setError('Something went wrong');
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, dependencies);

	return { data, loading, error };
}
