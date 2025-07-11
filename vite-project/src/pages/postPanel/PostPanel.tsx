import './PostPanel.css';
import { Link } from 'react-router-dom';

export const PostPanel = () => (
  <main className="panel-container">
    <h1 className="panel-title">Posts dashboard</h1>

    <Link className="panel-back" to="/Posts">
      ← Return to list
    </Link>
  </main>
);