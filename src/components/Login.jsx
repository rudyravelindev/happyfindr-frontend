import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({ submit: 'Please enter email and password' });
      return;
    }

    try {
      setLoading(true);

      // Login reads from happyfindr_users
      await login(formData.email, formData.password);

      navigate('/dashboard/profile');
    } catch (error) {
      setErrors({ submit: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Log In</h2>

        {errors.submit && <ErrorMessage message={errors.submit} type="error" />}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__form-group">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login__input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login__form-group">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login__input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? <LoadingSpinner size="small" /> : 'Log In'}
          </button>
        </form>

        <p className="login__signup-text">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
