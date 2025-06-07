import React, { useState } from 'react'; import './BookingLinkGenerator.css';

export default function BookingLinkGenerator() { const [selectedGenerator, setSelectedGenerator] = useState('Carpet Cleaning'); const [salesRep, setSalesRep] = useState(''); const [service, setService] = useState('Carpet Cleaning'); const [price, setPrice] = useState(''); const [arrivalWindow, setArrivalWindow] = useState('8 AM - 12 PM'); const [truckSize, setTruckSize] = useState(''); const [arrivalStart, setArrivalStart] = useState(''); const [arrivalEnd, setArrivalEnd] = useState('');

const handleGeneratorChange = (e) => { const value = e.target.value; setSelectedGenerator(value);

if (value === 'Duct Cleaning') {
  window.location.href = 'https://form.jotform.com/251573697976175';
}

};

const generateLink = () => { const summary = *${salesRep}*\n${service}\n$${price} Special\nArrival between ${arrivalWindow}\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee; const start = arrivalWindow.split(' - ')[0]; const end = arrivalWindow.split(' - ')[1];

const url = `https://form.jotform.com/251536451249054?bookingSummary=${encodeURIComponent(summary)}&arrivalStart=${encodeURIComponent(start)}&arrivalEnd=${encodeURIComponent(end)}&arrivalWindow=${encodeURIComponent(arrivalWindow)}&service=${encodeURIComponent(service)}&price=${price}&salesRep=${encodeURIComponent(salesRep)}&truckSize=${encodeURIComponent(truckSize)}`;

window.open(url, '_blank');

};

const renderFields = () => { if (selectedGenerator === 'Carpet Cleaning') { return ( <div> <label>Sales Rep:</label> <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}> <option value="">--</option> <option value="*01*">01</option> <option value="*02*">02</option> <option value="*03*">03</option> </select>

<label>Service Type:</label>
      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Upholstery Cleaning">Upholstery Cleaning</option>
        <option value="Mattress Cleaning">Mattress Cleaning</option>
      </select>

      <label>Quoted Price ($):</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label>Arrival Window:</label>
      <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
        <option value="8 AM - 12 PM">8 AM - 12 PM</option>
        <option value="10 AM - 2 PM">10 AM - 2 PM</option>
        <option value="12 PM - 4 PM">12 PM - 4 PM</option>
        <option value="1 PM - 5 PM">1 PM - 5 PM</option>
        <option value="3 PM - 7 PM">3 PM - 7 PM</option>
      </select>

      <br />
      <button onClick={generateLink}>Generate Booking Link</button>
    </div>
  );
}

if (selectedGenerator === 'Moving') {
  return (
    <div>
      <label>Sales Rep:</label>
      <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
        <option value="">--</option>
        <option value="*01*">*01*</option>
        <option value="*02*">*02*</option>
        <option value="*03*">*03*</option>
      </select>

      <label>Truck Size:</label>
      <input type="text" value={truckSize} onChange={(e) => setTruckSize(e.target.value)} />

      <label>Quoted Price ($):</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label>Arrival Window:</label>
      <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
        <option value="7 AM - 9 AM">7 AM - 9 AM</option>
        <option value="9 AM - 11 AM">9 AM - 11 AM</option>
        <option value="11 AM - 1 PM">11 AM - 1 PM</option>
        <option value="1 PM - 3 PM">1 PM - 3 PM</option>
        <option value="3 PM - 5 PM">3 PM - 5 PM</option>
      </select>

      <br />
      <button onClick={generateLink}>Generate Booking Link</button>
    </div>
  );
}

return null;

};

return ( <div className="booking-link-generator"> <h2>Booking Link Generator</h2> <label>Choose Generator:</label> <select value={selectedGenerator} onChange={handleGeneratorChange}> <option value="Carpet Cleaning">Carpet Cleaning</option> <option value="Moving">Moving</option> <option value="Duct Cleaning">Duct Cleaning</option> </select>

{renderFields()}
</div>

); }

