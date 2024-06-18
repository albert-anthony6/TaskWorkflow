import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <button onClick={() => navigate('/')} className="button__secondary__dark">
        Go back
      </button>
    </main>
  );
}
