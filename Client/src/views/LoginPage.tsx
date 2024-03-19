import { Link, useLocation } from 'react-router-dom';
import IconLogo from '../assets/icons/icon_logo.svg?react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import './LoginPage.scss';

export default function LoginPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <main className="login-page">
      <div className="page-header">
        <Link to="/">
          <IconLogo className="logo logo__white" />
        </Link>
        <h2>Login to your account</h2>
      </div>
      {currentPath === '/login' && <LoginForm />}
      {currentPath === '/register' && <RegisterForm />}
    </main>
  );
}
