import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './store/configureStore.ts';
import { getUser } from './store/slices/userSlice.ts';
import AppFooter from './components/AppFooter.tsx';
import SideNav from './components/SideNav.tsx';
import './assets/scss/_theme.scss';

function App() {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      {currentPath !== '/' &&
        currentPath !== '/login' &&
        currentPath !== '/register' &&
        currentPath !== '/not-found' && <SideNav />}
      <div
        className={
          currentPath !== '/' && currentPath !== '/login' && currentPath !== '/register'
            ? 'page'
            : ''
        }
      >
        <Outlet />
      </div>
      {currentPath !== '/login' && currentPath !== '/register' && <AppFooter />}
    </>
  );
}

export default App;
