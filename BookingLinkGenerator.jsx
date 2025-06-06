// BookingLinkGenerator.jsx - Final Working Version (Carpet + Moving)

import React, { useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [generatorType, setGeneratorType] = useState('Carpet Cleaning');
  const [salesRep, setSalesRep] = useState('');
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM');

  // Moving-specific fields
  const [firstBlockPrice, setFirstBlockPrice] = useState('');
  const [blockDuration, setBlockDuration] = useState('2');
  const [additionalHourlyRate, setAdditionalHourlyRate] = useState('');
  const [numMovers, setNumMovers] = useState('');
  const [numTrucks, setNumTrucks] = useState('');
  const [truckSize, setTruckSize] = useState('');

  const generateLink = () => {
    const arrivalStart = arrivalWindow.split(' - ')[0];
    const arrivalEnd = arrivalWindow.split(' - ')[1];

    let bookingSummary = `*${salesRep}*\n`;
    let baseUrl = '';
    let extraParams = '';

    if (generatorType === 'Carpet Cleaning') {
      baseUrl = 'https://form.jotform.com/251536451249054';
      bookingSummary += `${serviceType}\n$${quotedPrice} Special\nArrival between ${arrivalWindow}\n`;
      bookingSummary += `Payment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;

      extraParams = `service=${encodeURIComponent(serviceType)}&price=${encodeURIComponent(quotedPrice)}&salesRep=${encodeURIComponent(salesRep)}`;

    } else if (generatorType === 'Moving') {
      baseUrl = 'https://form.jotform.com/251537865180159';
      bookingSummary += `Moving\n$${firstBlockPrice} First ${blockDuration} Hours\n$${additionalHourlyRate} Per Hour\n`;
      bookingSummary += `Any Additional Time\n${numMovers} Movers\n${numTrucks} Truck(s)\n${truckSize} Truck Size\n`;
      bookingSummary += `Payment method: Cash Cashapp Zelle`;

      extraParams = `price=${encodeURIComponent(firstBlockPrice)}&duration=${encodeURIComponent(blockDuration)}&rate=${encodeURIComponent(additionalHourlyRate)}&movers=${encodeURIComponent(numMovers)}&trucks=${encodeURIComponent(numTrucks)}&size=${encodeURIComponent(truckSize)}&service=Moving&salesRep=${encodeURIComponent(salesRep)}`;
    }

    const fullUrl = `${baseUrl}?bookingSummary=${encodeURIComponent(bookingSummary)}&arrivalStart=${encodeURIComponent(arrivalStart)}&arrivalEnd=${encodeURIComponent(arrivalEnd)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&${extraParams}`;
    document.getElementById('generated-link').innerText = fullUrl;
    document.getElementById('generated-link').href = fullUrl;
  };

  return (
    <div className="generator-container">
      <h2>Booking Link Generator</h2>
      <label>Choose Generator:
        <select value={generatorType} onChange={(e) => setGeneratorType(e.target.value)}>
          <option>Carpet Cleaning</option>
          <option>Moving</option>
        </select>
      </label>

      <label>Sales Rep:
        <input value={salesRep} onChange={(e) => setSalesRep(e.target.value)} />
      </label>

      {generatorType === 'Carpet Cleaning' && (
        <>
          <label>Service Type:
            <input value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
          </label>
          <label>Quoted Price ($):
            <input value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
          </label>
        </>
      )}

      {generatorType === 'Moving' && (
        <>
          <label>Quoted Price for First Block ($):
            <input value={firstBlockPrice} onChange={(e) => setFirstBlockPrice(e.target.value)} />
          </label>
          <label>Duration of First Block (hours):
            <input value={blockDuration} onChange={(e) => setBlockDuration(e.target.value)} />
          </label>
          <label>Additional Hour Rate ($):
            <input value={additionalHourlyRate} onChange={(e) => setAdditionalHourlyRate(e.target.value)} />
          </label>
          <label>Number of Movers:
            <input value={numMovers} onChange={(e) => setNumMovers(e.target.value)} />
          </label>
          <label>Number of Trucks:
            <input value={numTrucks} onChange={(e) => setNumTrucks(e.target.value)} />
          </label>
          <label>Truck Size (ft):
            <input value={truckSize} onChange={(e) => setTruckSize(e.target.value)} />
          </label>
        </>
      )}

      <label>Arrival Window:
        <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
          <option>8 AM - 12 PM</option>
          <option>10 AM - 2 PM</option>
          <option>12 PM - 4 PM</option>
          <option>3 PM - 7 PM</option>
        </select>
      </label>

      <button onClick={generateLink}>Generate Booking Link</button>
      <p>Generated Link:</p>
      <a id="generated-link" href="" target="_blank" rel="noreferrer"></a>
    </div>
  );
}

export default BookingLinkGenerator;
