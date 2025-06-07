import React, { useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [selectedTab, setSelectedTab] = useState('Carpet Cleaning');
  const [carpetServiceType, setCarpetServiceType] = useState('Carpet Cleaning');
  const [carpetQuotedPrice, setCarpetQuotedPrice] = useState('');
  const [carpetArrivalWindow, setCarpetArrivalWindow] = useState('');
  const [movingFirstBlockPrice, setMovingFirstBlockPrice] = useState('');
  const [movingBlockDuration, setMovingBlockDuration] = useState('');
  const [movingHourlyRate, setMovingHourlyRate] = useState('');
  const [movingArrivalStart, setMovingArrivalStart] = useState('');
  const [movingArrivalEnd, setMovingArrivalEnd] = useState('');
  const [movingArrivalWindow, setMovingArrivalWindow] = useState('');
  const [movers, setMovers] = useState('');
  const [trucks, setTrucks] = useState('');
  const [truckSize, setTruckSize] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [ductServiceType, setDuctServiceType] = useState('');
  const [ductPackage, setDuctPackage] = useState('');
  const [ductArrivalWindow, setDuctArrivalWindow] = useState('');
  const [ductPrice, setDuctPrice] = useState('');

  const generateLink = () => {
    let baseUrl = 'https://form.jotform.com/';
    let formId = '';
    let params = new URLSearchParams();

    if (selectedTab === 'Carpet Cleaning') {
      formId = '251536451249054';
      const summary = `${salesRep}\n${carpetServiceType}\n$${carpetQuotedPrice} Special\nArrival between ${carpetArrivalWindow}\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;
      params.set('bookingSummary', summary);
      params.set('arrivalWindow', carpetArrivalWindow);
      params.set('service', carpetServiceType);
      params.set('price', carpetQuotedPrice);
      params.set('salesRep', salesRep);
    }

    if (selectedTab === 'Moving') {
      formId = '251536451249054';
      const summary = `${salesRep}\n$${movingFirstBlockPrice} for the first ${movingBlockDuration} hours, $${movingHourlyRate} for any additional`;
      params.set('bookingSummary', summary);
      params.set('arrivalStart', movingArrivalStart);
      params.set('arrivalEnd', movingArrivalEnd);
      params.set('arrivalWindow', movingArrivalWindow);
      params.set('price', movingFirstBlockPrice);
      params.set('blockDuration', movingBlockDuration);
      params.set('hourlyRate', movingHourlyRate);
      params.set('movers', movers);
      params.set('trucks', trucks);
      params.set('truckSize', truckSize);
      params.set('salesRep', salesRep);
    }

    if (selectedTab === 'Duct Cleaning') {
      formId = '251573697976175';
      const summary = `${salesRep}\n${ductServiceType}\n${ductPackage} Package\nArrival between ${ductArrivalWindow}\nTotal: $${ductPrice}`;
      params.set('bookingSummary', summary);
      params.set('service', ductServiceType);
      params.set('package', ductPackage);
      params.set('arrivalWindow', ductArrivalWindow);
      params.set('price', ductPrice);
      params.set('salesRep', salesRep);
    }

    const finalUrl = `${baseUrl}${formId}?${params.toString()}`;
    window.open(finalUrl, '_blank');
  };

  return (
    <div className="booking-link-generator">
      <div className="tabs">
        <button onClick={() => setSelectedTab('Carpet Cleaning')}>Carpet Cleaning</button>
        <button onClick={() => setSelectedTab('Moving')}>Moving</button>
        <button onClick={() => setSelectedTab('Duct Cleaning')}>Duct Cleaning</button>
      </div>

      {selectedTab === 'Carpet Cleaning' && (
        <div className="form-section">
          <input value={carpetServiceType} onChange={e => setCarpetServiceType(e.target.value)} placeholder="Service Type" />
          <input value={carpetQuotedPrice} onChange={e => setCarpetQuotedPrice(e.target.value)} placeholder="Quoted Price" />
          <input value={carpetArrivalWindow} onChange={e => setCarpetArrivalWindow(e.target.value)} placeholder="Arrival Window" />
        </div>
      )}

      {selectedTab === 'Moving' && (
        <div className="form-section">
          <input value={movingFirstBlockPrice} onChange={e => setMovingFirstBlockPrice(e.target.value)} placeholder="First Block Price" />
          <input value={movingBlockDuration} onChange={e => setMovingBlockDuration(e.target.value)} placeholder="Block Duration" />
          <input value={movingHourlyRate} onChange={e => setMovingHourlyRate(e.target.value)} placeholder="Hourly Rate" />
          <input value={movingArrivalStart} onChange={e => setMovingArrivalStart(e.target.value)} placeholder="Arrival Start" />
          <input value={movingArrivalEnd} onChange={e => setMovingArrivalEnd(e.target.value)} placeholder="Arrival End" />
          <input value={movingArrivalWindow} onChange={e => setMovingArrivalWindow(e.target.value)} placeholder="Arrival Window" />
          <input value={movers} onChange={e => setMovers(e.target.value)} placeholder="Number of Movers" />
          <input value={trucks} onChange={e => setTrucks(e.target.value)} placeholder="Number of Trucks" />
          <input value={truckSize} onChange={e => setTruckSize(e.target.value)} placeholder="Truck Size" />
        </div>
      )}

      {selectedTab === 'Duct Cleaning' && (
        <div className="form-section">
          <input value={ductServiceType} onChange={e => setDuctServiceType(e.target.value)} placeholder="Service Type" />
          <input value={ductPackage} onChange={e => setDuctPackage(e.target.value)} placeholder="Package" />
          <input value={ductArrivalWindow} onChange={e => setDuctArrivalWindow(e.target.value)} placeholder="Arrival Window" />
          <input value={ductPrice} onChange={e => setDuctPrice(e.target.value)} placeholder="Total Price" />
        </div>
      )}

      <div className="common-fields">
        <input value={salesRep} onChange={e => setSalesRep(e.target.value)} placeholder="Sales Rep" />
        <button onClick={generateLink}>Generate Booking Link</button>
      </div>
    </div>
  );
}

export default BookingLinkGenerator;

