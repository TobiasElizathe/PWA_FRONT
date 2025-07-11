import './Users.css';
import enable from '../../assets/enable.png';
import disable from '../../assets/disable.png';
import { Link } from 'react-router-dom';
import { UserCard } from '../../components/UserCard/UserCard';
import axios from 'axios';
import { useState, useEffect } from 'react';

type User = {
  _id?: string;
  username: string;
  email: string;
};

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/users');
        setUsers(data.data);
      } catch (err) {
        setError('Could not fetch users 😞');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- render ---------- */
  if (loading) return <p className="users-status">Loading…</p>;
  if (error)   return <p className="users-status error">{error}</p>;

  return (
    <section className="users">
      <h1>Users</h1>
        <Link to="/" className="back-link">← Back to Signup</Link>
      <div className="users-list">
        {users.map(u => (
          <div key={u._id ?? u.email} className="user-card-wrapper">
            <UserCard username={u.username} email={u.email} />

            <div className="user-card-actions">
              <button><img src={enable}  alt="Enable"  /></button>
              <button><img src={disable} alt="Disable" /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
