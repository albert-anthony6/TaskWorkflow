import IconLogo from '../assets/icons/icon_logo.svg?react';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';
import IconHome from '../assets/icons/icon_home.svg?react';
import IconFolder from '../assets/icons/icon_folder.svg?react';
import IconWrench from '../assets/icons/icon_wrench.svg?react';
import IconPeople from '../assets/icons/icon_people.svg?react';
import IconPerson from '../assets/icons/icon_person.svg?react';
import IconSettings from '../assets/icons/icon_settings.svg?react';
import IconInfo from '../assets/icons/icon_info.svg?react';
import IconLogout from '../assets/icons/icon_logout.svg?react';
import './SideNav.scss';
import { Link, NavLink } from 'react-router-dom';

export default function SideNav() {
  return (
    <aside className="side-nav">
      <div className="top-nav">
        <IconLogo className="logo__white" />
        <Link to="/profile/123" className="profile-link">
          <IconAvatar />
          <div className="username">
            <p>John Doe</p>
            <div className="caption">Developer at HighRise</div>
          </div>
        </Link>
        <nav className="page-links">
          <ul>
            <li>
              <NavLink to="/home">
                <IconHome />
                <p>Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects">
                <IconFolder />
                <p>Projects</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks">
                <IconWrench />
                <p>Tasks</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/teams">
                <IconPeople />
                <p>Teams</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/people">
                <IconPerson />
                <p>People</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <IconSettings />
                <p>Settings</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="bottom-nav">
        <nav className="secondary-links">
          <ul>
            <li>
              <Link to="/about-us">
                <IconInfo />
                <p>About Us</p>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <IconLogout />
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
