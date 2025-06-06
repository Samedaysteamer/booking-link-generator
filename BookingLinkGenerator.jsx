import React, { useState } from 'react';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [salesRep, setSalesRep] = useState('');

  // Moving-only fields
  const [additionalRate, setAdditionalRate] = useState('');
  const [movers, setMovers] = useState('');
  const [trucks, setTrucks] = useState('');
  const [truckSize, setTruckSize] = useState('');

  const paymentTextCarpet =
    `Payment method: \n` +
    `Cash, Cashapp, Zelle\n` +
    `Cashapp payment $5 fee\n` +
    `Card payment 7% processing fee`;

  const paymentTextMoving =
    `Payment method: \n` +
    `Cash, Cashapp, Zelle\n` +
    `Cashapp payment $5 fee`;

  const generateLink = () => {
    let bookingSummary = '';
    let baseUrl = '';
    let link = '';

    if (serviceType === 'Carpet Cleaning') {
      baseUrl = 'https://form.jotform.com/251536451249054';

      bookingSummary =
        `${salesRep} ${serviceType}\n` +
        `$${quotedPrice} Special\n` +
        `Arrival between ${arrivalWindow}\n` +
        `${paymentTextCarpet}`;

      link = `${baseUrl}?bookingSummary=${encodeURIComponent(bookingSummary)}` +
        `&service=${encodeURIComponent(serviceType)}` +
        `&price=${quotedPrice}` +
        `&arrivalWindow=${encodeURIComponent(arrivalWindow)}` +
        `&arrivalStart=${encodeURIComponent(arrivalStart)}` +
        `&arrivalEnd=${encodeURIComponent(arrivalEnd)}` +
        `&salesRep=${encodeURIComponent(salesRep)}`;
    }

    if (serviceType === 'Moving') {
      baseUrl = 'https://form.jotform.com/251537865180159';

      bookingSummary =
        `${salesRep} ${serviceType}\n` +
        `$${quotedPrice} First Block – 2 hours\n` +
        `$${additionalRate} Per Additional Hour\n` +
        `Arrival between ${arrivalWindow}\n` +
        `${movers} Men, ${trucks} Truck(s), ${truckSize}\n` +
        `${paymentTextMoving}`;

      link = `${baseUrl}?bookingSummary=${encodeURIComponent(bookingSummary)}` +
        `&service=${encodeURIComponent(serviceType)}` +
        `&salesRep=${encodeURIComponent(salesRep)}` +
        `&price=${quotedPrice}` +
        `&additionalRate=${additionalRate}` +
        `&arrivalWindow=${encodeURIComponent(arrivalWindow)}` +
        `&arrivalStart=${encodeURIComponent(arrivalStart)}` +
        `&arrivalEnd=${encodeURIComponent(arrivalEnd)}` +
        `&movers=${movers}` +
        `&trucks=${trucks}` +
        `&truckSize=${encodeURIComponent(truckSize)}`;
    }

    document.getElementById('generated-link').innerText = link;
  };

  return (
    <div>
      <button onClick={generateLink}>Generate Booking Link</button>
      <p id="generated-link" style={{ wordWrap: 'break-word' }}></p>
    </div>
  );
}

export default BookingLinkGenerator;
