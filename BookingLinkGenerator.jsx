import React, { useState } from 'react';
import './BookingLinkGenerator.css';

import CarpetCleaningFields from './CarpetCleaningFields';
import MovingFields from './MovingFields';
import DuctCleaningFields from './DuctCleaningFields';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return <CarpetCleaningFields />;
    } else if (selectedGenerator === 'Moving') {
      return <MovingFields />;
    } else if (selectedGenerator === 'Duct Cleaning') {
      return <DuctCleaningFields />;
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
