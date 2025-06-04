import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function App() {
  const [mode, setMode] = useState('carpet');

  // Shared fields
  const [salesRep, setSalesRep] = useState('');

  // Carpet Fields
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM');

  // Moving Fields
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
    let arrivalStart = '';
    let arrivalEnd = '';
    let arrivalWindowFinal = '';

    if (mode === 'carpet') {
      summary = `${salesRep}
${serviceType}
$${quotedPrice} Special
Arrival between ${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee`;

      arrivalWindowFinal = arrivalWindow;

      const match = arrivalWindow.match(/(\d+)\s*(AM|PM).+?(\d+)\s*(AM|PM)/);
      if (match) {
        arrivalStart = `${match[1]} ${match[2]}`;
        arrivalEnd = `${match[3]} ${match[4]}`;
      }

    } else {
      const truckText = truckInfo ? `(${truckInfo}) ` : '';
      summary = `${salesRep}
$${blockPrice} First ${blockHours} Hours $${additionalRate} Per Hour
Any Additional Hour After that
${movingArrival}
${numMovers} Men ${truckText}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`;

      arrivalWindowFinal = movingArrival;

      const match = movingArrival.match(/(\d+).+?(\d+)/);
      if (match) {
        arrivalStart = `${match[1]} AM`;
        arrivalEnd = `${match[2]} ${parseInt(match[2]) > 11 ? 'PM' : 'AM'}`;
      }
    }

    const baseUrl =
      mode === 'carpet'
        ? 'https://form.jotform.com/251536451249054'
        : 'https://form.jotform.com/251537865180159';

    const params = new URLSearchParams();
    params.append('bookingSummary', summary.replace(/\n/g, '%0A'));
    params.append('arrivalStart', arrivalStart);
    params.append('arrivalEnd', arrivalEnd);
    params.append('arrivalWindow', arrivalWindowFinal);

    const fullLink = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(fullLink);
  };

  return (
    <div className="container">
      <h2>Booking Link Generator</h2>

      <div className="form-group">
        <label>Choose Generator:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="carpet">Carpet Cleaning</option>
          <option value="moving">Moving</option>
        </select>
      </div>

      <div className="form-group">
        <label>Sales Rep:</label>
        <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
          <option value=""></option>
          <option value="*01*">*01*</option>
          <option value="*02*">*02*</option>
          <option value="*03*">*03*</option>
        </select>
      </div>

      {mode === 'carpet' && (
        <>
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
            <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
              <option>8 AM - 12 PM</option>
              <option>10 AM - 2 PM</option>
              <option>12 PM - 4 PM</option>
              <option>1 PM - 5 PM</option>
              <option>3 PM - 7 PM</option>
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
            <label>Number of Trucks:</label>
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
          <p><strong>Generated Link:</strong></p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">{generatedLink}</a>
        </div>
      )}
    </div>
  );
}
