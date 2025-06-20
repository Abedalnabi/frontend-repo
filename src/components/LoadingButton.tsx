// src/components/LoadingButton.tsx
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading: boolean;
	children: React.ReactNode;
}

const LoadingButton = ({ loading, children, ...props }: Props) => (
	<button
		{...props}
		disabled={loading || props.disabled}
		className={`w-full bg-indigo-600 text-white py-2 rounded-lg transition-colors duration-300 font-medium ${
			loading ? 'opacity-70' : 'hover:bg-indigo-700'
		} disabled:opacity-50`}
	>
		{loading ? <span className="animate-pulse">Logging in...</span> : children}
	</button>
);

export default LoadingButton;
