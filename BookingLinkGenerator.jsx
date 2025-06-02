import React, { useState } from "react";
import "./BookingLinkGenerator.css";

export default function BookingLinkGenerator() {
  const [serviceType, setServiceType] = useState("Carpet Cleaning");
  const [quotedPrice, setQuotedPrice] = useState("300");
  const [arrivalWindow, setArrivalWindow] = useState("8 AM–12 PM");

  // Your Google Form URL
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfuhDxrxDBjRSFMg_hjETLSbfkzjN5gBm-CadLN7kLwGUEx3g/viewform";
  const summaryEntryId = "entry.123456"; // ✅ Replace this with actual ID of your summary field

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

      <div style={{ marginBottom: "10px" }}>
        <label>
          Service Type:
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            id="service-type-field"
            style={{ marginLeft: "10px" }}
          >
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Upholstery Cleaning">Upholstery Cleaning</option>
            <option value="Duct Cleaning">Duct Cleaning</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Quoted Price:
          <input
            type="text"
            placeholder="$"
            value={quotedPrice}
            onChange={(e) => setQuotedPrice(e.target.value)}
            id="quoted-price-field"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Arrival Window:
          <select
            value={arrivalWindow}
            onChange={(e) => setArrivalWindow(e.target.value)}
            id="arrival-window-field"
            style={{ marginLeft: "10px" }}
          >
            <option value="8 AM–12 PM">8 AM–12 PM</option>
            <option value="10 AM–2 PM">10 AM–2 PM</option>
            <option value="12 PM–4 PM">12 PM–4 PM</option>
            <option value="3 PM–7 PM">3 PM–7 PM</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
          <button>Generate Booking Link</button>
        </a>
      </div>

      <div
        id="top-summary"
        style={{
          whiteSpace: "pre-line",
          padding: "10px",
          backgroundColor: "#f3f3f3",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <strong>Booking Summary Preview:</strong>
        <br />
        {summaryText}
      </div>
    </div>
  );
}
