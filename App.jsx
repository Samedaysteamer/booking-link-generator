import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function App() {
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    const rawSummary = `${serviceType}
$${quotedPrice} Special
Arrival between ${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee

Please fill out all information so we can create your work order and secure your time frame.`;

    const encodedSummary = rawSummary.replace(/\n/g, '%0A').replace(/ /g, '%20');

    const baseUrl = 'https://form.jotform.com/251536451249054';
    const params = new URLSearchParams();
    params.append('serviceType', serviceType);
    params.append('quotedPrice', quotedPrice);
    params.append('arrivalWindow', arrivalWindow);
    params.append('bookingSummary', encodedSummary);

    const fullLink = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(fullLink);
  };

  return (
    <div className="container">
      <h2>Booking Link Generator</h2>

      <div className="form-group">
        <label>Service Type:</label>
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          <option>Carpet Cleaning</option>
          <option>Upholstery Cleaning</option>
          <option>Duct Cleaning</option>
          <option>Mattress Cleaning</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quoted Price ($):</label>
        <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Arrival Window:</label>
