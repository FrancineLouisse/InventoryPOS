import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Inventory from '../../pages/Inventory/Inventory';
import Purchase from '../../pages/Purchase/Purchase';
import Loader from '../Loaders/loader'
import Employees from '../../pages/Employees/Employees'
import Customer from '../../pages/Customer/Customer'

// Placeholder pages for routes not yet built
const ComingSoon = ({ page }) => (
  <div style={{
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    height: '60vh', fontFamily: 'Barlow, sans-serif', color: '#9CA3AF'
  }}>
    <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>{page}</h2>
    <p style={{ fontSize: 14 }}>This page is coming soon.</p>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
        />
        <Route
          path="/inventory"
          element={<Layout><Inventory /></Layout>}
        />
        <Route
          path="/purchase"
          element={<Layout><Purchase /></Layout>}
        />
        <Route
          path="/sales"
          element={<Layout><ComingSoon page="Sales" /></Layout>}
        />
        <Route
          path="/customers"
          element={<Layout><Customer /></Layout>}
        />
        <Route
          path="/employees"
          element={<Layout><Employees /></Layout>}
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;