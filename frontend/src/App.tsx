import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/auth/AuthPage';
import NgoDashboard from './pages/ngo/NgoDashboard';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import ProfilePage from './pages/common/ProfilePage';
import HistoryPage from './pages/common/HistoryPage';
import DonationDetailsPage from './pages/common/DonationDetailsPage';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes (Wrapped in DashboardLayout) */}
          <Route element={<DashboardLayout />}>
            <Route path="/ngo-dashboard" element={<NgoDashboard />} />
            <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/history/:id" element={<DonationDetailsPage />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
