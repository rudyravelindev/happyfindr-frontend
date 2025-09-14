import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // For testing: comment out the next line to access dashboard without login
  return currentUser ? children : <Navigate to="/login" />;

  // For development/testing only - uncomment below to bypass auth:
  // return children;
}
