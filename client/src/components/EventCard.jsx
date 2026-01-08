import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', margin: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', background: 'white' }}>
      {event.banner && <img src={event.banner} alt={event.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />}
      <h3 style={{ margin: '10px 0' }}>{event.title}</h3>
      <p style={{ color: '#666', fontSize: '14px' }}>{event.description.substring(0, 100)}...</p>
      <p><strong>Industry:</strong> {event.industry}</p>
      <p><strong>Type:</strong> {event.eventType}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <Link to={`/event/${event._id}`} style={{ color: '#007bff', textDecoration: 'none' }}>View Details</Link>
    </div>
  );
}