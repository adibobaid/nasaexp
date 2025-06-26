# NASA Explorer

A modern, full-stack web application to explore NASA's open data, featuring Astronomy Picture of the Day, Mars Rover Photos, Near Earth Objects, EPIC images, and Mars weather data. Built with React frontend and Node.js backend deployed on Google Cloud Run.

---

## 🚀 Features

- **APOD (Astronomy Picture of the Day)** - View NASA's daily space image with date selection
- **Mars Rover Photos** - Browse photos from Curiosity, Opportunity, Spirit, and Perseverance rovers
- **Near Earth Objects (NEO)** - Interactive charts showing hazardous vs non-hazardous asteroids
- **NASA Image Library** - Search and browse NASA's extensive image collection
- **EPIC Images** - View Earth from space with the DSCOVR satellite
- **Mars Weather** - Real-time weather data from the InSight lander with temperature charts
- **Responsive Design** - Modern dashboard layout with sidebar navigation
- **Interactive Charts** - Beautiful data visualization using Recharts

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Recharts** - Interactive charts and data visualization
- **CSS3** - Custom styling with modern design patterns
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment
- **Google Cloud Run** - Backend deployment (serverless)
- **Docker** - Containerization for backend
- **NASA Open APIs** - Data source

---

## 📁 Project Structure

```
nasa/
├── backend/                 # Backend API server
│   ├── index.js            # Main server file
│   ├── package.json        # Backend dependencies
│   ├── Dockerfile          # Docker configuration
│   └── .dockerignore       # Docker ignore file
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ApodSection.js
│   │   │   ├── MarsPhotosSection.js
│   │   │   ├── NeoSection.js
│   │   │   ├── ImagesSection.js
│   │   │   ├── EpicSection.js
│   │   │   ├── WeatherSection.js
│   │   │   ├── Sidebar.js
│   │   │   └── DashboardHeader.js
│   │   ├── App.js          # Main App component
│   │   ├── App.css         # Main styles
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd nasa
```

### 2. Backend Setup (Local Development)
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NASA_API_KEY=your_nasa_api_key_here
PORT=5000
```

Start the backend server:
```bash
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## 🌐 API Endpoints

### Backend API (Google Cloud Run)
**Base URL:** `https://nasa-backend-ermi4cllza-uc.a.run.app`

- `GET /api/apod?date=YYYY-MM-DD` - Astronomy Picture of the Day
- `GET /api/mars-photos?rover=curiosity&earth_date=YYYY-MM-DD&camera=FHAZ&page=1` - Mars Rover Photos
- `GET /api/neo?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Near Earth Objects
- `GET /api/images?q=moon&media_type=image&year_start=2022&page=1` - NASA Image Library
- `GET /api/epic?date=YYYY-MM-DD` - EPIC Earth images
- `GET /api/insight-weather` - Mars InSight Weather data

---

## 🚢 Deployment

### Backend Deployment (Google Cloud Run)
The backend is deployed on Google Cloud Run:

1. **Project ID:** `nasaexp`
2. **Service URL:** `https://nasa-backend-ermi4cllza-uc.a.run.app`
3. **Region:** `us-central1`

#### Deployment Commands:
```bash
# Set project
gcloud config set project nasaexp

# Enable APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Deploy
gcloud run deploy nasa-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NASA_API_KEY=your_api_key"
```

### Frontend Deployment
The frontend can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Firebase Hosting**

Update API URLs in frontend components to point to the deployed backend.

---

## 🧑‍💻 Usage

1. **Start the application** (see setup instructions above)
2. **Navigate through sections** using the sidebar:
   - **APOD** - View daily space images
   - **Mars Photos** - Browse rover images with filters
   - **NEO** - Explore near-Earth objects with charts
   - **Images** - Search NASA's image library
   - **EPIC** - View Earth from space
   - **Mars Weather** - Check Mars weather data
3. **Use filters and controls** to customize your data
4. **Enjoy interactive charts** and responsive design

---

## 🔧 Development

### Adding New Features
1. Create new components in `frontend/src/components/`
2. Add API endpoints in `backend/index.js`
3. Update navigation in `frontend/src/components/Sidebar.js`

### Styling
- Main styles: `frontend/src/App.css`
- Component-specific styles can be added inline or in separate CSS files

### API Integration
- Backend proxies NASA API calls
- Environment variables for API keys
- Error handling and loading states

---

## 📊 Performance

- **Backend:** Serverless deployment with automatic scaling
- **Frontend:** Optimized React components with lazy loading
- **Charts:** Efficient data visualization with Recharts
- **Images:** Optimized loading and caching

---

## 🔒 Security

- API keys stored as environment variables
- CORS configured for production domains
- Input validation on API endpoints
- Secure HTTPS communication

---

## 📝 License

This project is for educational and demonstration purposes. NASA content is in the public domain, but please check NASA's [media usage guidelines](https://www.nasa.gov/multimedia/guidelines/index.html) for details.

---

## 🙏 Credits

- [NASA Open APIs](https://api.nasa.gov/) - Data source
- [Recharts](https://recharts.org/) - Chart library
- [Google Cloud Platform](https://cloud.google.com/) - Backend hosting
- NASA logo and imagery © NASA

---

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify API key is correctly set
3. Ensure backend is running and accessible
4. Check network connectivity to NASA APIs 