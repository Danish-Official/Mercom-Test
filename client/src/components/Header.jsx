import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { token, logout } = useAuth();

  return (
    <header style={{ background: '#007bff', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Renewable Events</Link>
      </h1>
      <nav>
        <Link to="/events" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Events</Link>
        {token ? (
          <>
            <Link to="/add-event" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Add Event</Link>
            <button onClick={logout} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Login</Link>
        )}
      </nav>
    </header>
  );
}