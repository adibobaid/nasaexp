/**
 * APOD (Astronomy Picture of the Day) Section Component
 * 
 * This component displays NASA's Astronomy Picture of the Day.
 * It fetches the APOD data from NASA's API and renders it with a modern card layout.
 * 
 * Features:
 * - Date selection for historical APOD images
 * - Image display with fallback for missing images
 * - Title, date, and explanation display
 * - Loading states and error handling
 * - Responsive design
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';

// Section for Astronomy Picture of the Day (APOD). Fetches and displays NASA's daily image or video.
function ApodSection() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [date, setDate] = React.useState('');

  // Fetch APOD data from NASA API based on selected date
  const fetchApod = () => {
    setLoading(true);
    setError(null);
    let url = 'https://nasa-backend-ermi4cllza-uc.a.run.app/api/apod';
    if (date) url += `?date=${date}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch APOD');
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>APOD (Astronomy Picture of the Day)</h2>
      <div className="filters" style={{ justifyContent: 'center' }}>
        <label>Date: </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={fetchApod}>Fetch</button>
      </div>
      {loading && <div className="spinner" />}
      {error && <div className="error-message">{error}</div>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <p><strong>Date:</strong> {data.date}</p>
          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} style={{ width: '100%', borderRadius: 8, margin: '0 auto' }} />
          ) : data.media_type === 'video' ? (
            <iframe title="apod-video" src={data.url} width="100%" height="400" frameBorder="0" allowFullScreen style={{ display: 'block', margin: '0 auto' }}></iframe>
          ) : (
            <div style={{ color: '#fff', margin: '1.5rem 0', fontWeight: 600 }}>No image found.</div>
          )}
          <p style={{ marginTop: 16 }}>{data.explanation}</p>
        </>
      )}
    </div>
  );
}

export default ApodSection; 