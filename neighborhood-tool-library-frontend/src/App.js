import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import Navigate here
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
// import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ToolCatalog from './pages/ToolCatalog';
import ToolDetail from './pages/ToolDetail';
import ReservationsDashboard from './pages/ReservationsDashboard';
import AdminPanel from './pages/AdminPanel';
// import ReviewSection from './components/ReviewSection';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />


        {/* Protected Routes */}
        {/* <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} /> */}
        <Route path="/tools" element={<ProtectedRoute component={ToolCatalog} />} />
        <Route path="/tools/:id" element={<ProtectedRoute component={ToolDetail} />} />
        {/* <Route path="/tools/:id/review" element={<ProtectedRoute component={ReviewSection} />} /> */}
        <Route path="/reservations" element={<ProtectedRoute component={ReservationsDashboard} />} />
        <Route path="/admin" element={<ProtectedRoute component={AdminPanel} />} />
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
