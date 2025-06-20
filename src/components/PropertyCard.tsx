import { Link } from 'react-router-dom';
import type { Property } from '../types/property';

const PropertyCard = ({ prop }: { prop: Property }) => (
	<div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col gap-2">
		<div className="flex justify-between items-center">
			<h3 className="text-lg font-semibold">{prop.title}</h3>
			<span className="text-sm text-gray-500">{new Date(prop.createdAt).toLocaleDateString()}</span>
		</div>
		<p className="text-gray-600 dark:text-gray-300">{prop.description}</p>
		<p className="font-medium text-indigo-600 dark:text-indigo-400">Location: {prop.location}</p>
		<p className="font-medium">Price: ${prop.price}</p>
		<div className="flex gap-2 mt-2">
			<Link to={`/edit/${prop.id}`} className="text-sm text-blue-600 hover:underline">
				Edit
			</Link>
			{/* Delete button can be added here */}
		</div>
	</div>
);

export default PropertyCard;
