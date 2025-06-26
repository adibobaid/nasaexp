/**
 * Mars Weather Section Component
 * 
 * This component displays weather data from NASA's InSight lander on Mars.
 * It shows temperature, pressure, and wind data with interactive charts.
 * 
 * Features:
 * - Mars weather data visualization
 * - Interactive line chart for temperature trends
 * - Weather statistics and current conditions
 * - Loading states and error handling
 * - Responsive design with modern styling
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

/**
 * Mars Weather Section component
 * 
 * State:
 * - data: Raw weather data from NASA API
 * - loading: Boolean indicating if data is being fetched
 * - error: Error message if API call fails
 * - fetched: Boolean indicating if data has been fetched
 * 
 * @returns {JSX.Element} Mars weather section with charts and data
 */
function WeatherSection() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [fetched, setFetched] = React.useState(false);

  // Fetch Mars weather data from NASA InSight API
  const fetchWeather = () => {
    setLoading(true);
    setError(null);
    setFetched(true);
    fetch('https://nasa-backend-ermi4cllza-uc.a.run.app/api/insight-weather')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch Mars weather');
        setLoading(false);
      });
  };

  // Prepare chart data from weather response
  let chartData = [];
  if (data && data.sol_keys) {
    chartData = data.sol_keys.map(sol => ({
      sol,
      temp: data[sol].AT?.av,
      wind: data[sol].HWS?.av,
      pressure: data[sol].PRE?.av
    }));
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2>Mars InSight Weather</h2>
      <div className="filters" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <button onClick={fetchWeather}>Fetch Latest</button>
      </div>
      {loading && <div className="spinner" />}
      {error && <div className="error-message">{error}</div>}
      {fetched && data && data.sol_keys && (
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
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="sol" stroke="#21cbf3" tick={{ fill: '#fff', fontWeight: 600 }} />
                <YAxis yAxisId="left" orientation="left" stroke="#21cbf3" tick={{ fill: '#fff', fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ background: '#23262F', borderRadius: 8, color: '#21cbf3', border: '1px solid #21cbf3' }} 
                  labelStyle={{ color: '#21cbf3' }}
                />
                <Legend 
                  wrapperStyle={{ color: '#fff', fontWeight: 600 }}
                  formatter={(value) => {
                    return <span style={{ color: '#21cbf3' }}>{value}</span>;
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#ff7300" name="Avg Temp (°C)" strokeWidth={3} dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }} />
                <Line yAxisId="left" type="monotone" dataKey="wind" stroke="#387908" name="Wind (m/s)" strokeWidth={3} dot={{ fill: '#387908', strokeWidth: 2, r: 4 }} />
                <Line yAxisId="left" type="monotone" dataKey="pressure" stroke="#8884d8" name="Pressure (Pa)" strokeWidth={3} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center' }}>
            {data.sol_keys.map(sol => (
              <div key={sol} style={{ marginBottom: 10 }}>
                <strong>SOL {sol}</strong>: Avg Temp: {data[sol].AT?.av}°C, Wind: {data[sol].HWS?.av} m/s, Pressure: {data[sol].PRE?.av} Pa
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherSection; 