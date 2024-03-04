import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LandingPage from '../views/LandingPage';
import ProjectPage from '../views/ProjectPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <LandingPage /> },
      { path: 'projects', element: <ProjectPage /> },
      { path: '*', element: <LandingPage /> }
    ]
  }
];

export const router = createBrowserRouter(routes);
