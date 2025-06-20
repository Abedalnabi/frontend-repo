const FormError = ({ message }: { message: string }) => (
	<p className="text-sm text-red-600 bg-red-100 dark:bg-red-800/20 p-2 rounded text-center"> {message}</p>
);

export default FormError;
