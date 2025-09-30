import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Items from './components/Items.jsx';
import RegisterItem from './components/RegisterItem.jsx';
import Profile from './components/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="app__home">
                <Hero />
                <Features />
                <Testimonials />
                <CTA />
              </div>
            }
          />
          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard Routes - Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Items />} />
            <Route path="items" element={<Items />} />
            <Route path="register-item" element={<RegisterItem />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
