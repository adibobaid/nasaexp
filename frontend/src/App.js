/**
 * NASA Explorer - Main Application Component
 * 
 * This is the root component of the NASA Explorer application.
 * It manages the overall layout, navigation state, and renders the appropriate
 * section components based on user selection.
 * 
 * Features:
 * - Dashboard layout with sidebar navigation
 * - Section-based content rendering
 * - Responsive design support
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import ApodSection from './components/ApodSection';
import MarsPhotosSection from './components/MarsPhotosSection';
import NeoSection from './components/NeoSection';
import ImagesSection from './components/ImagesSection';
import EpicSection from './components/EpicSection';
import WeatherSection from './components/WeatherSection';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';


function App() {
  // State to track the currently selected section
  const [section, setSection] = useState('apod');

  return (
    <div className="dashboard-layout">
      {/* Sidebar navigation component */}
      <Sidebar section={section} setSection={setSection} />
      
      {/* Main content area */}
      <div className="dashboard-main">
        {/* Header showing current section title */}
        <DashboardHeader section={section} />
        
        {/* Dynamic content area - renders different sections based on state */}
        <main className="dashboard-content">
          {section === 'apod' && <ApodSection />}
          {section === 'mars' && <MarsPhotosSection />}
          {section === 'neo' && <NeoSection />}
          {section === 'images' && <ImagesSection />}
          {section === 'epic' && <EpicSection />}
          {section === 'weather' && <WeatherSection />}
        </main>
      </div>
    </div>
  );
}

export default App;
