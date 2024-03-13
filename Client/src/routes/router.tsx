import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../views/LandingPage';
import ProjectPage from '../views/ProjectPage';
import NotFound from '../views/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <LandingPage /> },
      { path: 'projects/:projectId', element: <ProjectPage /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to="/not-found" /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
