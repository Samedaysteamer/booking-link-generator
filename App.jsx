import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return (
        <div className="carpet-cleaning-fields">
          <label>Sales Rep:</label><br />
          <select name="salesRep">
            <option value="*01*">*01*</option>
            <option value="*02*">*02*</option>
            <option value="*03*">*03*</option>
          </select><br /><br />

          <label>Service Type:</label><br />
          <select name="service">
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Upholstery Cleaning">Upholstery Cleaning</option>
            <option value="Mattress Cleaning">Mattress Cleaning</option>
          </select><br /><br />

          <label>Quoted Price ($):</label><br />
          <input type="number" name="price" /><br /><br />

          <label>Arrival Window:</label><br />
          <select name="arrivalWindow">
            <option value="8 AM - 12 PM">8 AM - 12 PM</option>
            <option value="10 AM - 2 PM">10 AM - 2 PM</option>
            <option value="12 PM - 4 PM">12 PM - 4 PM</option>
            <option value="1 PM - 5 PM">1 PM - 5 PM</option>
            <option value="3 PM - 7 PM">3 PM - 7 PM</option>
          </select><br /><br />
        </div>
      );
    } else if (selectedGenerator === 'Moving') {
      return (
        <div className="moving-fields">
          <label>Sales Rep:</label><br />
          <select name="salesRep">
            <option value="*01*">*01*</option>
            <option value="*02*">*02*</option>
            <option value="*03*">*03*</option>
          </select><br /><br />

          <label>Truck Size:</label><br />
          <input type="text" name="truckSize" /><br /><br />

          <label>Quoted Price ($):</label><br />
          <input type="number" name="price" /><br /><br />

          <label>Arrival Window:</label><br />
          <select name="arrivalWindow">
            <option value="7 AM - 9 AM">7 AM - 9 AM</option>
            <option value="9 AM - 11 AM">9 AM - 11 AM</option>
            <option value="11 AM - 1 PM">11 AM - 1 PM</option>
            <option value="1 PM - 3 PM">1 PM - 3 PM</option>
            <option value="3 PM - 5 PM">3 PM - 5 PM</option>
          </select><br /><br />
        </div>
      );
    } else if (selectedGenerator === 'Duct Cleaning') {
      return (
        <div className="duct-cleaning-fields">
          <label>Sales Rep:</label><br />
          <select name="salesRep">
            <option value="*01*">*01*</option>
            <option value="*02*">*02*</option>
            <option value="*03*">*03*</option>
          </select><br /><br />

          <label>Service Type:</label><br />
          <select name="service">
            <option value="Basic Duct Cleaning">Basic Duct Cleaning</option>
            <option value="Deep Duct Cleaning">Deep Duct Cleaning</option>
          </select><br /><br />

          <label>Quoted Price ($):</label><br />
          <input type="number" name="price" /><br /><br />

          <label>Arrival Window:</label><br />
          <select name="arrivalWindow">
            <option value="8 AM - 12 PM">8 AM - 12 PM</option>
            <option value="1 PM - 5 PM">1 PM - 5 PM</option>
          </select><br /><br />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="booking-link-generator">
      <h2>Booking Link Generator</h2>
      <label htmlFor="generator-select">Choose Generator:</label><br />
      <select
        id="generator-select"
        value={selectedGenerator}
        onChange={(e) => setSelectedGenerator(e.target.value)}
      >
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Moving">Moving</option>
        <option value="Duct Cleaning">Duct Cleaning</option>
      </select><br /><br />

      {renderFields()}

      <button>Generate Booking Link</button>
    </div>
  );
}
