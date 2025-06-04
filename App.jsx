import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function App() {
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('Arrival between 7 and 9');
  const [salesRep, setSalesRep] = useState('');
  const [numberOfMovers, setNumberOfMovers] = useState('');
  const [durationFirstBlock, setDurationFirstBlock] = useState('');
  const [additionalHourlyRate, setAdditionalHourlyRate] = useState('');
  const [truckInfo, setTruckInfo] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    const summary = `${salesRep}
$${quotedPrice} First ${durationFirstBlock} Hours
$${additionalHourlyRate} Per Hour
Any Additional Hour After that
${arrivalWindow}
${numberOfMovers} Men ${truckInfo} ${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${durationFirstBlock}hrs due at arrival***`;

    const baseUrl = 'https://form.jotform.com/251537865180159';
    const params = new URLSearchParams();
    params.append('serviceType', serviceType);
    params.append('quotedPrice', quotedPrice);
    params.append('arrivalWindow', arrivalWindow);
    params.append('salesRep', salesRep);
    params.append('numberOfMovers', numberOfMovers);
    params.append('durationFirstBlock', durationFirstBlock);
    params.append('additionalHourlyRate', additionalHourlyRate);
    params.append('truckInfo', truckInfo);
    params.append('truckSize', truckSize);
    params.append('bookingSummary', encodeURIComponent(summary));

    const fullLink = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(fullLink);
  };

  return (
    <div className="container">
      <h2>Booking Link Generator</h2>

      <div className="form-group">
        <label>Sales Rep:</label>
        <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
          <option value=""></option>
          <option value="*01*">*01*</option>
          <option value="*02*">*02*</option>
          <option value="*03*">*03*</option>
        </select>
      </div>

      <div className="form-group">
        <label>Service Type:</label>
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          <option>Moving</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quoted Price (First Block):</label>
        <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Duration of First Block (hours):</label>
        <input type="number" value={durationFirstBlock} onChange={(e) => setDurationFirstBlock(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Additional Hourly Rate:</label>
        <input type="number" value={additionalHourlyRate} onChange={(e) => setAdditionalHourlyRate(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Arrival Window:</label>
        <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
          <option>Arrival between 7 and 9</option>
          <option>Arrival between 9 to 11</option>
          <option>Arrival between 11 and 1</option>
          <option>Arrival between 1 and 3</option>
          <option>Arrival between 3 to 5</option>
        </select>
      </div>

      <div className="form-group">
        <label>Number of Movers:</label>
        <input type="number" value={numberOfMovers} onChange={(e) => setNumberOfMovers(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Truck Info:</label>
        <select value={truckInfo} onChange={(e) => setTruckInfo(e.target.value)}>
          <option value=""></option>
          <option value="(2)">(2)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Truck Size (Ft):</label>
        <input type="number" value={truckSize} onChange={(e) => setTruckSize(e.target.value)} />
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
