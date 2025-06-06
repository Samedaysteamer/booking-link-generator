// FINAL WORKING VERSION: Booking Link Generator (with correct URL structure)

import React, { useEffect, useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const formUrl = 'https://form.jotform.com/251536451249054';

  const handleGenerateLink = () => {
    const bookingSummary = `*${salesRep}*\n${serviceType}\n$${quotedPrice} Special\nArrival between ${arrivalWindow}\nPayment method: ${paymentMethod}`;

    if (serviceType === 'Carpet Cleaning') {
      if (paymentMethod.toLowerCase().includes('card')) {
        bookingSummary += `\nCard payment: 7% processing fee`;
      }
    }

    const fullUrl = `${formUrl}?bookingSummary=${encodeURIComponent(bookingSummary)}&arrivalStart=${encodeURIComponent(arrivalStart)}&arrivalEnd=${encodeURIComponent(arrivalEnd)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&service=${encodeURIComponent(serviceType)}&price=${encodeURIComponent(quotedPrice)}&salesRep=${encodeURIComponent(`*${salesRep}*`)}`;

    setGeneratedLink(fullUrl);
  };

  return (
    <div className="booking-generator">
      <h2>Booking Link Generator</h2>

      <label>Service Type:</label>
      <input type="text" value={serviceType} onChange={(e) => setServiceType(e.target.value)} />

      <label>Quoted Price:</label>
      <input type="text" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />

      <label>Arrival Window:</label>
      <input type="text" value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)} />

      <label>Arrival Start:</label>
      <input type="text" value={arrivalStart} onChange={(e) => setArrivalStart(e.target.value)} />

      <label>Arrival End:</label>
      <input type="text" value={arrivalEnd} onChange={(e) => setArrivalEnd(e.target.value)} />

      <label>Sales Rep Code:</label>
      <input type="text" value={salesRep} onChange={(e) => setSalesRep(e.target.value)} />

      <label>Payment Method:</label>
      <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />

      <button onClick={handleGenerateLink}>Generate Link</button>

      {generatedLink && (
        <div className="result">
          <p><strong>Generated Link:</strong></p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a>
        </div>
      )}
    </div>
  );
}

export default BookingLinkGenerator;
