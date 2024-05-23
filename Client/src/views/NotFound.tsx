import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <button onClick={goBack} className="button__secondary__dark">
        Go back
      </button>
    </main>
  );
}
