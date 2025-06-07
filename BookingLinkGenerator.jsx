import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return (
        <div id="carpet-cleaning-fields">
          {/* Carpet Cleaning Fields */}
          {/* Include your carpet cleaning input fields here */}
        </div>
      );
    } else if (selectedGenerator === 'Moving') {
      return (
        <div id="moving-fields">
          {/* Moving Fields */}
          {/* Include your moving input fields here */}
        </div>
      );
    } else if (selectedGenerator === 'Duct Cleaning') {
      return (
        <div id="duct-cleaning-fields">
          {/* Duct Cleaning Fields */}
          {/* Include your duct cleaning input fields here */}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="booking-link-generator">
      <h2>Booking Link Generator</h2>
      <label htmlFor="generator-select">Choose Generator:</label>
      <select
        id="generator-select"
        value={selectedGenerator}
        onChange={(e) => setSelectedGenerator(e.target.value)}
      >
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Moving">Moving</option>
        <option value="Duct Cleaning">Duct Cleaning</option>
      </select>

      {renderFields()}
    </div>
  );
}
