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
<<<<<<< HEAD
import Dashboard from './components/Dashboard.jsx';
import Items from './components/Items.jsx';
import RegisterItem from './components/RegisterItem.jsx';
import Profile from './components/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
=======
>>>>>>> 7750dd0 (creating the signup and login pages)

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
<<<<<<< HEAD
          {/* Home Route */}
=======
          {' '}
>>>>>>> 7750dd0 (creating the signup and login pages)
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Testimonials />
                <CTA />
              </>
            }
          />
<<<<<<< HEAD

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
=======
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
>>>>>>> 7750dd0 (creating the signup and login pages)
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
