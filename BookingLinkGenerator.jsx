import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return (
        <div>
          {/* Carpet Cleaning Fields */}
          {/* Include your carpet cleaning input fields here */}
        </div>
      );
    } else if (selectedGenerator === 'Moving') {
      return (
        <div>
          {/* Moving Fields */}
          {/* Include your moving input fields here */}
        </div>
      );
    } else if (selectedGenerator === 'Duct Cleaning') {
      return (
        <div>
          {/* Duct Cleaning Fields */}
          {/* Include your duct cleaning input fields here */}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="booking-link-generator">
      <h2>Choose Generator</h2>
      <select
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
