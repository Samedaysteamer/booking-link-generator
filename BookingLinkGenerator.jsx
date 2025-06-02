import React, { useState } from "react";
import "./BookingLinkGenerator.css";

export default function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState("Carpet Cleaning");
  const [quotedPrice, setQuotedPrice] = useState("300");
  const [arrivalWindow, setArrivalWindow] = useState("8 AM–12 PM");

  // Google Form base URL and your visible field's entry ID
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfuhDxrxDBjRSFMg_hjETLSbfkzjN5gBm-CadLN7kLwGUEx3g/viewform";
  const summaryEntryId = "entry.123456"; // replace with actual field ID from your form

  // Booking summary that will appear at the top
  const summaryText = `Service: ${serviceType}
Price: $${quotedPrice} Special
Arrival Window: ${arrivalWindow}
Payment Method: Cash
Card Payment: +7% Processing Fee`;

  const encodedSummary = encodeURIComponent(summaryText);
  const fullUrl = `${baseUrl}?${summaryEntryId}=${encodedSummary}`;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Booking Link Generator</h2>

      <label>
        Service Type:
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} id="service-type-field">
          <option value="Carpet Cleaning">Carpet Cleaning</option>
          <option value="Upholstery Cleaning">Upholstery Cleaning</option>
          <option value="Duct Cleaning">Duct Cleaning</option>
        </select>
      </label>

      <label style={{ marginLeft: "10px" }}>
        Quoted Price:
        <input
          type="text"
          placeholder="$"
          value={quotedPrice}
          onChange={(e) => setQuotedPrice(e.target.value)}
          id="quoted-price-field"
        />
      </label>

      <label style={{ marginLeft: "10px" }}>
        Arrival Window:
        <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)} id="arrival-window-field">
          <option value="8 AM–12 PM">8 AM–12 PM</option>
          <option value="10 AM–2 PM">10 AM–2 PM</option>
          <option value="12 PM–4 PM">12 PM–4 PM</option>
          <option value="3 PM–7 PM">3 PM–7 PM</option>
        </select>
      </label>

      <div style={{ marginTop: "20px" }}>
        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
          <button>Generate Booking Link</button>
        </a>
      </div>

      <div id="top-summary" style={{ marginTop: "20px", whiteSpace: "pre-line", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
        <strong>Booking Summary Preview:</strong>
        <br />
        {summaryText}
      </div>
    </div>
  );
}
