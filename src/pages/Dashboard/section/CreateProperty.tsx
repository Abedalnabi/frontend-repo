import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { propertySchema, type CreatePropertyFormData } from '../../../utils';
import { createProperty } from '../../../api/rest-api';
import { useToast, useAsyncRequest } from '../../../hooks';
import { Header, InputField, LoadingButton, FormError } from '../../../components';

const formClass =
	'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg space-y-6';

const CreatePropertyPage = () => {
	const toast = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreatePropertyFormData>({
		resolver: zodResolver(propertySchema),
	});

	const { execute: submitCreate, loading, error } = useAsyncRequest(createProperty);

	const onSubmit = async (data: CreatePropertyFormData) => {
		try {
			await submitCreate(data);
			toast.success('Property created successfully!');
			navigate('/dashboard');
		} catch {
			// error handled inside hook
		}
	};

	return (
		<div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
			<Header />
			<div className="flex items-start justify-center pt-20 px-4">
				<form onSubmit={handleSubmit(onSubmit)} className={formClass}>
					<h2 className="text-2xl font-bold text-center">Add New Property 🏠</h2>

					{error && <FormError message={error} />}

					<InputField label="Title" type="text" {...register('title')} error={errors.title} />
					<InputField label="Description" type="text" {...register('description')} error={errors.description} />
					<InputField label="Price (USD)" type="number" {...register('price')} error={errors.price} />
					<InputField label="Location" type="text" {...register('location')} error={errors.location} />

					<div className="flex justify-between gap-4">
						<LoadingButton type="submit" loading={loading}>
							Create Property
						</LoadingButton>
						<button
							type="button"
							onClick={() => navigate('/dashboard')}
							className="px-4 py-2 rounded border text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreatePropertyPage;
