import React, { useEffect, useState } from 'react';
import './BookingLinkGenerator.css';

function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');
  const [arrivalWindow, setArrivalWindow] = useState('');
  const [arrivalStart, setArrivalStart] = useState('');
  const [arrivalEnd, setArrivalEnd] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const service = params.get('service');
    const price = params.get('price');
    const windowTime = params.get('arrivalWindow');
    const start = params.get('arrivalStart');
    const end = params.get('arrivalEnd');
    const rep = params.get('salesRep');
    const method = params.get('paymentMethod');
    const summaryText = params.get('bookingSummary');

    if (service) setServiceType(service);
    if (price) setQuotedPrice(price);
    if (windowTime) setArrivalWindow(windowTime);
    if (start) setArrivalStart(start);
    if (end) setArrivalEnd(end);
    if (rep) setSalesRep(rep);
    if (method) setPaymentMethod(method);
    if (summaryText) setSummary(decodeURIComponent(summaryText));

    // Fill hidden fields manually for Zapier
    if (document) {
      if (document.getElementsByName('service')[0]) {
        document.getElementsByName('service')[0].value = service || '';
      }
      if (document.getElementsByName('price')[0]) {
        document.getElementsByName('price')[0].value = price || '';
      }
      if (document.getElementsByName('salesRep')[0]) {
        document.getElementsByName('salesRep')[0].value = rep || '';
      }
      if (document.getElementsByName('arrivalStart')[0]) {
        document.getElementsByName('arrivalStart')[0].value = start || '';
      }
      if (document.getElementsByName('arrivalEnd')[0]) {
        document.getElementsByName('arrivalEnd')[0].value = end || '';
      }
      if (document.getElementsByName('arrivalWindow')[0]) {
        document.getElementsByName('arrivalWindow')[0].value = windowTime || '';
      }
      if (document.getElementsByName('paymentMethod')[0]) {
        document.getElementsByName('paymentMethod')[0].value = method || '';
      }
    }
  }, []);

  return (
    <div className="generator-wrapper">
      <div id="top-summary" style={{ whiteSpace: 'pre-wrap', fontWeight: 'bold', fontSize: '1.2em', marginBottom: '15px' }}>
        {summary || 'No summary provided'}
      </div>
    </div>
  );
}

export default BookingLinkGenerator;
