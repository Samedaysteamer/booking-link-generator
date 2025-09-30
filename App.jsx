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

  const [generatedLink, setGeneratedLink] = useState(''); // short link to send
  const [rawLink, setRawLink] = useState('');             // long link for debug/backup

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

      if (arrivalWindow === 'Arrival between 8 and 12') {
        arrivalStart = '8 AM';
        arrivalEnd = '12 PM';
      } else if (arrivalWindow === 'Arrival between 10 and 2') {
        arrivalStart = '10 AM';
        arrivalEnd = '2 PM';
      } else if (arrivalWindow === 'Arrival between 12 and 4') {
        arrivalStart = '12 PM';
        arrivalEnd = '4 PM';
      } else if (arrivalWindow === 'Arrival between 1 and 5') {
        arrivalStart = '1 PM';
        arrivalEnd = '5 PM';
      } else if (arrivalWindow === 'Arrival between 3 and 7') {
        arrivalStart = '3 PM';
        arrivalEnd = '7 PM';
      }
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

      if (movingArrival === 'Arrival between 7 and 9') {
        arrivalStart = '7 AM';
        arrivalEnd = '9 AM';
      } else if (movingArrival === 'Arrival between 9 to 11') {
        arrivalStart = '9 AM';
        arrivalEnd = '11 AM';
      } else if (movingArrival === 'Arrival between 11 and 1') {
        arrivalStart = '11 AM';
        arrivalEnd = '1 PM';
      } else if (movingArrival === 'Arrival between 1 and 3') {
        arrivalStart = '1 PM';
        arrivalEnd = '3 PM';
      } else if (movingArrival === 'Arrival between 3 to 5') {
        arrivalStart = '3 PM';
        arrivalEnd = '5 PM';
      }

      setServiceType('Moving');
    }

    const encodedSummary = encodeURIComponent(summary);
    const finalService = encodeURIComponent(mode === 'moving' ? 'Moving' : serviceType);

    fullLink = `${baseUrl}?bookingSummary=${encodedSummary}` +
               `&arrivalStart=${encodeURIComponent(arrivalStart)}` +
               `&arrivalEnd=${encodeURIComponent(arrivalEnd)}` +
               `&arrivalWindow=${encodeURIComponent(arrivalWindowText)}` +
               `&service=${finalService}` +
               `&price=${quotedPrice}` +
               `&salesRep=${encodeURIComponent(salesRep)}`;

    // keep the long link visible for verification/backup
    setRawLink(fullLink);

    // ✅ Shorten server-side (no CORS, no client rewrite)
    fetch(`/api/shorten?url=${encodeURIComponent(fullLink)}`)
      .then(r => r.json())
      .then(({ shortUrl }) => setGeneratedLink(shortUrl || fullLink))
      .catch(() => setGeneratedLink(fullLink));
  };

  return (
    <div className="container">
      <h2>Booking Link Generator</h2>

      <div className="form-group">
        <label>Choose Generator:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="carpet">Carpet Cleaning</option>
          <option value="moving">Moving</option>
          <option value="duct">Duct Cleaning</option>
        </select>
      </div>

      <div className="form-group">
        <label>Sales Rep:</label>
        <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
          <option value=""> </option>
          <option value="*01*">*01*</option>
          <option value="*02*">*02*</option>
          <option value="*03*">*03*</option>
        </select>
      </div>

      {(mode === 'carpet' || mode === 'duct') && (
        <>
          <div className="form-group">
            <label>Service Type:</label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
              {mode === 'carpet' && (
                <>
                  <option>Carpet Cleaning</option>
                  <option>Upholstery Cleaning</option>
                  <option>Mattress Cleaning</option>
                </>
              )}
              {mode === 'duct' && (
                <>
                  <option value="Basic Duct Cleaning">Basic Duct Cleaning</option>
                  <option value="Deep Duct Cleaning">Deep Duct Cleaning</option>
                  <option value="Basic Duct Cleaning with Furnace">Basic Duct Cleaning with Furnace</option>
                  <option value="Deep Duct Cleaning with Furnace">Deep Duct Cleaning with Furnace</option>
                  <option value="Basic Duct Cleaning with Furnace and Dryer Vent Cleaning">Basic Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
                  <option value="Deep Duct Cleaning with Furnace and Dryer Vent Cleaning">Deep Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
                  <option value="Basic Duct Cleaning with Dryer Vent Cleaning">Basic Duct Cleaning with Dryer Vent Cleaning</option>
                  <option value="Deep Duct Cleaning with Dryer Vent Cleaning">Deep Duct Cleaning with Dryer Vent Cleaning</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Quoted Price ($):</label>
            <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Arrival Window:</label>
            <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
              {mode === 'carpet' && (
                <>
                  <option>Arrival between 8 and 12</option>
                  <option>Arrival between 10 and 2</option>
                  <option>Arrival between 12 and 4</option>
                  <option>Arrival between 1 and 5</option>
                  <option>Arrival between 3 and 7</option>
                </>
              )}
              {mode === 'duct' && (
                <>
                  <option>Arrival between 8 and 12</option>
                  <option>Arrival between 1 and 5</option>
                </>
              )}
            </select>
          </div>
        </>
      )}

      {mode === 'moving' && (
        <>
          <div className="form-group">
            <label>Quoted Price for First Block ($):</label>
            <input type="number" value={blockPrice} onChange={(e) => setBlockPrice(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Duration of First Block (hrs):</label>
            <select value={blockHours} onChange={(e) => setBlockHours(e.target.value)}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="1">1</option>
            </select>
          </div>

          <div className="form-group">
            <label>Additional Hour Rate ($):</label>
            <input type="number" value={additionalRate} onChange={(e) => setAdditionalRate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Arrival Window:</label>
            <select value={movingArrival} onChange={(e) => setMovingArrival(e.target.value)}>
              <option>Arrival between 7 and 9</option>
              <option>Arrival between 9 to 11</option>
              <option>Arrival between 11 and 1</option>
              <option>Arrival between 1 and 3</option>
              <option>Arrival between 3 to 5</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Movers:</label>
            <select value={numMovers} onChange={(e) => setNumMovers(e.target.value)}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Trucks (leave blank if one):</label>
            <select value={truckInfo} onChange={(e) => setTruckInfo(e.target.value)}>
              <option value=""></option>
              <option value="2">2</option>
            </select>
          </div>

          <div className="form-group">
            <label>Truck Size (Ft):</label>
            <select value={truckSize} onChange={(e) => setTruckSize(e.target.value)}>
              <option value="17">17</option>
              <option value="20">20</option>
              <option value="26">26</option>
            </select>
          </div>
        </>
      )}

      <button onClick={generateLink}>Generate Booking Link</button>

      {generatedLink && (
        <div className="result">
          <p><strong>Short Link:</strong></p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a>
        </div>
      )}

      {rawLink && (
        <div className="result">
          <p><strong>Long Link (Debug):</strong></p>
          <a href={rawLink} target="_blank" rel="noopener noreferrer">{rawLink}</a>
        </div>
      )}
    </div>
  );
}
