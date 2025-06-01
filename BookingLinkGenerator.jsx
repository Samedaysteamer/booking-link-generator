import { useState } from "react";

export default function BookingLinkGenerator() {
  const [service, setService] = useState("Carpet Cleaning");
  const [price, setPrice] = useState("");
  const [window, setWindow] = useState("8 AM–12 PM");

  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfE6j7aBabc123456XYZ/viewform";
  const entryService = "entry.123456";
  const entryPrice = "entry.234567";
  const entryWindow = "entry.345678";

  const encodedService = encodeURIComponent(service);
  const encodedPrice = encodeURIComponent(price);
  const encodedWindow = encodeURIComponent(window);

  const fullUrl = `${baseUrl}?${entryService}=${encodedService}&${entryPrice}=${encodedPrice}&${entryWindow}=${encodedWindow}`;

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Booking Link Generator</h2>

      <label>Service Type</label>
      <select value={service} onChange={(e) => setService(e.target.value)} style={{ display: 'block', marginBottom: '1rem', width: '100%' }}>
        <option>Carpet Cleaning</option>
        <option>Upholstery Cleaning</option>
        <option>Duct Cleaning</option>
      </select>

      <label>Quoted Price</label>
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} style={{ display: 'block', marginBottom: '1rem', width: '100%' }} placeholder="e.g. 150 Special" />

      <label>Arrival Window</label>
      <select value={window} onChange={(e) => setWindow(e.target.value)} style={{ display: 'block', marginBottom: '1rem', width: '100%' }}>
        <option>8 AM–12 PM</option>
        <option>10 AM–2 PM</option>
        <option>1 PM–5 PM</option>
      </select>

      <label>Generated Link</label>
      <input type="text" value={fullUrl} readOnly style={{ width: '100%', color: 'blue' }} onClick={(e) => e.target.select()} />
    </div>
  );
}