import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import Navigate here
import Layout from './components/Layout';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
// import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ToolCatalog from './pages/ToolCatalog';
import ToolDetail from './pages/ToolDetail';
import ReservationsDashboard from './pages/ReservationsDashboard';
import AdminPanel from './pages/AdminPanel';
import About from './pages/About';
// import ReviewSection from './components/ReviewSection';

const App = () => {
  return (
    <Router>
      <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        {/* <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} /> */}
        <Route path="/tools" element={<ToolCatalog />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        {/* <Route path="/tools/:id/review" element={<ProtectedRoute component={ReviewSection} />} /> */}
        <Route path="/reservations" element={<ProtectedRoute component={ReservationsDashboard} />} />
        <Route path="/admin" element={<ProtectedRoute component={AdminPanel} />} />
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/tools" />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
