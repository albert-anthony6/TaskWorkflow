import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../views/LandingPage';
import ProjectPage from '../views/ProjectPage';
import NotFound from '../views/NotFound';
import LoginPage from '../views/LoginPage';
import PeoplePage from '../views/PeoplePage';
import LogoutPage from '../views/LogoutPage';
import ProfilePage from '../views/ProfilePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <LoginPage /> },
      { path: '/user/:userId', element: <ProfilePage /> },
      { path: 'projects/:projectId', element: <ProjectPage /> },
      { path: 'people', element: <PeoplePage /> },
      { path: '/logout', element: <LogoutPage /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate to="/not-found" replace /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
