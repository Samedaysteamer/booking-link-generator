import React, { useEffect, useState } from 'react';
import './BookingLinkGenerator.css';

export default function App() {
  // ---------- Theme ----------
  const [theme, setTheme] = useState('light'); // light | gray | sky
  useEffect(() => {
    const cls = document.body.classList;
    cls.remove('theme-light','theme-gray','theme-sky');
    cls.add(`theme-${theme}`);
  }, [theme]);

  // ---------- Core state ----------
  const [mode, setMode] = useState('carpet');
  const [salesRep, setSalesRep] = useState('');

  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('');

  // Carpet/Duct arrival window
  const [arrivalWindow, setArrivalWindow] = useState('Arrival between 8 and 12');

  // Moving fields
  const [blockPrice, setBlockPrice] = useState('');
  const [blockHours, setBlockHours] = useState('2');
  const [additionalRate, setAdditionalRate] = useState('');
  const [movingArrival, setMovingArrival] = useState('Arrival between 7 and 9');
  const [numMovers, setNumMovers] = useState('2');
  const [truckInfo, setTruckInfo] = useState(''); // "" = one truck, "2" = 2 trucks
  const [truckSize, setTruckSize] = useState('17');

  const [generatedLink, setGeneratedLink] = useState(''); // short link
  const [rawLink, setRawLink] = useState('');             // long link
  const [copied, setCopied] = useState(false);

  // ---------- Specials ----------
  // Moving specials
  const [movingSpecial, setMovingSpecial] = useState('custom');
  const applyMovingSpecial = (value) => {
    setMovingSpecial(value);
    if (value === 'special_2men') {
      setBlockPrice('300'); setBlockHours('2'); setAdditionalRate('150');
      setNumMovers('2'); setTruckInfo('2'); setTruckSize('17');
    } else if (value === 'special_4men') {
      setBlockPrice('600'); setBlockHours('2'); setAdditionalRate('300');
      setNumMovers('4'); setTruckInfo('2'); setTruckSize('17');
    } else if (value === 'special_260') {
      setBlockPrice('260'); setBlockHours('2'); setAdditionalRate('130');
      setNumMovers('2'); setTruckInfo(''); setTruckSize('17');
    } else if (value === 'special_delivery') {
      setBlockPrice('150'); setBlockHours('1'); setAdditionalRate('150');
      setNumMovers('2'); setTruckInfo(''); setTruckSize('17');
    }
  };
  const movingLocked = movingSpecial !== 'custom';

  // Carpet/Upholstery specials
  const [carpetSpecial, setCarpetSpecial] = useState('custom');
  const applyCarpetSpecial = (value) => {
    setCarpetSpecial(value);
    if (value === 'cc150') { setServiceType('Carpet Cleaning'); setQuotedPrice('150'); }
    else if (value === 'cc200') { setServiceType('Carpet Cleaning'); setQuotedPrice('200'); }
    else if (value === 'cc250') { setServiceType('Carpet Cleaning'); setQuotedPrice('250'); }
    else if (value === 'cc300') { setServiceType('Carpet Cleaning'); setQuotedPrice('300'); }
    else if (value === 'up200') { setServiceType('Upholstery Cleaning'); setQuotedPrice('200'); }
    else if (value === 'up250') { setServiceType('Upholstery Cleaning'); setQuotedPrice('250'); }
    else if (value === 'up300') { setServiceType('Upholstery Cleaning'); setQuotedPrice('300'); }
  };
  const carpetLocked = carpetSpecial !== 'custom';

  // Duct specials
  const [ductSpecial, setDuctSpecial] = useState('custom');
  const applyDuctSpecial = (value) => {
    setDuctSpecial(value);
    if (value === 'deep500') {
      setServiceType('Deep Duct Cleaning (No Furnace)'); setQuotedPrice('500');
    } else if (value === 'deep600') {
      setServiceType('Deep Duct Cleaning with Furnace'); setQuotedPrice('600');
    } else if (value === 'deep1200') {
      setServiceType('Deep Duct Cleaning (Two Units with Furnace)'); setQuotedPrice('1200');
    }
  };
  const ductLocked = ductSpecial !== 'custom';

  // ---------- Link Generator (unchanged logic) ----------
  const generateLink = () => {
    let summary = '';
    let baseUrl = '';
    let fullLink = '';
    let arrivalStart = '';
    let arrivalEnd = '';
    let arrivalWindowText = '';

    if (mode === 'carpet' || mode === 'duct') {
      summary = `${salesRep}
${serviceType}
$${quotedPrice} Special
${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee`;

      baseUrl = (mode === 'duct') 
        ? 'https://form.jotform.com/251573697976175'
        : 'https://form.jotform.com/251536451249054';

      arrivalWindowText = arrivalWindow;

      if (arrivalWindow === 'Arrival between 8 and 12')       { arrivalStart = '8 AM';  arrivalEnd = '12 PM'; }
      else if (arrivalWindow === 'Arrival between 10 and 2')  { arrivalStart = '10 AM'; arrivalEnd = '2 PM';  }
      else if (arrivalWindow === 'Arrival between 12 and 4')  { arrivalStart = '12 PM'; arrivalEnd = '4 PM';  }
      else if (arrivalWindow === 'Arrival between 1 and 5')   { arrivalStart = '1 PM';  arrivalEnd = '5 PM';  }
      else if (arrivalWindow === 'Arrival between 3 and 7')   { arrivalStart = '3 PM';  arrivalEnd = '7 PM';  }
    } else {
      const trucksLabel = truckInfo ? `(${truckInfo}) ` : '';
      summary = `${salesRep}
$${blockPrice} First ${blockHours} Hours Then $${additionalRate} per 
hour for each additional hour after that.
${movingArrival}
${numMovers} Men ${trucksLabel}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`;

      baseUrl = 'https://form.jotform.com/251537865180159';
      arrivalWindowText = movingArrival;

      if (movingArrival === 'Arrival between 7 and 9')        { arrivalStart = '7 AM';  arrivalEnd = '9 AM';  }
      else if (movingArrival === 'Arrival between 9 to 11')   { arrivalStart = '9 AM';  arrivalEnd = '11 AM'; }
      else if (movingArrival === 'Arrival between 11 and 1')  { arrivalStart = '11 AM'; arrivalEnd = '1 PM';  }
      else if (movingArrival === 'Arrival between 1 and 3')   { arrivalStart = '1 PM';  arrivalEnd = '3 PM';  }
      else if (movingArrival === 'Arrival between 3 to 5')    { arrivalStart = '3 PM';  arrivalEnd = '5 PM';  }

      setServiceType('Moving');
    }

    const encodedSummary = encodeURIComponent(summary);
    const finalService = encodeURIComponent(mode === 'moving' ? 'Moving' : serviceType);

    fullLink =
      `${baseUrl}?bookingSummary=${encodedSummary}` +
      `&arrivalStart=${encodeURIComponent(arrivalStart)}` +
      `&arrivalEnd=${encodeURIComponent(arrivalEnd)}` +
      `&arrivalWindow=${encodeURIComponent(arrivalWindowText)}` +
      `&service=${finalService}` +
      `&price=${quotedPrice}` +
      `&salesRep=${encodeURIComponent(salesRep)}`;

    setRawLink(fullLink);
    setCopied(false);

    fetch(`/api/shorten?url=${encodeURIComponent(fullLink)}`)
      .then(r => r.json())
      .then(({ shortUrl }) => setGeneratedLink(shortUrl || fullLink))
      .catch(() => setGeneratedLink(fullLink));
  };

  const copyShort = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) { setCopied(false); }
  };

  return (
    <div className="container">
      <h1 className="title">Booking Link Generator</h1>

      <div className="toolbar">
        <div className="form-group">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light (white/gray)</option>
            <option value="gray">Cool Gray</option>
            <option value="sky">Sky (light blue)</option>
          </select>
        </div>
      </div>

      <div className="card">
        {/* Generator type */}
        <div className="form-group">
          <label>Choose Generator</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="carpet">Carpet Cleaning</option>
            <option value="moving">Moving</option>
            <option value="duct">Duct Cleaning</option>
          </select>
        </div>

        {/* Sales Rep */}
        <div className="form-group">
          <label>Sales Rep</label>
          <select value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
            <option value=""> </option>
            <option value="*01*">*01*</option>
            <option value="*02*">*02*</option>
            <option value="*03*">*03*</option>
          </select>
        </div>

        {/* ARRIVAL WINDOW — moved directly under Sales Rep */}
        <div className="form-group">
          <label>Arrival Window</label>
          {mode === 'moving' ? (
            <select value={movingArrival} onChange={(e) => setMovingArrival(e.target.value)}>
              <option>Arrival between 7 and 9</option>
              <option>Arrival between 9 to 11</option>
              <option>Arrival between 11 and 1</option>
              <option>Arrival between 1 and 3</option>
              <option>Arrival between 3 to 5</option>
            </select>
          ) : (
            <select value={arrivalWindow} onChange={(e) => setArrivalWindow(e.target.value)}>
              {(mode === 'carpet') && (
                <>
                  <option>Arrival between 8 and 12</option>
                  <option>Arrival between 10 and 2</option>
                  <option>Arrival between 12 and 4</option>
                  <option>Arrival between 1 and 5</option>
                  <option>Arrival between 3 and 7</option>
                </>
              )}
              {(mode === 'duct') && (
                <>
                  <option>Arrival between 8 and 12</option>
                  <option>Arrival between 1 and 5</option>
                </>
              )}
            </select>
          )}
        </div>

        {/* CARPET / DUCT FIELDS */}
        {(mode === 'carpet' || mode === 'duct') && (
          <>
            <div className="form-row">
              <div className="form-group half">
                <label>Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  disabled={mode==='carpet' ? carpetLocked : ductLocked}
                >
                  {mode === 'carpet' && (
                    <>
                      <option>Carpet Cleaning</option>
                      <option>Upholstery Cleaning</option>
                      <option>Mattress Cleaning</option>
                    </>
                  )}
                  {mode === 'duct' && (
                    <>
                      <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                      <option value="Basic Duct Cleaning">Basic Duct Cleaning</option>
                      <option value="Deep Duct Cleaning">Deep Duct Cleaning</option>
                      <option value="Basic Duct Cleaning with Furnace">Basic Duct Cleaning with Furnace</option>
                      <option value="Deep Duct Cleaning with Furnace">Deep Duct Cleaning with Furnace</option>
                      <option value="Basic Duct Cleaning with Furnace and Dryer Vent Cleaning">Basic Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
                      <option value="Deep Duct Cleaning with Furnace and Dryer Vent Cleaning">Deep Duct Cleaning with Furnace and Dryer Vent Cleaning</option>
                      <option value="Basic Duct Cleaning with Dryer Vent Cleaning">Basic Duct Cleaning with Dryer Vent Cleaning</option>
                      <option value="Deep Duct Cleaning with Dryer Vent Cleaning">Deep Duct Cleaning with Dryer Vent Cleaning</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group half">
                <label>Quoted Price ($)</label>
                <input
                  type="number"
                  value={quotedPrice}
                  onChange={(e) => setQuotedPrice(e.target.value)}
                  disabled={mode==='carpet' ? carpetLocked : ductLocked}
                />
              </div>
            </div>

            {/* Specials */}
            {mode === 'carpet' && (
              <div className="form-group">
                <label>Carpet / Upholstery Specials</label>
                <select value={carpetSpecial} onChange={(e) => applyCarpetSpecial(e.target.value)}>
                  <option value="custom">— Custom —</option>
                  <option value="cc150">Carpet Cleaning — $150</option>
                  <option value="cc200">Carpet Cleaning — $200</option>
                  <option value="cc250">Carpet Cleaning — $250</option>
                  <option value="cc300">Carpet Cleaning — $300</option>
                  <option value="up200">Upholstery Cleaning — $200</option>
                  <option value="up250">Upholstery Cleaning — $250</option>
                  <option value="up300">Upholstery Cleaning — $300</option>
                </select>
                <small className="hint">Pick a special to auto-fill Service &amp; Price. Switch back to “Custom” to edit.</small>
              </div>
            )}

            {mode === 'duct' && (
              <div className="form-group">
                <label>Duct Cleaning Specials</label>
                <select value={ductSpecial} onChange={(e) => applyDuctSpecial(e.target.value)}>
                  <option value="custom">— Custom —</option>
                  <option value="deep500">Deep Cleaning (No Furnace) — $500</option>
                  <option value="deep600">Deep Cleaning with Furnace — $600</option>
                  <option value="deep1200">Deep Cleaning (Two Units with Furnace) — $1200</option>
                </select>
                <small className="hint">Specials set Service &amp; Price. Switch back to “Custom” to edit.</small>
              </div>
            )}
          </>
        )}

        {/* MOVING FIELDS */}
        {mode === 'moving' && (
          <>
            <div className="form-group">
              <label>Moving Specials</label>
              <select value={movingSpecial} onChange={(e) => applyMovingSpecial(e.target.value)}>
                <option value="custom">— Custom —</option>
                <option value="special_2men">$300 first 2 hrs / $150 addl — 2 Men, 2×17′ trucks</option>
                <option value="special_4men">$600 first 2 hrs / $300 addl — 4 Men, 2×17′ trucks</option>
                <option value="special_260">$260 first 2 hrs / $130 addl — 2 Men, 1×17′ truck</option>
                <option value="special_delivery">Delivery $150 first 1 hr / $150 addl — 2 Men, 1×17′ truck</option>
              </select>
              <small className="hint">Pick a special, then choose the arrival window above. Switch back to “Custom” to edit fields.</small>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Quoted Price for First Block ($)</label>
                <input type="number" value={blockPrice} onChange={(e) => setBlockPrice(e.target.value)} disabled={movingLocked} />
              </div>
              <div className="form-group half">
                <label>Duration of First Block (hrs)</label>
                <select value={blockHours} onChange={(e) => setBlockHours(e.target.value)} disabled={movingLocked}>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="1">1</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Additional Hour Rate ($)</label>
                <input type="number" value={additionalRate} onChange={(e) => setAdditionalRate(e.target.value)} disabled={movingLocked} />
              </div>
              <div className="form-group half">
                <label>Number of Movers</label>
                <select value={numMovers} onChange={(e) => setNumMovers(e.target.value)} disabled={movingLocked}>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Number of Trucks (blank if one)</label>
                <select value={truckInfo} onChange={(e) => setTruckInfo(e.target.value)} disabled={movingLocked}>
                  <option value=""></option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="form-group half">
                <label>Truck Size (Ft)</label>
                <select value={truckSize} onChange={(e) => setTruckSize(e.target.value)} disabled={movingLocked}>
                  <option value="17">17</option>
                  <option value="20">20</option>
                  <option value="26">26</option>
                </select>
              </div>
            </div>
          </>
        )}

        <button className="btn-primary" onClick={generateLink}>
          Generate Booking Link
        </button>
      </div>

      {/* Results */}
      <div className="card">
        <h3>Short Link</h3>
        {generatedLink ? (
          <>
            <a className="link" href={generatedLink} target="_blank" rel="noopener noreferrer">
              {generatedLink}
            </a>
            <button className="btn-secondary" onClick={copyShort}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </>
        ) : (
          <p className="muted">Generate a link to see it here.</p>
        )}

        <h3 style={{ marginTop: '1rem' }}>Long Link (Debug)</h3>
        {rawLink ? (
          <a className="link" href={rawLink} target="_blank" rel="noopener noreferrer">
            {rawLink}
          </a>
        ) : (
          <p className="muted">Shown for verification only.</p>
        )}
      </div>
    </div>
  );
}
