import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Restore session from localStorage
  useEffect(() => {
    const user = localStorage.getItem('happyfindr_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Signup a new user
  const signup = async (email, password, userData, avatar = null) => {
    const users = JSON.parse(localStorage.getItem('happyfindr_users')) || [];

    if (users.some((u) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const signupDate = new Date().toISOString();
    const newUser = {
      id: Date.now(),
      email,
      password,
      signupDate,
      avatar,
      signupDate: new Date().toISOString(),
      ...userData,
    };

    users.push(newUser);

    localStorage.setItem('happyfindr_users', JSON.stringify(users));
    localStorage.setItem('happyfindr_user', JSON.stringify(newUser));
    setCurrentUser(newUser);

    return newUser;
  };

  // Login existing user
  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem('happyfindr_users')) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('happyfindr_user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('happyfindr_user');
    setCurrentUser(null);
  };
  // Update profile of current user
  const updateProfile = async (updates) => {
    if (!currentUser) throw new Error('No user logged in');

    const users = JSON.parse(localStorage.getItem('happyfindr_users')) || [];

    const updatedUser = { ...currentUser, ...updates };

    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );

    localStorage.setItem('happyfindr_users', JSON.stringify(updatedUsers));
    localStorage.setItem('happyfindr_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    return updatedUser;
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
