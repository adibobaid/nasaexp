/**
 * Sidebar Component - Navigation Menu
 * 
 * This component renders the main navigation sidebar for the NASA Explorer app.
 * It displays the NASA logo, app title, and navigation buttons for different sections.
 * 
 * Features:
 * - NASA branding with logo and title
 * - Interactive navigation buttons with icons
 * - Active state highlighting
 * - Responsive design support
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';
import nasaLogo from '../nasa-logo.jpg';

/**
 * Available sections configuration
 * Defines all the main sections of the NASA Explorer application
 */
const sections = [
  { key: 'apod', label: 'APOD' },
  { key: 'mars', label: 'Mars Photos' },
  { key: 'neo', label: 'NEO' },
  { key: 'images', label: 'Images' },
  { key: 'epic', label: 'EPIC' },
  { key: 'weather', label: 'Mars Weather' },
];

/**
 * Section icons mapping
 * Provides emoji icons for each navigation section
 */
const sectionIcons = {
  apod: '🌌',      // Astronomy Picture of the Day
  mars: '🚗',      // Mars Rover Photos
  neo: '☄️',       // Near Earth Objects
  images: '🖼️',    // NASA Image Library
  epic: '🌍',      // Earth Polychromatic Imaging Camera
  weather: '🌡️',   // Mars Weather
};

/**
 * Sidebar navigation component
 * 
 * @param {string} section - Currently active section key
 * @param {function} setSection - Function to update the active section
 * 
 * @returns {JSX.Element} Sidebar navigation component
 */
function Sidebar({ section, setSection }) {
  return (
    <aside className="dashboard-sidebar">
      {/* NASA branding section */}
      <div className="sidebar-logo">
        <img src={nasaLogo} alt="NASA Logo" className="nasa-logo" />
        <span className="sidebar-title">NASA Explorer</span>
      </div>
      
      {/* Navigation menu */}
      <nav className="sidebar-nav">
        {sections.map(s => (
          <button
            key={s.key}
            className={section === s.key ? 'active' : ''}
            onClick={() => setSection(s.key)}
          >
            <span className="sidebar-icon">{sectionIcons[s.key]}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar; 