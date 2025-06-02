import React, { useState } from "react";

export default function BookingLinkGenerator() {
  const [service, setService] = useState("Carpet Cleaning");
  const [price, setPrice] = useState("");
  const [window, setWindow] = useState("8 AM–12 PM");

  // ✅ Your live Google Form link
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfuhDxrxDBjRSFMg_hjETLSbfkzjN5gBm-CadLN7kLwGUEx3g/viewform";
  
  // 🧠 Replace with your actual field ID from your form
  const summaryEntry = "entry.123456";

  const summaryText = `${service}
$${price} Special
Arrival between ${window}
Payment method: Cash
Card payment: +7% processing fee`;

  const encodedSummary = encodeURIComponent(summaryText);
  const fullUrl = `${baseUrl}?${summaryEntry}=${encodedSummary}`;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Booking Link Generator</h2>

      <label>
        Service Type:
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="Carpet Cleaning">Carpet Cleaning</option>
          <option value="Upholstery Cleaning">Upholstery Cleaning</option>
          <option value="Duct Cleaning">Duct Cleaning</option>
        </select>
      </label>

      <label style={{ marginLeft: "10px" }}>
        Quoted Price:
        <input
          type="text"
          placeholder="300"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label style={{ marginLeft: "10px" }}>
        Arrival Window:
        <select value={window} onChange={(e) => setWindow(e.target.value)}>
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

      <div
        style={{
          marginTop: "20px",
          whiteSpace: "pre-line",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <strong>Preview:</strong>
        <br />
        {summaryText}
      </div>
    </div>
  );
}
