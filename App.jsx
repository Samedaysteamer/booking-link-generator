{mode === 'carpet' && (
  <>
    <div className="form-group">
      <label>Service Type:</label>
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
        <option>Carpet Cleaning</option>
        <option>Upholstery Cleaning</option>
        <option>Mattress Cleaning</option>
      </select>
    </div>

    <div className="form-group">
      <label>Quoted Price ($):</label>
      <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Arrival Window:</label>
      <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
        <option>8 AM - 12 PM</option>
        <option>10 AM - 2 PM</option>
        <option>12 PM - 4 PM</option>
        <option>1 PM - 5 PM</option>
        <option>3 PM - 7 PM</option>
      </select>
    </div>
  </>
)}

{mode === 'duct' && (
  <>
    <div className="form-group">
      <label>Service Type:</label>
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
        <option>Basic Duct Cleaning</option>
        <option>Deep Duct Cleaning</option>
        <option>Basic Duct Cleaning with Furnace</option>
        <option>Deep Duct Cleaning with Furnace</option>
        <option>Basic Duct Cleaning with Dryer Vent Cleaning</option>
        <option>Deep Duct Cleaning with Dryer Vent Cleaning</option>
        <option>Deep Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
      </select>
    </div>

    <div className="form-group">
      <label>Quoted Price ($):</label>
      <input type="number" value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Arrival Window:</label>
      <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
        <option>8 AM - 12 PM</option>
        <option>1 PM - 5 PM</option>
      </select>
    </div>
  </>
)}

{mode === 'moving' && (
  <>
    <div className="form-group">
      <label>Quoted Price for First Block ($):</label>
      <input type="number" value={blockPrice} onChange={(e) => setBlockPrice(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Duration of First Block (hrs):</label>
      <select value={blockHours} onChange={(e) => setBlockHours(e.target.value)}>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>

    <div className="form-group">
      <label>Additional Hour Rate ($):</label>
      <input type="number" value={additionalRate} onChange={(e) => setAdditionalRate(e.target.value)} />
    </div>

    <div className="form-group">
      <label>Arrival Window:</label>
      <select value={movingArrival} onChange={(e) => setMovingArrival(e.target.value)}>
        <option>Arrival between 7 and 9</option>
        <option>Arrival between 9 to 11</option>
        <option>Arrival between 11 and 1</option>
        <option>Arrival between 1 and 3</option>
        <option>Arrival between 3 to 5</option>
      </select>
    </div>

    <div className="form-group">
      <label>Number of Movers:</label>
      <select value={numMovers} onChange={(e) => setNumMovers(e.target.value)}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>

    <div className="form-group">
      <label>Number of Trucks (leave blank if one):</label>
      <select value={truckInfo} onChange={(e) => setTruckInfo(e.target.value)}>
        <option value=""></option>
        <option value="2">2</option>
      </select>
    </div>

    <div className="form-group">
      <label>Truck Size (Ft):</label>
      <select value={truckSize} onChange={(e) => setTruckSize(e.target.value)}>
        <option value="17">17</option>
        <option value="20">20</option>
        <option value="26">26</option>
      </select>
    </div>
  </>
)}
