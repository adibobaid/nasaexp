/**
 * Dashboard Header Component
 * 
 * This component renders the header section of the main dashboard content area.
 * It displays the title of the currently active section.
 * 
 * Features:
 * - Dynamic section title display
 * - Consistent styling with dashboard theme
 * - Responsive design support
 * 
 * @author NASA Explorer Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Available sections configuration
 * Defines all the main sections of the NASA Explorer application
 * This should match the sections array in Sidebar.js
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
 * Dashboard header component
 * 
 * @param {string} section - Currently active section key
 * 
 * @returns {JSX.Element} Dashboard header with section title
 */
function DashboardHeader({ section }) {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-section-title">
        {/* Display the label for the currently active section */}
        {sections.find(sec => sec.key === section)?.label}
      </h1>
    </header>
  );
}

export default DashboardHeader; 