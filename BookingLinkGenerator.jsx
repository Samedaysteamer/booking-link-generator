import { useState } from "react";

export default function BookingLinkGenerator() {
  const [service, setService] = useState("Carpet Cleaning");
  const [price, setPrice] = useState("");
  const [window, setWindow] = useState("8 AM–12 PM");

  const baseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfE6j7aBabc123456XYZ/viewform";
  const entryService = "entry.123456";
  const entryPrice = "entry.234567";
  const entryWindow = "entry.345678";

  const encodedService = encodeURIComponent(service);
  const encodedPrice = encodeURIComponent(price);
  const encodedWindow = encodeURIComponent(window);

  const fullUrl = `${baseUrl}?${entryService}=${encodedService}&${entryPrice}=${encodedPrice}&${entryWindow}=${encodedWindow}`;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Booking Link Generator</h1>

      <label>
        Service:
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option>Carpet Cleaning</option>
          <option>Upholstery Cleaning</option>
          <option>Air Duct Cleaning</option>
        </select>
      </label>
      <br /><br />

      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </label>
      <br /><br />

      <label>
        Time Window:
        <select value={window} onChange={(e) => setWindow(e.target.value)}>
          <option>8 AM–12 PM</option>
          <option>10 AM–2 PM</option>
          <option>12 PM–4 PM</option>
          <option>3 PM–7 PM</option>
        </select>
      </label>
      <br /><br />

      <a href={fullUrl} target="_blank" rel="noopener noreferrer">
        <button>Generate Link</button>
      </a>
    </div>
  );
}
