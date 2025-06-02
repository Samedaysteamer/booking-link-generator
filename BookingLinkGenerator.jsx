
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
    <div>
      <h1>Booking Link Generator</h1>
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={() => window.open(fullUrl, '_blank')}>Generate Link</button>
    </div>
  );
}
