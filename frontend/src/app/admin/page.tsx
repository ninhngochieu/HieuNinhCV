'use client';

import { useState, useEffect } from 'react';

interface Bio {
  name: string;
  title: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export default function AdminPage() {
  const [bio, setBio] = useState<Bio>({
    name: '', title: '', summary: '', email: '', github: '', linkedin: '', location: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/portfolio/bio')
      .then(res => res.json())
      .then(data => setBio(data));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving...');
    try {
      const res = await fetch('/api/portfolio/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bio)
      });
      if (res.ok) setMessage('Update successful!');
      else setMessage('Failed to update.');
    } catch {
      setMessage('Error occurred.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Portfolio Control Panel</h1>
      
      <form onSubmit={handleSave} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3>Biography Management</h3>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
          <input 
            type="text" 
            value={bio.name} 
            onChange={e => setBio({...bio, name: e.target.value})}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Professional Title</label>
          <input 
            type="text" 
            value={bio.title} 
            onChange={e => setBio({...bio, title: e.target.value})}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Summary</label>
          <textarea 
            value={bio.summary} 
            onChange={e => setBio({...bio, summary: e.target.value})}
            rows={4}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input type="text" value={bio.email} onChange={e => setBio({...bio, email: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }} />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location</label>
                <input type="text" value={bio.location} onChange={e => setBio({...bio, location: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }} />
            </div>
        </div>

        <button type="submit" className="primary-btn" style={{ alignSelf: 'flex-start' }}>
          Save Changes
        </button>

        {message && <p style={{ color: message.includes('success') ? 'var(--primary)' : 'orange' }}>{message}</p>}
      </form>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>← Back to Portfolio</a>
      </div>
    </div>
  );
}
