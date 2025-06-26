/**
 * EPIC (Earth Polychromatic Imaging Camera) Section Component
 * 
 * This component displays images from NASA's EPIC camera aboard the DSCOVR satellite.
 * It shows daily images of Earth from space with natural color processing.
 * 
 * Features:
 * - Date selection for historical EPIC images
 * - Natural color Earth images from space
 * - Image details and metadata
 * - Loading states and error handling
 * - Responsive design
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * EPIC Section component
 * 
 * State:
 * - data: Array of EPIC images from NASA API
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if API call fails
 * - date: Currently selected date for EPIC images
 * - fetched: Boolean indicating if data has been fetched
 * 
 * @returns {JSX.Element} EPIC section with Earth images and details
 */
function EpicSection() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [date, setDate] = React.useState('');
  const [fetched, setFetched] = React.useState(false);

  // Fetch EPIC images from NASA API for the selected date
  const fetchEpic = () => {
    setLoading(true);
    setError(null);
    setFetched(true);
    let url = 'https://nasa-backend-ermi4cllza-uc.a.run.app/api/epic';
    if (date) url += `?date=${date}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch EPIC images');
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>EPIC (Earth Polychromatic Imaging Camera)</h2>
      <div className="filters" style={{ justifyContent: 'center' }}>
        <label>Date (YYYY-MM-DD): </label>
        <input value={date} onChange={e => setDate(e.target.value)} placeholder="YYYY-MM-DD" />
        <button onClick={fetchEpic}>Fetch</button>
      </div>
      {loading && <div className="spinner" />}
      {error && <div className="error-message">{error}</div>}
      <div className="gallery-grid">
        {data.length === 0 && fetched && !loading && <div>No EPIC images found.</div>}
        {data.map(item => {
          const imageUrl = item.image
            ? `https://epic.gsfc.nasa.gov/archive/natural/${item.date.split(' ')[0].replace(/-/g, '/')}/png/${item.image}.png`
            : null;
          return imageUrl ? (
            <div key={item.identifier} className="gallery-card">
              <img src={imageUrl} alt={item.caption} />
              <div className="gallery-title">{item.caption}</div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default EpicSection; 