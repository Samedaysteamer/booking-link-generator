// BookingLinkGenerator.jsx

import React, { useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM');
  const [arrivalStart, setArrivalStart] = useState('8 AM');
  const [arrivalEnd, setArrivalEnd] = useState('12 PM');
  const [salesRep, setSalesRep] = useState('');
  const [numberOfMovers, setNumberOfMovers] = useState('');
  const [numberOfTrucks, setNumberOfTrucks] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [additionalHourlyRate, setAdditionalHourlyRate] = useState('');

  const generateLink = () => {
    let summary = `*${salesRep}*\n${serviceType}\n$${quotedPrice} Special\nArrival between ${arrivalWindow}`;

    if (serviceType === 'Carpet Cleaning') {
      summary += `\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;
    } else {
      summary += `\nPayment method: Cash Cashapp Zelle\nCashapp payment $5 fee`;
    }

    let baseUrl = serviceType === 'Moving'
      ? 'https://form.jotform.com/251537865180159'
      : 'https://form.jotform.com/251536451249054';

    let link = `${baseUrl}?bookingSummary=${encodeURIComponent(summary)}`;
    link += `&arrivalStart=${encodeURIComponent(arrivalStart)}`;
    link += `&arrivalEnd=${encodeURIComponent(arrivalEnd)}`;
    link += `&arrivalWindow=${encodeURIComponent(arrivalWindow)}`;
    link += `&service=${encodeURIComponent(serviceType)}`;
    link += `&price=${quotedPrice}`;
    link += `&salesRep=${encodeURIComponent(salesRep)}`;

    if (serviceType === 'Moving') {
      link += `&movers=${encodeURIComponent(numberOfMovers)}`;
      link += `&trucks=${encodeURIComponent(numberOfTrucks)}`;
      link += `&truckSize=${encodeURIComponent(truckSize)}`;
      link += `&additionalRate=${encodeURIComponent(additionalHourlyRate)}`;
    }

    const linkTag = document.getElementById('generated-link');
    linkTag.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
    window.open(link, '_blank');
  };

  return (
    <div className="generator-container">
      <h2>Booking Link Generator</h2>

      <label>
        Service Type:
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          <option value="Carpet Cleaning">Carpet Cleaning</option>
          <option value="Moving">Moving</option>
        </select>
      </label>

      <label>
        Quoted Price:
        <input type="text" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
      </label>

      <label>
        Arrival Window:
        <input type="text" value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)} />
      </label>

      <label>
        Arrival Start:
        <input type="text" value={arrivalStart} onChange={(e) => setArrivalStart(e.target.value)} />
      </label>

      <label>
        Arrival End:
        <input type="text" value={arrivalEnd} onChange={(e) => setArrivalEnd(e.target.value)} />
      </label>

      <label>
        Sales Rep:
        <input type="text" value={salesRep} onChange={(e) => setSalesRep(e.target.value)} />
      </label>

      {serviceType === 'Moving' && (
        <>
          <label>
            Number of Movers:
            <input type="text" value={numberOfMovers} onChange={(e) => setNumberOfMovers(e.target.value)} />
          </label>

          <label>
            Number of Trucks:
            <input type="text" value={numberOfTrucks} onChange={(e) => setNumberOfTrucks(e.target.value)} />
          </label>

          <label>
            Truck Size:
            <input type="text" value={truckSize} onChange={(e) => setTruckSize(e.target.value)} />
          </label>

          <label>
            Additional Hourly Rate:
            <input type="text" value={additionalHourlyRate} onChange={(e) => setAdditionalHourlyRate(e.target.value)} />
          </label>
        </>
      )}

      <button onClick={generateLink}>Generate Link</button>

      <div id="generated-link" className="output-link" />
    </div>
  );
}

export default BookingLinkGenerator;
