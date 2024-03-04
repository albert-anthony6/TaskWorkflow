// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { useRoutes } from 'react-router-dom';
import LandingPage from './views/LandingPage.tsx';
import './assets/scss/_theme.scss';
import AppFooter from './components/AppFooter.tsx';

function App() {
  // const [tickets, setTickets] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/tickets').then((resp) => {
  //     setTickets(resp.data);
  //   });
  // }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '*',
      element: <LandingPage />
    }
  ]);

  return (
    <>
      {routes}
      <AppFooter />
    </>
  );
}

export default App;
