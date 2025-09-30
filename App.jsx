import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function App() {
  const [mode, setMode] = useState('carpet');
  const [salesRep, setSalesRep] = useState('');
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('Arrival between 8 and 12');
  const [blockPrice, setBlockPrice] = useState('');
  const [blockHours, setBlockHours] = useState('2');
  const [additionalRate, setAdditionalRate] = useState('');
  const [movingArrival, setMovingArrival] = useState('Arrival between 7 and 9');
  const [numMovers, setNumMovers] = useState('2');
  const [truckInfo, setTruckInfo] = useState('');
  const [truckSize, setTruckSize] = useState('17');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    let summary = '';
    let baseUrl = '';
    let fullLink = '';
    let arrivalStart = '';
    let arrivalEnd = '';
    let arrivalWindowText = '';

    if (mode === 'carpet' || mode === 'duct') {
      summary = `${salesRep}
${serviceType}
$${quotedPrice} Special
${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee`;

      baseUrl = (mode === 'duct')
        ? 'https://form.jotform.com/251573697976175'
        : 'https://form.jotform.com/251536451249054';

      arrivalWindowText = arrivalWindow;

      const carpetTimes = {
        'Arrival between 8 and 12': ['8 AM', '12 PM'],
        'Arrival between 10 and 2': ['10 AM', '2 PM'],
        'Arrival between 12 and 4': ['12 PM', '4 PM'],
        'Arrival between 1 and 5': ['1 PM', '5 PM'],
        'Arrival between 3 and 7': ['3 PM', '7 PM'],
      };
      [arrivalStart, arrivalEnd] = carpetTimes[arrivalWindow] || ['', ''];
    } else {
      const truckLabel = truckInfo ? `(${truckInfo}) ` : '';
      summary = `${salesRep}
$${blockPrice} First ${blockHours} Hours Then $${additionalRate} per 
hour for each additional hour after that.
${movingArrival}
${numMovers} Men ${truckLabel}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`;

      baseUrl = 'https://form.jotform.com/251537865180159';
      arrivalWindowText = movingArrival;

      const movingTimes = {
        'Arrival between 7 and 9': ['7 AM', '9 AM'],
        'Arrival between 9 to 11': ['9 AM', '11 AM'],
        'Arrival between 11 and 1': ['11 AM', '1 PM'],
        'Arrival between 1 and 3': ['1 PM', '3 PM'],
        'Arrival between 3 to 5': ['3 PM', '5 PM'],
      };
      [arrivalStart, arrivalEnd] = movingTimes[movingArrival] || ['', ''];

      setServiceType('Moving');
    }

    const encodedSummary = encodeURIComponent(summary);
    const finalService = encodeURIComponent(mode === 'moving' ? 'Moving' : serviceType);
    fullLink = `${baseUrl}?bookingSummary=${encodedSummary}&arrivalStart=${encodeURIComponent(arrivalStart)}&arrivalEnd=${encodeURIComponent(arrivalEnd)}&arrivalWindow=${encodeURIComponent(arrivalWindowText)}&service=${finalService}&price=${quotedPrice}&salesRep=${encodeURIComponent(salesRep)}`;

    // 🔗 TinyURL shortening step
    fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(fullLink)}`)
      .then(response => response.text())
      .then(shortUrl => setGeneratedLink(shortUrl))
      .catch(() => setGeneratedLink(fullLink)); // fallback if TinyURL fails
  };

  return (
    <div className="container">
      <h2>Booking Link Generator</h2>
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
