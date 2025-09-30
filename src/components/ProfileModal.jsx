import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import './ProfileModal.css';
import PropTypes from 'prop-types';

export default function ProfileModal({ isOpen, onClose }) {
  const { currentUser, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      });
      setIsEditing(false);
      setSuccess('');
    }
  }, [isOpen, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'January 2024';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal__header">
          <h2 className="profile-modal__title">My Profile</h2>
          <button className="profile-modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="profile-modal__content">
          {currentUser ? (
            <>
              <div className="profile-modal__avatar-section">
                <div className="profile-modal__avatar">
                  {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="profile-modal__avatar-info">
                  <h3 className="profile-modal__name">
                    {currentUser?.name || 'User'}
                  </h3>
                  <p className="profile-modal__email">
                    {currentUser?.email || 'No email'}
                  </p>
                </div>
              </div>

              {success && (
                <div className="profile-modal__success">{success}</div>
              )}

              {!isEditing ? (
                <div className="profile-modal__info">
                  <div className="profile-modal__info-item">
                    <span className="profile-modal__info-label">
                      Full Name:
                    </span>
                    <span className="profile-modal__info-value">
                      {currentUser?.name || 'Not set'}
                    </span>
                  </div>
                  <div className="profile-modal__info-item">
                    <span className="profile-modal__info-label">Email:</span>
                    <span className="profile-modal__info-value">
                      {currentUser?.email || 'Not set'}
                    </span>
                  </div>
                  {currentUser.phone && (
                    <div className="profile-modal__info-item">
                      <span className="profile-modal__info-label">Phone:</span>
                      <span className="profile-modal__info-value">
                        {currentUser.phone}
                      </span>
                    </div>
                  )}
                  <div className="profile-modal__info-item">
                    <span className="profile-modal__info-label">
                      Member Since:
                    </span>
                    <span className="profile-modal__info-value">
                      {formatDate(currentUser.createdAt)}
                    </span>
                  </div>

                  <div className="profile-modal__actions">
                    <button
                      className="profile-modal__edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="profile-modal__logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="profile-modal__form">
                  <div className="profile-modal__form-group">
                    <label htmlFor="name" className="profile-modal__label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="profile-modal__input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="profile-modal__form-group">
                    <label htmlFor="email" className="profile-modal__label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="profile-modal__input"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="profile-modal__form-group">
                    <label htmlFor="phone" className="profile-modal__label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="profile-modal__input"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="profile-modal__form-actions">
                    <button
                      type="button"
                      className="profile-modal__cancel-btn"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="profile-modal__save-btn"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="profile-modal__error">
              <p>No user information available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add this PropTypes validation at the bottom
ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
