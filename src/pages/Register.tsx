import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../utils/index';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FormError, LoadingButton, InputField, AppWrapper } from '../components';

import { register as registerUser } from '../api/rest-api';
import { setAuthToken } from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';

import { useLogout, useToast } from '../hooks';

import type { AxiosError } from 'axios';

const formClass =
	'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6';

const RegisterPage = () => {
	const toast = useToast();
	const logout = useLogout();
	const { user } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	useEffect(() => {
		if (!user) return;
		logout();
	}, [logout, user]);

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const setAuth = useAuthStore((state) => state.setAuth);
	const navigate = useNavigate();

	const onSubmit = useCallback(
		async (data: RegisterFormData) => {
			try {
				setLoading(true);
				const response = await registerUser(data);
				setAuth(response.user, response.access_token);
				setAuthToken(response.access_token);

				toast.success('Registration successful! Redirecting...');

				setTimeout(() => {
					navigate('/dashboard');
				}, 2000);
			} catch (error) {
				const err = error as AxiosError<{ message: string }>;
				setErrorMsg(err.response?.data?.message ?? 'Registration failed');
			} finally {
				setLoading(false);
			}
		},
		[navigate, setAuth, toast]
	);

	return (
		<AppWrapper>
			<form onSubmit={handleSubmit(onSubmit)} className={formClass}>
				<div className="text-center">
					<h2 className="text-3xl font-bold">Create an Account ✨</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">Register to continue</p>
				</div>

				{errorMsg && <FormError message={errorMsg} />}

				<InputField label="Name" type="text" {...register('name')} error={errors.name} />
				<InputField label="Email" type="email" {...register('email')} error={errors.email} />
				<InputField label="Password" type="password" {...register('password')} error={errors.password} />

				<LoadingButton type="submit" loading={loading}>
					Register
				</LoadingButton>

				<p className="text-sm text-center text-gray-500 dark:text-gray-400">
					Already have an account?{' '}
					<Link to="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
						Login
					</Link>
				</p>
			</form>
		</AppWrapper>
	);
};

export default RegisterPage;
