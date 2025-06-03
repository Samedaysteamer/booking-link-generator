import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function LinkGenerator() {
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    const baseUrl = 'https://booking-link-generator-j3wj-mqtd2vi5w.vercel.app/';
    const link = `${baseUrl}?service=${encodeURIComponent(serviceType)}&price=${encodeURIComponent(quotedPrice)}&window=${encodeURIComponent(arrivalWindow)}`;
    setGeneratedLink(link);
  };

  return (
    <div className="container">
      <h2>Booking Link Generator</h2>
      <div className="form-group">
        <label>Service Type:</label>
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          <option>Carpet Cleaning</option>
          <option>Upholstery Cleaning</option>
          <option>Rug Cleaning</option>
          <option>Mattress Cleaning</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quoted Price ($):</label>
        <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Arrival Window:</label>
        <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
          <option>8 AM - 12 PM</option>
          <option>10 AM - 2 PM</option>
          <option>12 PM - 4 PM</option>
          <option>1 PM - 5 PM</option>
        </select>
      </div>

      <button onClick={generateLink}>Generate Booking Link</button>

      {generatedLink && (
        <div className="result">
          <p><strong>Generated Link:</strong></p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a>
        </div>
      )}
    </div>
  );
}
