import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then(res => res.json())
      .then(events => {
        const found = events.find(e => e._id === id);
        setEvent(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (!event) return <div style={{ textAlign: 'center', padding: '50px' }}>Event not found.</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
      <div>
        <Link to="/events" style={{ color: '#007bff', textDecoration: 'none' }}>&larr; Back to Events</Link>
        <h2>{event.title}</h2>
        {event.banner && <img src={event.banner} alt={event.title} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />}
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Industry:</strong> {event.industry}</p>
        <p><strong>Type:</strong> {event.eventType}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
      {/* Ads Space */}
      <aside style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <h3>Advertisement</h3>
        <div style={{ background: '#ddd', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
          <p>Ad Space</p>
        </div>
        <div style={{ background: '#ddd', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', marginTop: '20px' }}>
          <p>Ad Space</p>
        </div>
      </aside>
    </div>
  );
}