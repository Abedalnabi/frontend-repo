// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard/Dashboard';
import { ProtectedRoute } from './components';
import { useAutoLogin } from './hooks';
// import CreatePropertyPage from './pages/Create';
import EditPropertyPage from './pages/Dashboard/section/EditProperty';

function App() {
	useAutoLogin();
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				{/* <Route path="/create" element={<CreatePropertyPage />} /> */}
				<Route
					path="/edit/:id"
					element={
						<ProtectedRoute>
							<EditPropertyPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
			{/* Footer */}
		</Router>
	);
}

export default App;
