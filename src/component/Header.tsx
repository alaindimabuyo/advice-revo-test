import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header>
      <h3>Advice Revolution</h3>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;
