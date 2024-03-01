import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tickets').then((resp) => {
      setTickets(resp.data);
    });
  }, []);

  return (
    <>
      <h1>TaskWorkflow</h1>
      <ul>
        {tickets.map((ticket: any) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
