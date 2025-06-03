import React, { useEffect, useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const price = params.get('price');
    const windowTime = params.get('window');

    if (service) setServiceType(service);
    if (price) setQuotedPrice(price);
    if (windowTime) setArrivalWindow(windowTime);
  }, []);

  return (
    <div className="container">
      <div id="top-summary" className="summary-box">
        <h2>Service Summary</h2>
        <p><strong>Service:</strong> {serviceType}</p>
        <p><strong>Price:</strong> ${quotedPrice}</p>
        <p><strong>Arrival Window:</strong> {arrivalWindow}</p>
      </div>

      <form className="booking-form">
        {/* Put your form fields here */}
      </form>
    </div>
  );
}

export default BookingLinkGenerator;
