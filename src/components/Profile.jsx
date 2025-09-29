import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import './Profile.css';

export default function Profile() {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Update formData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'January 2024';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  if (!currentUser) {
    return (
      <div className="profile">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <h2 className="profile__title">My Profile</h2>
        <p className="profile__subtitle">Manage your account information</p>
      </div>

      {success && <div className="profile__success">{success}</div>}

      <div className="profile__content">
        <div className="profile__card">
          <div className="profile__avatar-section">
            <div className="profile__avatar">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="profile__avatar-img"
                />
              ) : (
                currentUser?.name?.[0]?.toUpperCase() || 'U'
              )}
            </div>

            <div className="profile__avatar-info">
              <h3 className="profile__name">{currentUser.name}</h3>
              <p className="profile__email">{currentUser.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <div className="profile__info">
              <div className="profile__info-item">
                <span className="profile__info-label">Full Name:</span>
                <span className="profile__info-value">{currentUser.name}</span>
              </div>
              <div className="profile__info-item">
                <span className="profile__info-label">Email:</span>
                <span className="profile__info-value">{currentUser.email}</span>
              </div>

              <div className="profile__info-item">
                <span className="profile__info-label">Member Since:</span>
                <span className="profile__info-value">
                  {currentUser.signupDate
                    ? new Date(currentUser.signupDate).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        }
                      )
                    : 'Unknown'}
                </span>
              </div>

              <button
                className="profile__edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile__form">
              <div className="profile__form-group">
                <label htmlFor="name" className="profile__label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="profile__input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="profile__form-group">
                <label htmlFor="email" className="profile__label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="profile__input"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="profile__form-group">
                <label htmlFor="phone" className="profile__label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="profile__input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="profile__form-actions">
                <button
                  type="button"
                  className="profile__cancel-btn"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile__save-btn"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
        {/* this when I will to the backend in the future not for right now */}
        {/* <div className="profile__stats">
          <h3 className="profile__stats-title">Account Statistics</h3>
          <div className="profile__stats-grid">
            <div className="profile__stat">
              <span className="profile__stat-number">5</span>
              <span className="profile__stat-label">Registered Items</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-number">2</span>
              <span className="profile__stat-label">Items Found</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-number">1</span>
              <span className="profile__stat-label">Items Lost</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
