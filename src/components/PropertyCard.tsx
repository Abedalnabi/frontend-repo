import { Link } from 'react-router-dom';
import type { Property } from '../types/property';
import ConfirmDialog from './ConfirmDialog';

interface Props {
	prop: Property;
	onDelete?: (id: number) => void;
}

const PropertyCard = ({ prop, onDelete }: Props) => (
	<div className="bg-white dark:bg-[#1e293b] hover:dark:bg-[#334155] p-6 rounded-xl shadow-md transition-colors duration-200">
		<div className="flex justify-between items-start">
			<h3 className="text-lg font-semibold text-gray-800 dark:text-white">{prop.title}</h3>
			<span className="text-sm text-gray-500 dark:text-gray-400">{new Date(prop.createdAt).toLocaleDateString()}</span>
		</div>

		<p className="text-gray-700 dark:text-gray-300 mt-1">{prop.description}</p>

		<p className="mt-2 text-gray-600 dark:text-gray-300">
			<span className="font-semibold text-blue-600 dark:text-blue-400">Location:</span> {prop.location}
		</p>

		<p className="text-gray-600 dark:text-gray-300">
			<span className="font-semibold">Price:</span> ${prop.price}
		</p>

		<div className="flex gap-4 mt-3">
			<Link to={`/edit/${prop.id}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
				Edit
			</Link>

			<ConfirmDialog
				onConfirm={() => onDelete?.(prop.id)}
				title="Delete Property"
				description="Are you sure you want to delete this property? This action cannot be undone."
				confirmText="Delete"
				cancelText="Cancel"
			>
				<button className="text-sm text-red-600 hover:underline">Delete</button>
			</ConfirmDialog>
		</div>
	</div>
);

export default PropertyCard;
