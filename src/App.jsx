import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import RequestDemoPage from './pages/public/RequestDemoPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';

import ServicesPage from './pages/public/ServicesPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import PatentDetail from './pages/dashboard/PatentDetailPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/demo" element={<RequestDemoPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
         
          <Route path="/cases/:id" element={<PatentDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/patent-detail" element={<PatentDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
