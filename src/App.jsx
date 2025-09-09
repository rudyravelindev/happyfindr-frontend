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

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          {' '}
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
