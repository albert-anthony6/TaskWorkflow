import './TopNav.scss';
import IconMenu from '../assets/icons/icon_menu.svg?react';
import IconLogo from '../assets/icons/icon_logo.svg?react';

export default function TopNav() {
  return (
    <nav className="top-nav">
      <IconMenu className="icon-menu" />
      <IconLogo className="logo__white" />
    </nav>
  );
}
