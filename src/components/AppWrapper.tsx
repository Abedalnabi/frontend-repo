// src/components/AppWrapper.tsx
import type { ReactNode } from 'react';

const AppWrapper = ({ children }: { children: ReactNode }) => {
	return <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">{children}</div>;
};

export default AppWrapper;
