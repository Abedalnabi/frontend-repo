import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import { propertySchema, type CreatePropertyFormData } from '../../../utils';
import { getPropertyById, updateProperty } from '../../../api/rest-api/property';
import { useToast, useAsyncRequest } from '../../../hooks';
import { Header, InputField, LoadingButton, FormError } from '../../../components';

const formClass =
	'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg space-y-6';

const EditPropertyPage = () => {
	const { id } = useParams();
	const toast = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<CreatePropertyFormData>({
		resolver: zodResolver(propertySchema),
	});

	const { execute: fetchProperty, error: fetchError } = useAsyncRequest(getPropertyById);
	const { execute: submitUpdate, loading, error: updateError } = useAsyncRequest(updateProperty);

	useEffect(() => {
		if (!id) return;

		const loadProperty = async () => {
			try {
				const property = await fetchProperty(Number(id));
				setValue('title', property.title);
				setValue('description', property.description);
				setValue('price', property.price);
				setValue('location', property.location);
			} catch {
				toast.error('Failed to load property');
				navigate('/dashboard');
			}
		};

		loadProperty();
	}, [id, fetchProperty, setValue, navigate]);

	const onSubmit = async (data: CreatePropertyFormData) => {
		try {
			await submitUpdate(Number(id), data);
			toast.success('Property updated');
			navigate('/dashboard');
		} catch {
			// error handled in hook
		}
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
			<Header />
			<div className="flex items-start justify-center pt-20 px-4">
				<form onSubmit={handleSubmit(onSubmit)} className={formClass}>
					<h2 className="text-2xl font-bold text-center">Edit Property 🛠️</h2>

					{fetchError && <FormError message={fetchError} />}
					{updateError && <FormError message={updateError} />}

					<InputField label="Title" type="text" {...register('title')} error={errors.title} />
					<InputField label="Description" type="text" {...register('description')} error={errors.description} />
					<InputField label="Price (USD)" type="number" {...register('price')} error={errors.price} />
					<InputField label="Location" type="text" {...register('location')} error={errors.location} />

					<LoadingButton type="submit" loading={loading}>
						Update Property
					</LoadingButton>
				</form>
			</div>
		</div>
	);
};

export default EditPropertyPage;
