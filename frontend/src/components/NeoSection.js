/**
 * NEO (Near Earth Objects) Section Component
 * 
 * This component displays information about Near Earth Objects from NASA's API.
 * It fetches NEO data and presents it with interactive charts and detailed information.
 * 
 * Features:
 * - Date range selection for NEO data
 * - Interactive bar chart showing NEO counts by date
 * - Pie chart showing hazardous vs non-hazardous objects
 * - Detailed list of NEOs with key information
 * - Loading states and error handling
 * - Responsive design with modern styling
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

/**
 * NEO Section component
 * 
 * State:
 * - data: Raw NEO data from NASA API
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if API call fails
 * - start: Start date for NEO data range
 * - end: End date for NEO data range
 * - fetched: Boolean indicating if data has been fetched
 * 
 * @returns {JSX.Element} NEO section with charts and details
 */
function NeoSection() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [start, setStart] = React.useState('2022-01-01');
  const [end, setEnd] = React.useState('2022-01-07');
  const [fetched, setFetched] = React.useState(false);

  // Fetch NEO data from NASA API for the selected date range
  const fetchNeo = () => {
    setLoading(true);
    setError(null);
    setFetched(true);
    fetch(`https://nasa-backend-ermi4cllza-uc.a.run.app/api/neo?start_date=${start}&end_date=${end}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch NEO data');
        setLoading(false);
      });
  };

  // Prepare chart data from NEO response
  let chartData = [];
  let hazardousCount = 0;
  let nonHazardousCount = 0;
  if (data && data.near_earth_objects) {
    chartData = Object.entries(data.near_earth_objects).map(([date, neos]) => ({
      date,
      count: neos.length
    }));
    Object.values(data.near_earth_objects).forEach(neos => {
      neos.forEach(neo => {
        if (neo.is_potentially_hazardous_asteroid) hazardousCount++;
        else nonHazardousCount++;
      });
    });
  }
  const pieData = [
    { name: 'Hazardous', value: hazardousCount },
    { name: 'Non-Hazardous', value: nonHazardousCount }
  ];
  const COLORS = ['#ff4d4f', '#1890ff'];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>Near Earth Objects</h2>
      <div className="filters" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <label>Start Date: </label>
        <input type="date" value={start} onChange={e => setStart(e.target.value)} />
        <label style={{ marginLeft: 10 }}>End Date: </label>
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        <button onClick={fetchNeo}>Fetch</button>
      </div>
      {loading && <div className="spinner" />}
      {error && <div className="error-message">{error}</div>}
      {fetched && data && data.near_earth_objects && (
        <>
          <div style={{
            height: 320,
            marginBottom: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(35, 42, 59, 0.97)',
            borderRadius: 18,
            boxShadow: '0 0 24px #21cbf3, 0 2px 12px #7f53ac44',
            padding: 24,
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#21cbf3" tick={{ fill: '#fff', fontWeight: 600 }} />
                <YAxis allowDecimals={false} stroke="#21cbf3" tick={{ fill: '#fff', fontWeight: 600 }} />
                <Tooltip contentStyle={{ background: '#23262F', borderRadius: 8, color: '#fff', border: '1px solid #21cbf3' }} labelStyle={{ color: '#21cbf3' }} />
                <Bar dataKey="count" fill="#21cbf3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{
            height: 320,
            marginBottom: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(35, 42, 59, 0.97)',
            borderRadius: 18,
            boxShadow: '0 0 24px #21cbf3, 0 2px 12px #7f53ac44',
            padding: 24,
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label
                  fill="#21cbf3"
                  labelLine={false}
                  stroke="#23262F"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ff4d4f' : '#21cbf3'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#23262F', borderRadius: 8, color: '#21cbf3', border: '1px solid #21cbf3' }} 
                  labelStyle={{ color: '#21cbf3' }}
                  formatter={(value, name) => {
                    return [value, name];
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ color: '#fff', fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'left' }}>
            {Object.entries(data.near_earth_objects).map(([date, neos]) => (
              <div key={date} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 700, color: '#21cbf3', marginBottom: 6, fontSize: '1.08rem', textAlign: 'left' }}>{date}</div>
                <ul style={{ display: 'inline-block', textAlign: 'left', margin: 0 }}>
                  {neos.map(neo => (
                    <li key={neo.id}>{neo.name} (Diameter: {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1)} m, Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'})</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NeoSection; 