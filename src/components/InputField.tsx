import type { FieldError } from 'react-hook-form';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: FieldError;
}

const InputField = ({ label, error, ...rest }: InputFieldProps) => {
	return (
		<div className="mb-4">
			<label className="block mb-1 font-medium">{label}</label>
			<input
				{...rest}
				className={`
          w-full border px-3 py-2 rounded text-black
          placeholder-gray-400 bg-white
          dark:bg-white dark:placeholder-gray-400 dark:text-black
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition duration-200
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};

export default InputField;
