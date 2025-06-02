<select value={service} onChange={(e) => setService(e.target.value)}>
  <option value="Carpet Cleaning">Carpet Cleaning</option>
  <option value="Upholstery Cleaning">Upholstery Cleaning</option>
</select>

<input
  type="text"
  placeholder="Price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>

<select value={window} onChange={(e) => setWindow(e.target.value)}>
  <option value="8 AM–12 PM">8 AM–12 PM</option>
  <option value="1 PM–5 PM">1 PM–5 PM</option>
</select>
