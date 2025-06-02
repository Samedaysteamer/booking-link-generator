import { useState } from "react";

export default function BookingLinkGenerator() {
  const [service, setService] = useState("Carpet Cleaning");
  const [price, setPrice] = useState("");
  const [window, setWindow] = useState("8 AM–12 PM");

  const baseUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfuhDxrxDBjRSFMg_hjETLSbfkzjN5gBm-CadLN7kLwGUEx3g/viewform";
  const entryService = "entry.123456";
  const entryPrice = "entry.234567";
  const entryWindow = "entry.345678";

  const encodedService = encodeURIComponent(service);
  const encodedPrice = encodeURIComponent(price);
  const encodedWindow = encodeURIComponent(window);

  const fullUrl = `${baseUrl}?${entryService}=${encodedService}&${entryPrice}=${encodedPrice}&${entryWindow}=${encodedWindow}`;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Booking Link Generator</h2>

      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="Carpet Cleaning">Carpet Cleaning</option>
        <option value="Upholstery Cleaning">Upholstery Cleaning</option>
        <option value="Duct Cleaning">Duct Cleaning</option>
      </select>

      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <select
        value={window}
        onChange={(e) => setWindow(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="8 AM–12 PM">8 AM–12 PM</option>
        <option value="10 AM–2 PM">10 AM–2 PM</option>
        <option value="12 PM–4 PM">12 PM–4 PM</option>
        <option value="3 PM–7 PM">3 PM–7 PM</option>
      </select>

      <div style={{ marginTop: "10px" }}>
        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
          <button>Generate Link</button>
        </a>
      </div>
    </div>
  );
}
