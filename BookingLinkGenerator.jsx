import React, { useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [numberOfMovers, setNumberOfMovers] = useState('');
  const [numberOfTrucks, setNumberOfTrucks] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [additionalRate, setAdditionalRate] = useState('');
  const [bookingLink, setBookingLink] = useState('');

  const generateLink = () => {
    let summary = `*${salesRep}*\n${serviceType}\n$${quotedPrice} Special\nArrival between ${arrivalWindow}`;

    if (serviceType === 'Carpet Cleaning') {
      summary += `\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;
    } else {
      summary += `\nPayment method: Cash Cashapp Zelle\nCashapp payment: $5 fee`;
    }

    const baseUrl =
      serviceType === 'Carpet Cleaning'
        ? 'https://form.jotform.com/251536451249054'
        : 'https://form.jotform.com/251537865180159';

    let params = new URLSearchParams();
    params.append('bookingSummary', summary);
    params.append('arrivalWindow', arrivalWindow);
    params.append('arrivalStart', arrivalStart);
    params.append('arrivalEnd', arrivalEnd);
    params.append('service', serviceType);
    params.append('price', quotedPrice);
    params.append('salesRep', salesRep);

    if (serviceType === 'Moving') {
      params.append('numberOfMovers', numberOfMovers);
      params.append('numberOfTrucks', numberOfTrucks);
      params.append('truckSize', truckSize);
      params.append('additionalRate', additionalRate);
    }

    const finalLink = `${baseUrl}?${params.toString()}`;
    setBookingLink(finalLink);
    window.open(finalLink, '_blank');
  };

  return (
    <div className="booking-generator">
      <h2>Booking Link Generator</h2>

      <label>Service Type:</label>
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Moving">Moving</option>
      </select>

      <label>Quoted Price:</label>
      <input value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />

      <label>Arrival Window:</label>
      <input value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)} />
      <label>Arrival Start:</label>
      <input value={arrivalStart} onChange={(e) => setArrivalStart(e.target.value)} />
      <label>Arrival End:</label>
      <input value={arrivalEnd} onChange={(e) => setArrivalEnd(e.target.value)} />

      <label>Sales Rep Code:</label>
      <input value={salesRep} onChange={(e) => setSalesRep(e.target.value)} />

      {serviceType === 'Moving' && (
        <>
          <label>Number of Movers:</label>
          <input value={numberOfMovers} onChange={(e) => setNumberOfMovers(e.target.value)} />
          <label>Number of Trucks:</label>
          <input value={numberOfTrucks} onChange={(e) => setNumberOfTrucks(e.target.value)} />
          <label>Truck Size:</label>
          <input value={truckSize} onChange={(e) => setTruckSize(e.target.value)} />
          <label>Additional Hourly Rate:</label>
          <input value={additionalRate} onChange={(e) => setAdditionalRate(e.target.value)} />
        </>
      )}

      <button onClick={generateLink}>Generate Booking Link</button>

      {bookingLink && (
        <>
          <p><strong>Generated Link:</strong></p>
          <textarea rows="6" cols="100" value={bookingLink} readOnly />
        </>
      )}
    </div>
  );
}

export default BookingLinkGenerator;
