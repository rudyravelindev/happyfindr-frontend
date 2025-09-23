import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setErrors({});
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Failed to log in. Please check your credentials.' });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h2 className="login__title">Welcome Back</h2>
          <p className="login__subtitle">Sign in to your HappyFindr account</p>
        </div>

        {errors.submit && <ErrorMessage message={errors.submit} type="error" />}

        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <div className="login__form-group">
            <label htmlFor="email" className="login__label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`login__input ${
                errors.email ? 'login__input--error' : ''
              }`}
              placeholder="Enter your email address"
              required
            />
            {errors.email && (
              <span className="login__error">{errors.email}</span>
            )}
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
              className={`login__input ${
                errors.password ? 'login__input--error' : ''
              }`}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <span className="login__error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? <LoadingSpinner size="small" /> : 'Log In'}
          </button>
        </form>

        <div className="login__footer">
          <p className="login__signup-text">
            Don't have an account?{' '}
            <Link to="/signup" className="login__signup-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
