import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import NgoDashboard from './pages/ngo/NgoDashboard';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/ngo-dashboard" element={<NgoDashboard />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
