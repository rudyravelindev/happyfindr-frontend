import { useState } from 'react';
import { useAuth } from './AuthContext';
import ProfileModal from './ProfileModal';
import { Link } from 'react-router-dom';

import {
  AiOutlineMenu,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
} from 'react-icons/ai';
import './DashboardHeader.css';

export default function DashboardHeader({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };
  const handleProfileClick = () => {
    setIsProfileOpen(false);
    onProfileClick();
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
        <h1 className="dashboard-header__title">Your Belongings</h1>
      </div>

      <div className="dashboard-header__right">
        <div className="dashboard-header__profile">
          <button
            className="dashboard-header__profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              src={currentUser?.avatar || '/api/placeholder/40/40'}
              alt="Profile"
              className="dashboard-header__avatar"
            />
            <span className="dashboard-header__name">
              {currentUser?.name || 'User'}
            </span>
          </button>

          {isProfileOpen && (
            <div className="dashboard-header__dropdown">
              <button className="dashboard-header__dropdown-item">
                <AiOutlineUser />
                <span>Profile</span>
              </button>
              <button
                className="dashboard-header__dropdown-item"
                onClick={handleLogout}
              >
                <AiOutlineLogout />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      </div>
    </header>
  );
}
