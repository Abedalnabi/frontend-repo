import { useState } from 'react';

interface ConfirmDialogProps {
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	children: React.ReactNode;
}

const ConfirmDialog = ({
	title = 'Are you sure?',
	description = 'This action cannot be undone.',
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	children,
}: ConfirmDialogProps) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};

	return (
		<>
			<span onClick={() => setOpen(true)}>{children}</span>

			{open && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
						<h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h2>
						<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
						<div className="flex justify-center gap-4">
							<button
								onClick={() => setOpen(false)}
								className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
							>
								{cancelText}
							</button>
							<button onClick={handleConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
								{confirmText}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ConfirmDialog;
