import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <Link to="/">Go back</Link>
    </main>
  );
}
