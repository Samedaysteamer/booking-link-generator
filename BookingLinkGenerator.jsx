// Updated BookingLinkGenerator.js with Duct Cleaning tab support

import React, { useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning');
  const [serviceType, setServiceType] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [firstBlockPrice, setFirstBlockPrice] = useState('');
  const [blockDuration, setBlockDuration] = useState('');
  const [additionalRate, setAdditionalRate] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [numMovers, setNumMovers] = useState('');
  const [numTrucks, setNumTrucks] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [bookingLink, setBookingLink] = useState('');

  const generateLink = () => {
    let baseUrl = '';
    let link = '';

    if (selectedGenerator === 'Carpet Cleaning') {
      baseUrl = 'https://form.jotform.com/251536451249054';
      const summary = `*${salesRep}*\n${serviceType}\n$${quotedPrice} Special\nArrival between ${arrivalWindow}\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;
      link = `${baseUrl}?bookingSummary=${encodeURIComponent(summary)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&service=${encodeURIComponent(serviceType)}&price=${encodeURIComponent(quotedPrice)}&salesRep=${encodeURIComponent(`*${salesRep}*`)}`;
    } else if (selectedGenerator === 'Moving') {
      baseUrl = 'https://form.jotform.com/251536451249054';
      const summary = `*${salesRep}*\n$${firstBlockPrice} for the first ${blockDuration} hours, $${additionalRate} for any additional`;
      link = `${baseUrl}?bookingSummary=${encodeURIComponent(summary)}&arrivalStart=${encodeURIComponent(arrivalStart)}&arrivalEnd=${encodeURIComponent(arrivalEnd)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&firstBlockPrice=${encodeURIComponent(firstBlockPrice)}&blockDuration=${encodeURIComponent(blockDuration)}&additionalRate=${encodeURIComponent(additionalRate)}&numMovers=${encodeURIComponent(numMovers)}&numTrucks=${encodeURIComponent(numTrucks)}&truckSize=${encodeURIComponent(truckSize)}&salesRep=${encodeURIComponent(`*${salesRep}*`)}`;
    } else if (selectedGenerator === 'Duct Cleaning') {
      baseUrl = 'https://form.jotform.com/251573697976175';
      const summary = `*${salesRep}*\nDuct Cleaning Service\nArrival between ${arrivalWindow}`;
      link = `${baseUrl}?bookingSummary=${encodeURIComponent(summary)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&service=Duct%20Cleaning&salesRep=${encodeURIComponent(`*${salesRep}*`)}`;
    }

    setBookingLink(link);
  };

  return (
    <div>
      <h2>Choose Generator</h2>
      <select value={selectedGenerator} onChange={(e) => setSelectedGenerator(e.target.value)}>
        <option>Carpet Cleaning</option>
        <option>Moving</option>
        <option>Duct Cleaning</option>
      </select>
      {/* All input fields here, conditionally rendered based on selectedGenerator */}
      <button onClick={generateLink}>Generate Booking Link</button>
      <textarea value={bookingLink} readOnly rows={6} cols={80} />
    </div>
  );
}

export default BookingLinkGenerator;
