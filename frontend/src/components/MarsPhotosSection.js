/**
 * Mars Photos Section Component
 * 
 * This component displays photos from NASA's Mars rovers.
 * It fetches Mars rover photos from NASA's API and displays them in a gallery format.
 * 
 * Features:
 * - Rover selection (Curiosity, Opportunity, Spirit, Perseverance)
 * - Camera selection for each rover
 * - Date selection for historical photos
 * - Pagination support (40 photos per page)
 * - Photo gallery with clickable images
 * - Loading states and error handling
 * - Responsive design
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Mars Photos Section component
 * 
 * State:
 * - photos: Array of Mars rover photos
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if API call fails
 * - rover: Currently selected rover
 * - camera: Currently selected camera
 * - date: Currently selected date
 * - page: Current page number for pagination
 * 
 * @returns {JSX.Element} Mars photos section with gallery and filters
 */
function MarsPhotosSection() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [date, setDate] = React.useState('2022-01-01');
  const [rover, setRover] = React.useState('curiosity');
  const [camera, setCamera] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [fetched, setFetched] = React.useState(false);

  // Camera options available for each rover
  const camerasByRover = {
    curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
    opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    perseverance: ["EDL_RUCAM", "EDL_RDCAM", "EDL_DDCAM", "EDL_PUCAM1", "EDL_PUCAM2", "NAVCAM_LEFT", "NAVCAM_RIGHT", "MCZ_RIGHT", "MCZ_LEFT", "FRONT_HAZCAM_LEFT_A", "FRONT_HAZCAM_RIGHT_A", "REAR_HAZCAM_LEFT", "REAR_HAZCAM_RIGHT", "SKYCAM", "SHERLOC_WATSON", "SUPERCAM_RMI"]
  };

  // Fetch Mars photos from NASA API with selected filters
  const fetchPhotos = (newPage = 1) => {
    setLoading(true);
    setError(null);
    setFetched(true);
    setPage(newPage);
    let url = `https://nasa-backend-ermi4cllza-uc.a.run.app/api/mars-photos?rover=${rover}&earth_date=${date}&page=${newPage}`;
    if (camera) url += `&camera=${camera}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data.photos || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch Mars photos');
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>Mars Rover Photos</h2>
      <div className="filters" style={{ justifyContent: 'center' }}>
        <label>Rover: </label>
        <select value={rover} onChange={e => { setRover(e.target.value); setCamera(''); }}>
          <option value="curiosity">Curiosity</option>
          <option value="opportunity">Opportunity</option>
          <option value="spirit">Spirit</option>
          <option value="perseverance">Perseverance</option>
        </select>
        <label style={{ marginLeft: 10 }}>Date: </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <label style={{ marginLeft: 10 }}>Camera: </label>
        <select value={camera} onChange={e => setCamera(e.target.value)}>
          <option value="">All</option>
          {camerasByRover[rover].map(cam => (
            <option key={cam} value={cam}>{cam}</option>
          ))}
        </select>
        <button onClick={() => fetchPhotos(1)} style={{ marginLeft: 8 }}>Fetch</button>
      </div>
      {loading && <div className="spinner" />}
      {error && <div className="error-message">{error}</div>}
      <div className="gallery-grid">
        {data.length === 0 && fetched && !loading && <div>No photos found for this date/rover/camera.</div>}
        {data.slice(0, 40).map(photo => (
          <div key={photo.id} className="gallery-card" onClick={() => window.open(photo.img_src, '_blank')} style={{ cursor: 'pointer' }}>
            <img src={photo.img_src} alt={photo.camera.full_name} />
            <div className="gallery-title">{photo.camera.full_name}</div>
          </div>
        ))}
      </div>
      {fetched && (
        <div className="pagination">
          <button onClick={() => fetchPhotos(page - 1)} disabled={page === 1}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => fetchPhotos(page + 1)} disabled={data.length < 40}>Next</button>
        </div>
      )}
    </div>
  );
}

export default MarsPhotosSection; 