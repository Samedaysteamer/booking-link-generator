import React, { useState } from 'react';
import './BookingLinkGenerator.css';

export default function App() {
  // Carpet Cleaning States
  const [carpetService, setCarpetService] = useState('Carpet Cleaning');
  const [carpetPrice, setCarpetPrice] = useState('');
  const [carpetArrival, setCarpetArrival] = useState('8 AM - 12 PM');
  const [carpetSalesRep, setCarpetSalesRep] = useState('');
  const [carpetLink, setCarpetLink] = useState('');

  // Moving Service States
  const [movingSalesRep, setMovingSalesRep] = useState('');
  const [firstBlockDuration, setFirstBlockDuration] = useState('');
  const [firstBlockPrice, setFirstBlockPrice] = useState('');
  const [additionalHourlyRate, setAdditionalHourlyRate] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('Arrival between 7 and 9');
  const [numberOfMovers, setNumberOfMovers] = useState('');
  const [truckInfo, setTruckInfo] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [movingLink, setMovingLink] = useState('');

  const generateCarpetLink = () => {
    const summary = `${carpetSalesRep}\n${carpetService}\n$${carpetPrice} Special\nArrival between ${carpetArrival}\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;
    const baseUrl = 'https://form.jotform.com/251536451249054';
    const params = new URLSearchParams();
    params.append('serviceType', carpetService);
    params.append('quotedPrice', carpetPrice);
    params.append('arrivalWindow', carpetArrival);
    params.append('salesRep', carpetSalesRep);
    params.append('bookingSummary', encodeURIComponent(summary));
    setCarpetLink(`${baseUrl}?${params.toString()}`);
  };

  const generateMovingLink = () => {
    const firstBlockLabel = `***First ${firstBlockDuration}hrs due at arrival***`;
    const formattedArrival = arrivalWindow;
    const summary = `${movingSalesRep}\n$${firstBlockPrice} First ${firstBlockDuration} Hours $${additionalHourlyRate} Per Hour\nAny Additional Hour After that\n${formattedArrival}\n${numberOfMovers} Men ${truckInfo} ${truckSize} Ft Trucks\nPayment methods:\nCash, CashApp, Zelle\nCashApp payment $5 fee\n\n${firstBlockLabel}`;
    const baseUrl = 'https://form.jotform.com/251537865180159';
    const params = new URLSearchParams();
    params.append('salesRep', movingSalesRep);
    params.append('firstBlockDuration', firstBlockDuration);
    params.append('firstBlockPrice', firstBlockPrice);
    params.append('additionalHourlyRate', additionalHourlyRate);
    params.append('arrivalWindow', arrivalWindow);
    params.append('numberOfMovers', numberOfMovers);
    params.append('truckInfo', truckInfo);
    params.append('truckSize', truckSize);
    params.append('bookingSummary', encodeURIComponent(summary));
    setMovingLink(`${baseUrl}?${params.toString()}`);
  };

  return (
    <div className="container">
      <h2>Carpet Cleaning Booking Generator</h2>
      <div className="form-group">
        <label>Sales Rep:</label>
        <select value={carpetSalesRep} onChange={(e) => setCarpetSalesRep(e.target.value)}>
          <option value=""></option>
          <option value="*01*">*01*</option>
          <option value="*02*">*02*</option>
          <option value="*03*">*03*</option>
        </select>
      </div>
      <div className="form-group">
        <label>Service Type:</label>
        <select value={carpetService} onChange={(e) => setCarpetService(e.target.value)}>
          <option>Carpet Cleaning</option>
          <option>Upholstery Cleaning</option>
          <option>Duct Cleaning</option>
          <option>Mattress Cleaning</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quoted Price ($):</label>
        <input type="number" value={carpetPrice} onChange={(e) => setCarpetPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Arrival Window:</label>
        <select value={carpetArrival} onChange={(e) => setCarpetArrival(e.target.value)}>
          <option>8 AM - 12 PM</option>
          <option>10 AM - 2 PM</option>
          <option>12 PM - 4 PM</option>
          <option>1 PM - 5 PM</option>
          <option>3 PM - 7 PM</option>
        </select>
      </div>
      <button onClick={generateCarpetLink}>Generate Carpet Link</button>
      {carpetLink && <div className="result"><a href={carpetLink} target="_blank">{carpetLink}</a></div>}

      <hr />

      <h2>Moving Service Booking Generator</h2>
      <div className="form-group">
        <label>Sales Rep:</label>
        <select value={movingSalesRep} onChange={(e) => setMovingSalesRep(e.target.value)}>
          <option value=""></option>
          <option value="*01*">*01*</option>
          <option value="*02*">*02*</option>
          <option value="*03*">*03*</option>
        </select>
      </div>
      <div className="form-group">
        <label>Duration of First Block (Hours):</label>
        <input type="number" value={firstBlockDuration} onChange={(e) => setFirstBlockDuration(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Price for First Block ($):</label>
        <input type="number" value={firstBlockPrice} onChange={(e) => setFirstBlockPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Additional Hourly Rate ($):</label>
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
          <option value="(2)"> (2)</option>
        </select>
      </div>
      <div className="form-group">
        <label>Truck Size (ft):</label>
        <input type="number" value={truckSize} onChange={(e) => setTruckSize(e.target.value)} />
      </div>
      <button onClick={generateMovingLink}>Generate Moving Link</button>
      {movingLink && <div className="result"><a href={movingLink} target="_blank">{movingLink}</a></div>}
    </div>
  );
}
