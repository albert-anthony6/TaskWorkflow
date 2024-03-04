import { useLocation, Outlet } from 'react-router-dom';
import AppFooter from './components/AppFooter.tsx';
import SideNav from './components/SideNav.tsx';
import './assets/scss/_theme.scss';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {currentPath !== '/' && <SideNav />}
      <div className={currentPath !== '/' ? 'page' : ''}>
        <Outlet />
      </div>
      <AppFooter />
    </>
  );
}

export default App;
