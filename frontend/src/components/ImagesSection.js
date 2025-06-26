/**
 * NASA Images Section Component
 * 
 * This component displays images from NASA's Image and Video Library.
 * It fetches images based on search queries and displays them in a gallery format.
 * 
 * Features:
 * - Search functionality for NASA images
 * - Image gallery with clickable thumbnails
 * - Pagination support
 * - Loading states and error handling
 * - Responsive design
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * NASA Images Section component
 * 
 * State:
 * - query: Current search query
 * - mediaType: Current media type filter
 * - year: Current year filter
 * - page: Current page number for pagination
 * - data: Array of NASA images from search results
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if API call fails
 * - hasMore: Boolean indicating if there are more images to fetch
 * - fetched: Boolean indicating if data has been fetched
 * - modalImg: Image data for the modal
 * 
 * @returns {JSX.Element} NASA images section with search and gallery
 */
function ImagesSection() {
  const [query, setQuery] = React.useState('moon');
  const [mediaType, setMediaType] = React.useState('all');
  const [year, setYear] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [hasMore, setHasMore] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);
  const [modalImg, setModalImg] = React.useState(null);

  // Search NASA images with selected filters and pagination
  const search = (newPage = 1) => {
    setLoading(true);
    setError(null);
    setFetched(true);
    setPage(newPage);
    let url = `https://nasa-backend-ermi4cllza-uc.a.run.app/api/images?q=${encodeURIComponent(query)}&page=${newPage}`;
    if (mediaType !== 'all') url += `&media_type=${mediaType}`;
    if (year) url += `&year_start=${year}&year_end=${year}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data.collection?.items || []);
        setHasMore(!!data.collection?.links?.find(l => l.rel === 'next'));
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch images');
        setLoading(false);
      });
  };

  // Limit displayed images to 24 per page
  const pagedData = data.slice(0, 24);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>NASA Image and Video Library</h2>
      <div className="filters" style={{ justifyContent: 'center' }}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search images..." />
        <select value={mediaType} onChange={e => setMediaType(e.target.value)}>
          <option value="all">All</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" style={{ width: 80 }} />
        <button onClick={() => search(1)} style={{ marginLeft: 8 }}>Search</button>
      </div>
      {loading && <div className="spinner" />}
      {error && <div className="error-message">{error}</div>}
      <div className="gallery-grid">
        {pagedData.length === 0 && fetched && !loading && <div>No images found.</div>}
        {pagedData.map(item => {
          const img = item.links && item.links[0]?.href;
          const title = item.data && item.data[0]?.title;
          return img ? (
            <div key={item.data[0]?.nasa_id} className="gallery-card" onClick={() => setModalImg({ src: img, title })}>
              <img src={img} alt={title} />
              <div className="gallery-title">{title}</div>
            </div>
          ) : null;
        })}
      </div>
      {fetched && (
        <div className="pagination">
          <button onClick={() => search(page - 1)} disabled={page === 1}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => search(page + 1)} disabled={!hasMore}>Next</button>
        </div>
      )}
      {modalImg && (
        <div className="image-modal-overlay" onClick={() => setModalImg(null)}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <img src={modalImg.src} alt={modalImg.title} />
            <div style={{ color: '#fff', marginBottom: '0.5rem' }}>{modalImg.title}</div>
            <button className="image-modal-close" onClick={() => setModalImg(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagesSection; 