import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', name: '', isRegister: false });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = form.isRegister ? '/api/auth/register' : '/api/auth/login';
    const body = form.isRegister ? { name: form.name, email: form.email, password: form.password } : { email: form.email, password: form.password };
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      if (!form.isRegister) login(data.token);
      navigate('/events');
    } else {
      alert('Error: Invalid credentials or registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>{form.isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {form.isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Processing...' : (form.isRegister ? 'Register' : 'Login')}
        </button>
      </form>
      <button onClick={() => setForm({ ...form, isRegister: !form.isRegister })} style={{ marginTop: '15px', background: 'transparent', border: 'none', color: '#007bff', cursor: 'pointer' }}>
        {form.isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  );
}