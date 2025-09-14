import React, { createContext, useContext, useState, useEffect } from 'react';
import dbService from './DatabaseService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          // Verify user still exists in database
          const userExists = dbService.getUserById(user.id);
          if (userExists) {
            setCurrentUser(user);
          } else {
            localStorage.removeItem('currentUser');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuthStatus();
  }, []);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    try {
      // Check if email already exists
      const existingUser = dbService.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Create new user
      const user = dbService.createUser(userData);

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);

      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const isValid = dbService.validateUser(email, password);
      if (!isValid) {
        throw new Error('Invalid email or password');
      }

      const user = dbService.getUserByEmail(email);

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);

      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setLoading(true);
    try {
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      if (!currentUser) {
        throw new Error('No user is logged in');
      }

      const updatedUser = dbService.updateUser(currentUser.id, updates);

      // Update localStorage and state
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      return updatedUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    authChecked,
    register,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
