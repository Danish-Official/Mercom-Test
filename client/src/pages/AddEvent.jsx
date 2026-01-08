import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AddEvent() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    industry: 'Solar',
    eventType: 'Conference',
    date: '',
    location: '',
    banner: '',
  });
  const [loading, setLoading] = useState(false);

  if (!token) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      alert('Event added successfully!');
      navigate('/events');
    } else {
      alert('Error adding event');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '100px' }}
        />
        <select
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option>Solar</option>
          <option>Wind</option>
          <option>Hydro</option>
          <option>Bioenergy</option>
        </select>
        <select
          value={form.eventType}
          onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option>Conference</option>
          <option>Expo</option>
          <option>Workshop</option>
          <option>Webinar</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="url"
          placeholder="Banner URL"
          value={form.banner}
          onChange={(e) => setForm({ ...form, banner: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Adding...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
}