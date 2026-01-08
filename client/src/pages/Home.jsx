import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then(res => res.json())
      .then(events => setFeaturedEvents(events.slice(0, 3))); // Show first 3 as featured
  }, []);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Subscribed successfully!');
        setEmail('');
      } else {
        alert(data.message || 'Subscription failed');
      }
    } catch (err) {
      alert('Error subscribing. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #007bff, #28a745)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Renewable Energy Events Platform</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
          Discover and participate in the latest conferences, expos, and workshops shaping the future of clean energy.
        </p>
        <Link to="/events" style={{ padding: '15px 30px', background: 'white', color: '#007bff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Explore Events
        </Link>
      </section>

      {/* Featured Events */}
      <section style={{ padding: '50px 20px', maxWidth: '1200px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {featuredEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/events" style={{ padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            View All Events
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: '#f8f9fa', padding: '50px 20px', textAlign: 'center' }}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest renewable energy events and news.</p>
        <form onSubmit={handleNewsletter} style={{ maxWidth: '400px', margin: 'auto', display: 'flex', gap: '10px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}