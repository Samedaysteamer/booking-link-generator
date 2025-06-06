import React, { useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const encode = (str) => encodeURIComponent(str);

  const isValidLinkFormat = (url) => {
    return url.includes('&') && url.includes('=');
  };

  const generateLink = () => {
    const summary = `*${salesRep}*\n${serviceType}\n$${quotedPrice} Special\nArrival between ${arrivalWindow}\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;

    const baseUrl = 'https://form.jotform.com/251536451249054';
    const queryParams = [
      `bookingSummary=${encode(summary)}`,
      `arrivalStart=${encode(arrivalStart)}`,
      `arrivalEnd=${encode(arrivalEnd)}`,
      `arrivalWindow=${encode(arrivalWindow)}`,
      `service=${encode(serviceType)}`,
      `price=${encode(quotedPrice)}`,
      `salesRep=${encode(`*${salesRep}*`)}`
    ];

    const url = `${baseUrl}?${queryParams.join('&')}`;

    if (isValidLinkFormat(url)) {
      setGeneratedLink(url);
    } else {
      setGeneratedLink('');
      alert('Error: Generated link is not in the correct format.');
    }
  };

  return (
    <div className="booking-generator">
      <h2>Booking Link Generator</h2>
      <input placeholder="Service Type" value={serviceType} onChange={e => setServiceType(e.target.value)} />
      <input placeholder="Quoted Price" value={quotedPrice} onChange={e => setQuotedPrice(e.target.value)} />
      <input placeholder="Arrival Window" value={arrivalWindow} onChange={e => setArrivalWindow(e.target.value)} />
      <input placeholder="Arrival Start" value={arrivalStart} onChange={e => setArrivalStart(e.target.value)} />
      <input placeholder="Arrival End" value={arrivalEnd} onChange={e => setArrivalEnd(e.target.value)} />
      <input placeholder="Sales Rep" value={salesRep} onChange={e => setSalesRep(e.target.value)} />
      <button onClick={generateLink}>Generate Link</button>
      {generatedLink && (
        <div className="generated-link">
          <p>Generated Link:</p>
          <textarea value={generatedLink} readOnly rows={6} />
        </div>
      )}
    </div>
  );
}

export default BookingLinkGenerator;
