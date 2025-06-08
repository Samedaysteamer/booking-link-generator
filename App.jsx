import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');
  const [salesRep, setSalesRep] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    let baseURL = '';
    let summary = '';

    if (selectedGenerator === 'Carpet Cleaning') {
      baseURL = 'https://form.jotform.com/251536451249054';
      summary = `Service: ${serviceType}\nPrice: $${quotedPrice}\nArrival Window: ${arrivalWindow}`;
    } else if (selectedGenerator === 'Moving') {
      baseURL = 'https://form.jotform.com/251563653506154';
      summary = `Sales Rep: ${salesRep}\n$${quotedPrice} for the first 2 hours, $149 for any additional.`;
    } else if (selectedGenerator === 'Duct Cleaning') {
      baseURL = 'https://form.jotform.com/251573697976175';
      summary = `Service: ${serviceType}\nPrice: $${quotedPrice}\nArrival Window: ${arrivalWindow}`;
    }

    const link = `${baseURL}?service=${encodeURIComponent(serviceType)}&price=${encodeURIComponent(quotedPrice)}&salesRep=${encodeURIComponent(salesRep)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&arrivalStart=${encodeURIComponent(arrivalStart)}&arrivalEnd=${encodeURIComponent(arrivalEnd)}&bookingSummary=${encodeURIComponent(summary)}`;
    setGeneratedLink(link);
  };

  const renderFields = () => {
    if (selectedGenerator === 'Carpet Cleaning') {
      return (
        <div>
          <label>Sales Rep:</label>
          <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
            <option value="">Select</option>
            <option value="*01*">*01*</option>
            <option value="*02*">*02*</option>
          </select>

          <label>Service Type:</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Upholstery Cleaning">Upholstery Cleaning</option>
            <option value="Mattress Cleaning">Mattress Cleaning</option>
            <option value="Duct Cleaning">Duct Cleaning</option>
          </select>

          <label>Quoted Price ($):</label>
          <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />

          <label>Arrival Window:</label>
          <select value={arrivalWindow} onChange={(e) => {
            setArrivalWindow(e.target.value);
            const [start, end] = e.target.value.split(' - ');
            setArrivalStart(start);
            setArrivalEnd(end);
          }}>
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
        <div>
          <label>Sales Rep:</label>
          <input type="text" value={salesRep} onChange={(e) => setSalesRep(e.target.value)} />

          <label>Quoted Price ($):</label>
          <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />

          <label>Arrival Window:</label>
          <select value={arrivalWindow} onChange={(e) => {
            setArrivalWindow(e.target.value);
            const [start, end] = e.target.value.split(' - ');
            setArrivalStart(start);
            setArrivalEnd(end);
          }}>
            <option value="7 AM - 9 AM">7 AM - 9 AM</option>
            <option value="9 AM - 11 AM">9 AM - 11 AM</option>
            <option value="11 AM - 1 PM">11 AM - 1 PM</option>
            <option value="1 PM - 3 PM">1 PM - 3 PM</option>
            <option value="3 PM - 5 PM">3 PM - 5 PM</option>
          </select>
        </div>
      );
    } else if (selectedGenerator === 'Duct Cleaning') {
      return (
        <div>
          <label>Sales Rep:</label>
          <input type="text" value={salesRep} onChange={(e) => setSalesRep(e.target.value)} />

          <label>Service Type:</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="Basic Duct Cleaning">Basic Duct Cleaning</option>
            <option value="Deep Duct Cleaning">Deep Duct Cleaning</option>
          </select>

          <label>Quoted Price ($):</label>
          <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />

          <label>Arrival Window:</label>
          <select value={arrivalWindow} onChange={(e) => {
            setArrivalWindow(e.target.value);
            const [start, end] = e.target.value.split(' - ');
            setArrivalStart(start);
            setArrivalEnd(end);
          }}>
            <option value="8 AM - 12 PM">8 AM - 12 PM</option>
            <option value="1 PM - 5 PM">1 PM - 5 PM</option>
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
      <select value={selectedGenerator} onChange={(e) => setSelectedGenerator(e.target.value)}>
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Moving">Moving</option>
        <option value="Duct Cleaning">Duct Cleaning</option>
      </select>

      {renderFields()}

      <button onClick={handleGenerateLink}>Generate Booking Link</button>

      {generatedLink && (
        <div>
          <p>Generated Link:</p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a>
        </div>
      )}
    </div>
  );
}
