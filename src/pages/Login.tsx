// src/pages/Login.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../utils/index';
import { login } from '../api/rest-api';
import { useAuthStore } from '../store/useAuthStore';
import { setAuthToken } from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

import { FormError, LoadingButton, InputField, AppWrapper } from '../components';

import { useToast } from '../hooks';

import type { AxiosError } from 'axios';

const formClass =
	'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6';

const LoginPage = () => {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const setAuth = useAuthStore((state) => state.setAuth);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const onSubmit = useCallback(
		async (data: LoginFormData) => {
			try {
				setLoading(true);
				const response = await login(data);
				setAuth(response.user, response.access_token);
				setAuthToken(response.access_token);

				toast.success('Login successful! Redirecting...');

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
					<h2 className="text-3xl font-bold">Welcome Back 👋</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">Login to your account</p>
				</div>

				{errorMsg && <FormError message={errorMsg} />}

				<InputField label="Email" type="email" {...register('email')} error={errors.email} />
				<InputField label="Password" type="password" {...register('password')} error={errors.password} />

				<LoadingButton type="submit" loading={loading}>
					Login
				</LoadingButton>

				<p className="text-sm text-center text-gray-500 dark:text-gray-400">
					Don't have an account?{' '}
					<Link to="/register" className="text-indigo-600 hover:underline dark:text-indigo-400">
						Register
					</Link>
				</p>
			</form>
		</AppWrapper>
	);
};

export default LoginPage;
