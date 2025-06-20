import { z } from 'zod';

export const propertySchema = z.object({
	title: z.string().min(3, 'Title is required'),
	description: z.string().min(10, 'Description is too short'),
	price: z.coerce.number().min(0, 'Price must be a positive number'),
	location: z.string().min(3, 'Location is required'),
});

export type CreatePropertyFormData = z.infer<typeof propertySchema>;
