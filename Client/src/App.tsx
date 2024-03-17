import { useLocation, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppFooter from './components/AppFooter.tsx';
import SideNav from './components/SideNav.tsx';
import './assets/scss/_theme.scss';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      {currentPath !== '/' && currentPath !== '/not-found' && <SideNav />}
      <div className={currentPath !== '/' ? 'page' : ''}>
        <Outlet />
      </div>
      <AppFooter />
    </>
  );
}

export default App;
