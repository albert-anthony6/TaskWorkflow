import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../views/LandingPage';
import ProjectsPage from '../views/ProjectsPage';
import ProjectPage from '../views/ProjectPage';
import LoginPage from '../views/LoginPage';
import PeoplePage from '../views/PeoplePage';
import LogoutPage from '../views/LogoutPage';
import ProfilePage from '../views/ProfilePage';
import SettingsPage from '../views/SettingsPage';
import NotFound from '../views/NotFound';
import AboutUs from '../views/AboutUs';
import RequireAuth from './RequireAuth';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: '/user/:userId', element: <ProfilePage /> },
          { path: '/projects', element: <ProjectsPage /> },
          { path: '/projects/:projectId', element: <ProjectPage /> },
          { path: '/people', element: <PeoplePage /> },
          { path: '/settings', element: <SettingsPage /> },
          { path: '/about-us', element: <AboutUs /> }
        ]
      },
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <LoginPage /> },
      { path: '/logout', element: <LogoutPage /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '*', element: <Navigate to="/not-found" replace /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
