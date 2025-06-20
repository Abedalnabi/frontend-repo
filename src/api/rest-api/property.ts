import api from '../axios';
import type { Property } from '../../types/property';

export const getMyProperties = async (): Promise<Property[]> => {
	const response = await api.get<Property[]>('/properties');
	return response.data;
};
