import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return (
        <div id="carpet-cleaning-fields">
          <label>Sales Rep:</label>
          <input type="text" name="salesRep" />

          <label>Service Type:</label>
          <select name="service">
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Upholstery Cleaning">Upholstery Cleaning</option>
            <option value="Mattress Cleaning">Mattress Cleaning</option>
          </select>

          <label>Quoted Price ($):</label>
          <input type="number" name="price" />

          <label>Arrival Window:</label>
          <select name="arrivalWindow">
            <option value="8 AM - 12 PM">8 AM - 12 PM</option>
            <option value="10 AM - 2 PM">10 AM - 2 PM</option>
            <option value="12 PM - 4 PM">12 PM - 4 PM</option>
            <option value="1 PM - 5 PM">1 PM - 5 PM</option>
            <option value="3 PM - 7 PM">3 PM - 7 PM</option>
          </select>
        </div>
      );
    } else if (selectedGenerator === 'Moving') {
      return (
        <div id="moving-fields">
          <label>Sales Rep:</label>
          <input type="text" name="salesRep" />

          <label>Truck Size:</label>
          <input type="text" name="truckSize" />

          <label>Quoted Price ($):</label>
          <input type="number" name="price" />

          <label>Arrival Window:</label>
          <select name="arrivalWindow">
            <option value="8 AM - 12 PM">8 AM - 12 PM</option>
            <option value="10 AM - 2 PM">10 AM - 2 PM</option>
            <option value="12 PM - 4 PM">12 PM - 4 PM</option>
            <option value="1 PM - 5 PM">1 PM - 5 PM</option>
            <option value="3 PM - 7 PM">3 PM - 7 PM</option>
          </select>

          <label>Arrival Start:</label>
          <input type="text" name="arrivalStart" />

          <label>Arrival End:</label>
          <input type="text" name="arrivalEnd" />

          <label>Service Type:</label>
          <input type="text" name="service" />
        </div>
      );
    } else if (selectedGenerator === 'Duct Cleaning') {
      return (
        <div id="duct-cleaning-fields">
          <label>Sales Rep:</label>
          <input type="text" name="salesRep" />

          <label>Service Type:</label>
          <select name="service">
            <option value="Basic Duct Cleaning">Basic Duct Cleaning</option>
            <option value="Deep Duct Cleaning">Deep Duct Cleaning</option>
          </select>

          <label>Quoted Price ($):</label>
          <input type="number" name="price" />

          <label>Arrival Window:</label>
          <select name="arrivalWindow">
            <option value="8 AM - 12 PM">8 AM - 12 PM</option>
            <option value="10 AM - 2 PM">10 AM - 2 PM</option>
            <option value="12 PM - 4 PM">12 PM - 4 PM</option>
            <option value="1 PM - 5 PM">1 PM - 5 PM</option>
            <option value="3 PM - 7 PM">3 PM - 7 PM</option>
          </select>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="booking-link-generator">
      <h2>Booking Link Generator</h2>
      <label htmlFor="generator-select">Choose Generator:</label>
      <select id="generator-select" value={selectedGenerator} onChange={(e) => setSelectedGenerator(e.target.value)}>
  <option value="Carpet Cleaning">Carpet Cleaning</option>
  <option value="Moving">Moving</option>
  <option value="Duct Cleaning">Duct Cleaning</option>
</select>

      {renderFields()}
    </div>
  );
}
