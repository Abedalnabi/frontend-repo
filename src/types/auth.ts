// types/auth.ts
export interface User {
	id: number;
	name: string;
	email: string;
}

export interface AuthState {
	user: User | null;
	initialized: boolean;
	token: string | null;
}

export interface AuthActions {
	setAuth: (user: User, token: string) => void;
	logout: () => void;
}

export interface AuthResponse {
	access_token: string;
	user: User;
}

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

export interface LoginInput {
	email: string;
	password: string;
}
