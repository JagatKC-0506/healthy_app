import { NavLink } from 'react-router-dom';
import { Home, Utensils, Target, TrendingUp, Settings } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/diet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Utensils size={24} />
        <span>Diet</span>
      </NavLink>
      <NavLink to="/quests" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Target size={24} />
        <span>Quests</span>
      </NavLink>
      <NavLink to="/progress" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <TrendingUp size={24} />
        <span>Progress</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Settings size={24} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
