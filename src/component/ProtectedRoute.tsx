import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import localforage from 'localforage';

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const authenticated = localforage.getItem('authToken');
  if (!authenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default Protected;
