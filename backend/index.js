// Import required modules and initialize Express app
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Root endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('NASA API Proxy Server is running!');
});

// Proxy endpoint for NASA Astronomy Picture of the Day (APOD) API
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_API_KEY,
        ...req.query // allow date or other query params to be passed
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD from NASA API', details: error.message });
  }
});

// Proxy endpoint for NASA Mars Rover Photos API
app.get('/api/mars-photos', async (req, res) => {
  try {
    const { rover = 'curiosity', earth_date, camera, page } = req.query;
    const params = {
      api_key: process.env.NASA_API_KEY,
      earth_date,
      camera,
      page
    };
    // Remove undefined params
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars Rover Photos', details: error.message });
  }
});

// Proxy endpoint for NASA Near Earth Object (NEO) Feed API
app.get('/api/neo', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const params = {
      api_key: process.env.NASA_API_KEY,
      start_date,
      end_date
    };
    // Remove undefined params
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const url = 'https://api.nasa.gov/neo/rest/v1/feed';
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NEO data', details: error.message });
  }
});

// Proxy endpoint for NASA Image and Video Library API
app.get('/api/images', async (req, res) => {
  try {
    const params = { ...req.query };
    const url = 'https://images-api.nasa.gov/search';
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NASA Images', details: error.message });
  }
});

// Proxy endpoint for NASA EPIC (Earth Polychromatic Imaging Camera) API
app.get('/api/epic', async (req, res) => {
  try {
    const { date } = req.query;
    let url = 'https://api.nasa.gov/EPIC/api/natural';
    if (date) {
      url += `/date/${date}`;
    }
    const params = { api_key: process.env.NASA_API_KEY };
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EPIC images', details: error.message });
  }
});

// Proxy endpoint for NASA Mars InSight Weather API
app.get('/api/insight-weather', async (req, res) => {
  try {
    const url = 'https://api.nasa.gov/insight_weather/';
    const params = {
      api_key: process.env.NASA_API_KEY,
      feedtype: 'json',
      ver: '1.0'
    };
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars InSight Weather', details: error.message });
  }
});

// Proxy endpoint for NASA NEO Browse API
app.get('/api/neo-browse', async (req, res) => {
  try {
    const { page, size } = req.query;
    const params = {
      api_key: process.env.NASA_API_KEY,
      page,
      size
    };
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse';
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to browse NEOs', details: error.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
