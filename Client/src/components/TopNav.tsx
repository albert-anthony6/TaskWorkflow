import { useState } from 'react';
import './TopNav.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import IconHome from '../assets/icons/icon_home.svg?react';
import IconFolder from '../assets/icons/icon_folder.svg?react';
import IconMessage from '../assets/icons/icon_message.svg?react';
import IconPeople from '../assets/icons/icon_people.svg?react';
import IconPerson from '../assets/icons/icon_person.svg?react';
import IconSettings from '../assets/icons/icon_settings.svg?react';
import IconMenu from '../assets/icons/icon_menu.svg?react';
import IconLogo from '../assets/icons/icon_logo.svg?react';
import IconClose from '../assets/icons/icon_close.svg?react';
import IconInfo from '../assets/icons/icon_info.svg?react';
import IconLogout from '../assets/icons/icon_logout.svg?react';

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);

  return (
    <div className="top-nav">
      <div className="app-header">
        <IconMenu onClick={() => setIsMenuOpen(!isMenuOpen)} className="icon-menu" />
        <IconLogo className="logo__white" />
      </div>
      {isMenuOpen && (
        <div className="modal-container">
          <IconLogo onClick={() => setIsMenuOpen(!isMenuOpen)} className="logo__white" />
          <IconClose onClick={() => setIsMenuOpen(false)} className="icon-close" />
          <nav className="page-links">
            <ul>
              <li onClick={() => setIsMenuOpen(false)}>
                <NavLink
                  to={`/user/${currentUser?.id}`}
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  <IconHome />
                  <p>Home</p>
                </NavLink>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <NavLink
                  to="/projects"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  <IconFolder />
                  <p>Projects</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects">
                  <IconMessage />
                  <p>Mentions</p>
                  <div className="coming-soon-tag">Coming soon</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/people">
                  <IconPeople />
                  <p>Teams</p>
                  <div className="coming-soon-tag">Coming soon</div>
                </NavLink>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/people" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <IconPerson />
                  <p>People</p>
                </NavLink>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? 'active-link' : '')}
                >
                  <IconSettings />
                  <p>Settings</p>
                </NavLink>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/about-us">
                  <IconInfo />
                  <p>About Us</p>
                </Link>
              </li>
              <li onClick={() => setIsMenuOpen(false)}>
                <Link to="/logout">
                  <IconLogout />
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
