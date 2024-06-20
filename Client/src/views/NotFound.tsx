import './NotFound.scss';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <button onClick={() => (window.location.href = '/')} className="button__secondary__dark">
        Go back
      </button>
    </main>
  );
}
