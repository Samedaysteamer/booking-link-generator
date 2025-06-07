import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return (
        <div>
          {/* Carpet Cleaning Fields */}
          <label>Arrival Window:</label>
          <select>
            <option value="8–12">8–12</option>
            <option value="10–2">10–2</option>
            <option value="12–4">12–4</option>
            <option value="1–5">1–5</option>
            <option value="3–7">3–7</option>
          </select>
        </div>
      );
    } else if (selectedGenerator === 'Moving') {
      return (
        <div>
          {/* Moving Fields */}
          <label>Arrival Window:</label>
          <select>
            <option value="7–9">7–9</option>
            <option value="9–11">9–11</option>
            <option value="11–1">11–1</option>
            <option value="1–3">1–3</option>
            <option value="3–5">3–5</option>
          </select>
        </div>
      );
    } else if (selectedGenerator === 'Duct Cleaning') {
      return (
        <div>
          {/* Duct Cleaning Fields */}
          <label>Arrival Window:</label>
          <select>
            <option value="8–12">8–12</option>
            <option value="1–5">1–5</option>
          </select>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="booking-link-generator">
      <h2>Booking Link Generator</h2>
      <label>Choose Generator:</label>
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

