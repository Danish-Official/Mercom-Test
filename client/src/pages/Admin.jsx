import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchEvents();
      fetchSubscribers();
    }
  }, [user]);

  const fetchEvents = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then(res => res.json())
      .then(setEvents);
  };

  const fetchSubscribers = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/newsletter/subscribers`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setSubscribers);
  };

  const deleteEvent = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchEvents();
  };

  const deleteSubscriber = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/newsletter/subscribers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchSubscribers();
  };

  if (user?.role !== 'admin') return <div>Access denied</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('events')} style={{ marginRight: '10px', padding: '10px' }}>Manage Events</button>
        <button onClick={() => setActiveTab('subscribers')} style={{ padding: '10px' }}>Manage Subscribers</button>
      </div>

      {activeTab === 'events' && (
        <div>
          <h3>All Events</h3>
          {events.map(e => (
            <div key={e._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h4>{e.title}</h4>
              <p>{e.description}</p>
              <button onClick={() => deleteEvent(e._id)} style={{ background: 'red', color: 'white' }}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subscribers' && (
        <div>
          <h3>Newsletter Subscribers</h3>
          {subscribers.map(s => (
            <div key={s._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p>{s.email} - Subscribed: {new Date(s.subscribedAt).toLocaleDateString()}</p>
              <button onClick={() => deleteSubscriber(s._id)} style={{ background: 'red', color: 'white' }}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}