// src/hooks/useAsyncRequest.ts
import { useState, useCallback } from 'react';

export function useAsyncRequest<T>(requestFn: (...args: any[]) => Promise<T>) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	const execute = useCallback(
		async (...args: any[]) => {
			setLoading(true);
			setError(null);
			try {
				const result = await requestFn(...args);
				setData(result);
				return result;
			} catch (err: any) {
				setError(err?.response?.data?.message || 'Something went wrong');
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[requestFn]
	);

	return { loading, error, data, execute };
}
