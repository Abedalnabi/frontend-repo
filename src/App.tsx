// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
// import DashboardPage from './pages/Dashboard';
// import CreatePropertyPage from './pages/Create';
// import EditPropertyPage from './pages/Edit';
function App() {
	return (
		<Router>
			{/* Nav Bar */}
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* <Route path="/dashboard" element={<DashboardPage />} /> */}
				{/* <Route path="/create" element={<CreatePropertyPage />} /> */}
				{/* <Route path="/edit/:id" element={<EditPropertyPage />} /> */}
			</Routes>
			{/* Footer */}
		</Router>
	);
}

export default App;
