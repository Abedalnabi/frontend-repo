import api from '../axios';
import type { Property } from '../../types/property';
import type { CreatePropertyFormData } from '../../utils/index';

export const getMyProperties = async (): Promise<Property[]> => {
	const response = await api.get<Property[]>('/properties');
	return response.data;
};

export const deleteProperty = async (id: number) => {
	const response = await api.delete(`/properties/${id}`);
	return response.data;
};

export const getPropertyById = async (id: number): Promise<Property> => {
	const response = await api.get(`/properties/${id}`);
	return response.data;
};

export const updateProperty = async (id: number, data: CreatePropertyFormData): Promise<Property> => {
	const response = await api.patch(`/properties/${id}`, data);
	return response.data;
};

export const createProperty = async (data: CreatePropertyFormData): Promise<Property> => {
	const response = await api.post('/properties', data);
	return response.data;
};
