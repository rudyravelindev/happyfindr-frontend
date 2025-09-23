import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './Signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
<<<<<<< HEAD

  const [avatar, setAvatar] = useState(null); // base64 avatar
  const [avatarFileName, setAvatarFileName] = useState(''); // filename for feedback
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
=======
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
>>>>>>> 7750dd0 (creating the signup and login pages)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle avatar selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFileName(file.name); // show filename in signup form

    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result); // store base64 for localStorage
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
=======
  const handleSubmit = async (e) => {
    e.preventDefault();

>>>>>>> 7750dd0 (creating the signup and login pages)
    if (!validateForm()) return;

    try {
      setLoading(true);
<<<<<<< HEAD

      // Prepare user data for registration
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar, // store base64 avatar
      };

      await register(userData);

      // Save avatar in localStorage for later use
      if (avatar) localStorage.setItem('userAvatar', avatar);

      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: error.message || 'Failed to create account. Please try again.',
      });
    } finally {
      setLoading(false);
=======
      await signup(formData.email, formData.password, {
        name: formData.name,
      });
      navigate('/items');
    } catch (error) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
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
>>>>>>> 7750dd0 (creating the signup and login pages)
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__header">
          <h2 className="signup__title">Create Your Account</h2>
          <p className="signup__subtitle">
            Join HappyFindr and never lose your belongings again
          </p>
        </div>

        {errors.submit && <ErrorMessage message={errors.submit} type="error" />}

        <form onSubmit={handleSubmit} className="signup__form" noValidate>
<<<<<<< HEAD
          {/* Full Name */}
=======
>>>>>>> 7750dd0 (creating the signup and login pages)
          <div className="signup__form-group">
            <label htmlFor="name" className="signup__label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`signup__input ${
                errors.name ? 'signup__input--error' : ''
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && (
              <span className="signup__error">{errors.name}</span>
            )}
          </div>

<<<<<<< HEAD
          {/* Email */}
=======
>>>>>>> 7750dd0 (creating the signup and login pages)
          <div className="signup__form-group">
            <label htmlFor="email" className="signup__label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`signup__input ${
                errors.email ? 'signup__input--error' : ''
              }`}
              placeholder="Enter your email address"
              required
            />
            {errors.email && (
              <span className="signup__error">{errors.email}</span>
            )}
          </div>

<<<<<<< HEAD
          {/* Password */}
=======
>>>>>>> 7750dd0 (creating the signup and login pages)
          <div className="signup__form-group">
            <label htmlFor="password" className="signup__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`signup__input ${
                errors.password ? 'signup__input--error' : ''
              }`}
              placeholder="Create a password (min. 6 characters)"
              required
            />
            {errors.password && (
              <span className="signup__error">{errors.password}</span>
            )}
          </div>

<<<<<<< HEAD
          {/* Confirm Password */}
=======
>>>>>>> 7750dd0 (creating the signup and login pages)
          <div className="signup__form-group">
            <label htmlFor="confirmPassword" className="signup__label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`signup__input ${
                errors.confirmPassword ? 'signup__input--error' : ''
              }`}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && (
              <span className="signup__error">{errors.confirmPassword}</span>
            )}
          </div>

<<<<<<< HEAD
          {/* Avatar Upload */}
          <div className="signup__avatar-group">
            <label htmlFor="avatar" className="signup__label">
              Profile Picture
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            {avatarFileName && <p>Selected file: {avatarFileName}</p>}
          </div>
          {/* Submit Button */}
=======
>>>>>>> 7750dd0 (creating the signup and login pages)
          <button type="submit" className="signup__button" disabled={loading}>
            {loading ? <LoadingSpinner size="small" /> : 'Create Account'}
          </button>
        </form>

        <div className="signup__footer">
          <p className="signup__login-text">
            Already have an account?{' '}
            <Link to="/login" className="signup__login-link">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
