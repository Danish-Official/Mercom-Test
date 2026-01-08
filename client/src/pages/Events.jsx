import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({ industry: '', eventType: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = events;
    if (filters.industry) {
      filtered = filtered.filter(e => e.industry === filters.industry);
    }
    if (filters.eventType) {
      filtered = filtered.filter(e => e.eventType === filters.eventType);
    }
    setFilteredEvents(filtered);
  }, [events, filters]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading events...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto' }}>
      <h2>Upcoming Events</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Industries</option>
          <option>Solar</option>
          <option>Wind</option>
          <option>Hydro</option>
          <option>Bioenergy</option>
        </select>
        <select
          value={filters.eventType}
          onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">All Types</option>
          <option>Conference</option>
          <option>Expo</option>
          <option>Workshop</option>
          <option>Webinar</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredEvents.map(e => (
          <EventCard key={e._id} event={e} />
        ))}
      </div>
      {filteredEvents.length === 0 && <p>No events found matching your filters.</p>}
    </div>
  );
}