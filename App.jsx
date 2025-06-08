import React, { useState, useEffect } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');
  const [salesRep, setSalesRep] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM');
  const [generatedLink, setGeneratedLink] = useState('');

  useEffect(() => {
    if (selectedGenerator === 'Carpet Cleaning') {
      setService('Carpet Cleaning');
    } else if (selectedGenerator === 'Duct Cleaning') {
      setService('Basic Duct Cleaning');
    } else if (selectedGenerator === 'Moving') {
      setService('Moving');
    }
  }, [selectedGenerator]);

  const generateLink = () => {
    let baseUrl = '';
    if (selectedGenerator === 'Carpet Cleaning') {
      baseUrl = 'https://form.jotform.com/251536451249054';
    } else if (selectedGenerator === 'Moving') {
      baseUrl = 'https://form.jotform.com/251573697976175';
    } else if (selectedGenerator === 'Duct Cleaning') {
      baseUrl = 'https://form.jotform.com/251573697976175';
    }

    const url = `${baseUrl}?salesRep=${encodeURIComponent(salesRep)}&service=${encodeURIComponent(service)}&price=${encodeURIComponent(price)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}`;
    setGeneratedLink(url);
  };

  const renderFields = () => {
    return (
      <div>
        <label>Sales Rep:</label>
        <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
          <option value=""> </option>
          <option value="*01*">*01*</option>
          <option value="*02*">*02*</option>
          <option value="*03*">*03*</option>
        </select>

        <label>Service Type:</label>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          {selectedGenerator === 'Carpet Cleaning' && (
            <>
              <option value="Carpet Cleaning">Carpet Cleaning</option>
              <option value="Upholstery Cleaning">Upholstery Cleaning</option>
              <option value="Mattress Cleaning">Mattress Cleaning</option>
            </>
          )}
          {selectedGenerator === 'Duct Cleaning' && (
            <>
              <option value="Basic Duct Cleaning">Basic Duct Cleaning</option>
              <option value="Deep Duct Cleaning">Deep Duct Cleaning</option>
              <option value="Basic Duct Cleaning with Furnace">Basic Duct Cleaning with Furnace</option>
              <option value="Deep Duct Cleaning with Furnace">Deep Duct Cleaning with Furnace</option>
              <option value="Basic Duct Cleaning with Dryer Vent Cleaning">Basic Duct Cleaning with Dryer Vent Cleaning</option>
              <option value="Deep Duct Cleaning with Dryer Vent Cleaning">Deep Duct Cleaning with Dryer Vent Cleaning</option>
              <option value="Basic Duct Cleaning with Furnace and Dryer Vent Cleaning">Basic Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
              <option value="Deep Duct Cleaning with Furnace and Dryer Vent Cleaning">Deep Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
            </>
          )}
          {selectedGenerator === 'Moving' && (
            <>
              <option value="Moving">Moving</option>
            </>
          )}
        </select>

        <label>Quoted Price ($):</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Arrival Window:</label>
        <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
          {selectedGenerator === 'Carpet Cleaning' && (
            <>
              <option value="8 AM - 12 PM">8 AM - 12 PM</option>
              <option value="12 PM - 4 PM">12 PM - 4 PM</option>
              <option value="1 PM - 5 PM">1 PM - 5 PM</option>
              <option value="3 PM - 7 PM">3 PM - 7 PM</option>
            </>
          )}
          {selectedGenerator === 'Duct Cleaning' && (
            <>
              <option value="8 AM - 12 PM">8 AM - 12 PM</option>
              <option value="1 PM - 5 PM">1 PM - 5 PM</option>
            </>
          )}
          {selectedGenerator === 'Moving' && (
            <>
              <option value="7 AM - 9 AM">7 AM - 9 AM</option>
              <option value="9 AM - 11 AM">9 AM - 11 AM</option>
              <option value="11 AM - 1 PM">11 AM - 1 PM</option>
              <option value="1 PM - 3 PM">1 PM - 3 PM</option>
              <option value="3 PM - 5 PM">3 PM - 5 PM</option>
            </>
          )}
        </select>
      </div>
    );
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

      <button onClick={generateLink}>Generate Booking Link</button>

      {generatedLink && (
        <div>
          <p>Generated Link:</p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
}
