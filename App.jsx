import React, { useEffect, useMemo, useState } from 'react';

const SALES_REPS = ['*01*', '*02*', '*03*', '*04*', '*05*'];

const CARPET_PRESETS = [
  { id: 'cc100', label: 'Carpet Cleaning', price: '100', note: 'Fast close special' },
  { id: 'cc130', label: 'Carpet Cleaning', price: '130', note: 'Mid-ticket close' },
  { id: 'cc150', label: 'Carpet Cleaning', price: '150', note: 'Standard premium' },
  { id: 'cc200', label: 'Carpet Cleaning', price: '200', note: 'Higher-ticket close' },
  { id: 'cc250', label: 'Carpet Cleaning', price: '250', note: 'Large-home close' },
  { id: 'cc300', label: 'Carpet Cleaning', price: '300', note: 'Premium close' },
  { id: 'up200', label: 'Upholstery Cleaning', price: '200', note: 'Sofa / loveseat entry' },
  { id: 'up250', label: 'Upholstery Cleaning', price: '250', note: 'Mid-ticket upholstery' },
  { id: 'up300', label: 'Upholstery Cleaning', price: '300', note: 'Premium upholstery' },
];

const DUCT_PRESETS = [
  { id: 'deep500', label: 'Deep Duct Cleaning (No Furnace)', price: '500', note: 'Single-system close' },
  { id: 'deep600', label: 'Deep Duct Cleaning with Furnace', price: '600', note: 'Best-value upsell' },
  { id: 'deep1200', label: 'Deep Duct Cleaning (Two Units with Furnace)', price: '1200', note: 'Multi-system close' },
];

const MOVING_PRESETS = [
  {
    id: 'special_2men',
    label: '$300 first 2 hours',
    price: '300',
    hours: '2',
    rate: '150',
    movers: '2',
    trucks: '1',
    truckSize: '17',
    note: '$150 each additional hour',
  },
  {
    id: 'special_4men',
    label: '$600 first 2 hours',
    price: '600',
    hours: '2',
    rate: '300',
    movers: '4',
    trucks: '2',
    truckSize: '17',
    note: '$300 each additional hour / 4 men',
  },
  {
    id: 'special_260',
    label: '$260 first 2 hours',
    price: '260',
    hours: '2',
    rate: '130',
    movers: '2',
    trucks: '',
    truckSize: '17',
    note: '$130 each additional hour',
  },
  {
    id: 'special_delivery',
    label: '$200 first hour',
    price: '200',
    hours: '1',
    rate: '150',
    movers: '2',
    trucks: '',
    truckSize: '17',
    note: '$150 each additional hour / delivery',
  },
];

const ARRIVAL_WINDOWS = {
  carpet: [
    'Arrival between 8 and 12',
    'Arrival between 10 and 2',
    'Arrival between 12 and 4',
    'Arrival between 1 and 5',
    'Arrival between 3 and 7',
  ],
  duct: ['Arrival between 8 and 12', 'Arrival between 1 and 5'],
  moving: [
    'Arrival between 7 and 9',
    'Arrival between 9 to 11',
    'Arrival between 11 and 1',
    'Arrival between 1 and 3',
    'Arrival between 3 to 5',
    'Arrival between 6 and 8 pm',
  ],
};

const THEMES = {
  light: {
    page: '#f4f7fb',
    header: 'linear-gradient(135deg, #ffffff 0%, #eef4ff 100%)',
    card: '#ffffff',
    soft: '#f7f9fc',
    border: '#d8e0ea',
    text: '#0f172a',
    muted: '#64748b',
    accent: '#111827',
    accentText: '#ffffff',
    accentSoft: '#e5e7eb',
    accentSoftText: '#111827',
    info: '#0ea5e9',
    infoSoft: '#e0f2fe',
    success: '#16a34a',
    successSoft: '#dcfce7',
    danger: '#dc2626',
    dangerSoft: '#fee2e2',
    preview: '#0f172a',
    previewText: '#f8fafc',
  },
  gray: {
    page: '#eef1f5',
    header: 'linear-gradient(135deg, #ffffff 0%, #eceff4 100%)',
    card: '#ffffff',
    soft: '#f5f7fa',
    border: '#d4d9e1',
    text: '#111827',
    muted: '#6b7280',
    accent: '#1f2937',
    accentText: '#ffffff',
    accentSoft: '#e5e7eb',
    accentSoftText: '#111827',
    info: '#2563eb',
    infoSoft: '#dbeafe',
    success: '#15803d',
    successSoft: '#dcfce7',
    danger: '#b91c1c',
    dangerSoft: '#fee2e2',
    preview: '#111827',
    previewText: '#f9fafb',
  },
  sky: {
    page: '#eef8ff',
    header: 'linear-gradient(135deg, #ffffff 0%, #dff3ff 100%)',
    card: '#ffffff',
    soft: '#f3fbff',
    border: '#cfe7f5',
    text: '#0f172a',
    muted: '#5b7285',
    accent: '#0284c7',
    accentText: '#ffffff',
    accentSoft: '#dff3ff',
    accentSoftText: '#0c4a6e',
    info: '#0284c7',
    infoSoft: '#dff3ff',
    success: '#15803d',
    successSoft: '#dcfce7',
    danger: '#b91c1c',
    dangerSoft: '#fee2e2',
    preview: '#082f49',
    previewText: '#f0f9ff',
  },
};

function sanitizeNumber(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

function getArrivalTimes(mode, windowText) {
  const lookup = {
    carpet: {
      'Arrival between 8 and 12': { start: '8 AM', end: '12 PM' },
      'Arrival between 10 and 2': { start: '10 AM', end: '2 PM' },
      'Arrival between 12 and 4': { start: '12 PM', end: '4 PM' },
      'Arrival between 1 and 5': { start: '1 PM', end: '5 PM' },
      'Arrival between 3 and 7': { start: '3 PM', end: '7 PM' },
    },
    duct: {
      'Arrival between 8 and 12': { start: '8 AM', end: '12 PM' },
      'Arrival between 1 and 5': { start: '1 PM', end: '5 PM' },
    },
    moving: {
      'Arrival between 7 and 9': { start: '7 AM', end: '9 AM' },
      'Arrival between 9 to 11': { start: '9 AM', end: '11 AM' },
      'Arrival between 11 and 1': { start: '11 AM', end: '1 PM' },
      'Arrival between 1 and 3': { start: '1 PM', end: '3 PM' },
      'Arrival between 3 to 5': { start: '3 PM', end: '5 PM' },
      'Arrival between 6 and 8 pm': { start: '6 PM', end: '8 PM' },
    },
  };

  return lookup[mode]?.[windowText] || { start: '', end: '' };
}

function useScreen() {
  const getWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    function onResize() {
      setWidth(getWidth());
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);

  return {
    width,
    isMobile: width <= 767,
    isTablet: width >= 768 && width <= 1023,
    isDesktop: width >= 1024,
  };
}

function App() {
  const screen = useScreen();
  const { isMobile, isTablet, isDesktop } = screen;

  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('carpet');
  const [salesRep, setSalesRep] = useState('*04*');

  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('100');
  const [arrivalWindow, setArrivalWindow] = useState('Arrival between 8 and 12');

  const [blockPrice, setBlockPrice] = useState('300');
  const [blockHours, setBlockHours] = useState('2');
  const [additionalRate, setAdditionalRate] = useState('150');
  const [movingArrival, setMovingArrival] = useState('Arrival between 7 and 9');
  const [numMovers, setNumMovers] = useState('2');
  const [truckInfo, setTruckInfo] = useState('1');
  const [truckSize, setTruckSize] = useState('17');

  const [carpetSpecial, setCarpetSpecial] = useState('cc100');
  const [ductSpecial, setDuctSpecial] = useState('custom');
  const [movingSpecial, setMovingSpecial] = useState('special_2men');

  const [generatedLink, setGeneratedLink] = useState('');
  const [rawLink, setRawLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const colors = THEMES[theme];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.margin = '0';
      document.body.style.background = colors.page;
      document.body.style.fontFamily =
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    }
  }, [colors.page]);

  const currentArrivalWindow = mode === 'moving' ? movingArrival : arrivalWindow;
  const currentPrice = mode === 'moving' ? blockPrice : quotedPrice;
  const currentService = mode === 'moving' ? 'Moving' : serviceType;

  const bookingSummary = useMemo(() => {
    if (mode === 'moving') {
      const trucksLabel = truckInfo ? `(${truckInfo}) ` : '';
      return `${salesRep}
$${blockPrice} First ${blockHours} Hours Then $${additionalRate} per 
hour for each additional hour after that.
${movingArrival}
${numMovers} Men ${trucksLabel}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`;
    }

    return `${salesRep}
${serviceType}
$${quotedPrice} Special
${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee`;
  }, [
    mode,
    salesRep,
    blockPrice,
    blockHours,
    additionalRate,
    movingArrival,
    numMovers,
    truckInfo,
    truckSize,
    serviceType,
    quotedPrice,
    arrivalWindow,
  ]);

  const messageToCopy = generatedLink
    ? `Click on the link below so we can get your work order created:\n${generatedLink}`
    : '';

  const canGenerate = Boolean(
    salesRep &&
      currentArrivalWindow &&
      (mode === 'moving'
        ? blockPrice && blockHours && additionalRate && numMovers && truckSize
        : serviceType && quotedPrice)
  );

  function switchMode(nextMode) {
    setMode(nextMode);
    setErrorMessage('');
    setGeneratedLink('');
    setRawLink('');
    setCopied(false);

    if (nextMode === 'carpet') {
      setServiceType('Carpet Cleaning');
      setQuotedPrice('100');
      setArrivalWindow('Arrival between 8 and 12');
      setCarpetSpecial('cc100');
    } else if (nextMode === 'duct') {
      setServiceType('Deep Duct Cleaning with Furnace');
      setQuotedPrice('600');
      setArrivalWindow('Arrival between 8 and 12');
      setDuctSpecial('deep600');
    } else {
      setBlockPrice('300');
      setBlockHours('2');
      setAdditionalRate('150');
      setMovingArrival('Arrival between 7 and 9');
      setNumMovers('2');
      setTruckInfo('1');
      setTruckSize('17');
      setMovingSpecial('special_2men');
    }
  }

  function applyCarpetPreset(id) {
    setCarpetSpecial(id);
    const preset = CARPET_PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setServiceType(preset.label);
    setQuotedPrice(preset.price);
    setErrorMessage('');
  }

  function applyDuctPreset(id) {
    setDuctSpecial(id);
    const preset = DUCT_PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setServiceType(preset.label);
    setQuotedPrice(preset.price);
    setErrorMessage('');
  }

  function applyMovingPreset(id) {
    setMovingSpecial(id);
    const preset = MOVING_PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setBlockPrice(preset.price);
    setBlockHours(preset.hours);
    setAdditionalRate(preset.rate);
    setNumMovers(preset.movers);
    setTruckInfo(preset.trucks);
    setTruckSize(preset.truckSize);
    setErrorMessage('');
  }

  async function copyMessage() {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(messageToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  }

  async function copyLinkOnly() {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  }

  function generateLink() {
    const cleanQuotedPrice = sanitizeNumber(quotedPrice);
    const cleanBlockPrice = sanitizeNumber(blockPrice);
    const cleanAdditionalRate = sanitizeNumber(additionalRate);

    if ((mode === 'carpet' || mode === 'duct') && !cleanQuotedPrice) {
      setErrorMessage('Please enter a quoted price before generating the booking link.');
      setGeneratedLink('');
      setRawLink('');
      return;
    }

    if (mode === 'moving' && !cleanBlockPrice) {
      setErrorMessage('Please enter the first block price before generating the booking link.');
      setGeneratedLink('');
      setRawLink('');
      return;
    }

    if (mode === 'moving' && !cleanAdditionalRate) {
      setErrorMessage('Please enter the additional hourly rate before generating the booking link.');
      setGeneratedLink('');
      setRawLink('');
      return;
    }

    setErrorMessage('');

    const baseUrl =
      mode === 'duct'
        ? 'https://form.jotform.com/251573697976175'
        : mode === 'moving'
        ? 'https://form.jotform.com/251537865180159'
        : 'https://form.jotform.com/251536451249054';

    const finalPrice = mode === 'moving' ? cleanBlockPrice : cleanQuotedPrice;
    const finalService = mode === 'moving' ? 'Moving' : serviceType;
    const finalWindow = mode === 'moving' ? movingArrival : arrivalWindow;
    const { start, end } = getArrivalTimes(mode, finalWindow);

    const summary =
      mode === 'moving'
        ? `${salesRep}
$${cleanBlockPrice} First ${blockHours} Hours Then $${cleanAdditionalRate} per 
hour for each additional hour after that.
${movingArrival}
${numMovers} Men ${truckInfo ? `(${truckInfo}) ` : ''}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`
        : `${salesRep}
${serviceType}
$${cleanQuotedPrice} Special
${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee`;

    const fullLink =
      `${baseUrl}?bookingSummary=${encodeURIComponent(summary)}` +
      `&arrivalStart=${encodeURIComponent(start)}` +
      `&arrivalEnd=${encodeURIComponent(end)}` +
      `&arrivalWindow=${encodeURIComponent(finalWindow)}` +
      `&service=${encodeURIComponent(finalService)}` +
      `&price=${encodeURIComponent(finalPrice)}` +
      `&salesRep=${encodeURIComponent(salesRep)}`;

    setRawLink(fullLink);
    setCopied(false);
    setIsGenerating(true);

    fetch(`/api/shorten?url=${encodeURIComponent(fullLink)}`)
      .then((response) => response.json())
      .then(({ shortUrl }) => {
        setGeneratedLink(shortUrl || fullLink);
      })
      .catch(() => {
        setGeneratedLink(fullLink);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }

  const sectionTitleStyle = {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: colors.muted,
    marginBottom: 8,
  };

  const cardStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: isMobile ? 18 : 24,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
  };

  const softCardStyle = {
    background: colors.soft,
    border: `1px solid ${colors.border}`,
    borderRadius: isMobile ? 16 : 20,
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '13px 14px' : '14px 16px',
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    background: colors.soft,
    color: colors.text,
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box',
    minHeight: 48,
  };

  const labelStyle = {
    display: 'block',
    fontSize: 14,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 8,
  };

  const buttonBase = {
    border: 'none',
    borderRadius: 16,
    padding: isMobile ? '14px 14px' : '12px 16px',
    fontSize: isMobile ? 15 : 14,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: 48,
  };

  const topStatStyle = {
    ...softCardStyle,
    padding: 14,
  };

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'minmax(0, 1.18fr) minmax(360px, 0.82fr)' : '1fr',
    gap: 20,
    alignItems: 'start',
  };

  const heroGridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'minmax(0, 1.35fr) minmax(320px, 0.85fr)' : '1fr',
    gap: 18,
  };

  const dualFieldGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: 14,
  };

  const movingFieldGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))',
    gap: 14,
  };

  const validationGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
    gap: 18,
  };

  const presetGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 12,
    marginBottom: 18,
  };

  const topStatsGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, minmax(0, 1fr))',
    gap: 12,
    alignSelf: 'start',
  };

  const actionRowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 16,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.page,
        color: colors.text,
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: isMobile ? 12 : 20,
          paddingBottom: isMobile ? 28 : 20,
        }}
      >
        <div
          style={{
            ...cardStyle,
            background: colors.header,
            padding: isMobile ? 16 : 24,
            marginBottom: 20,
          }}
        >
          <div style={heroGridStyle}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 999,
                  background: colors.soft,
                  border: `1px solid ${colors.border}`,
                  fontSize: 12,
                  fontWeight: 800,
                  color: colors.muted,
                }}
              >
                Operator Console
              </div>

              <div
                style={{
                  fontSize: isMobile ? 26 : 34,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginTop: 14,
                }}
              >
                Booking Link Generator
              </div>

              <div
                style={{
                  fontSize: isMobile ? 14 : 16,
                  color: colors.muted,
                  marginTop: 10,
                  maxWidth: 760,
                  lineHeight: 1.5,
                }}
              >
                Single-file mobile + desktop rebuild. No extra packages. No extra CSS file changes.
                Price validation fixed. Moving price now uses the correct field.
              </div>
            </div>

            <div style={topStatsGrid}>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>Validation</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>Required before generate</div>
              </div>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>Sales Rep</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>{salesRep}</div>
              </div>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>Mode</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, textTransform: 'capitalize' }}>{mode}</div>
              </div>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>Output</div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>{generatedLink ? 'Short link ready' : 'Waiting to generate'}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={mainGridStyle}>
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ ...cardStyle, padding: isMobile ? 16 : 22 }}>
              <div style={sectionTitleStyle}>Step 1</div>
              <div style={{ fontSize: isMobile ? 21 : 24, fontWeight: 900, marginBottom: 18 }}>Choose mode and sales rep</div>

              <div style={{ display: 'grid', gap: 18 }}>
                <div>
                  <div style={labelStyle}>Theme</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {['light', 'gray', 'sky'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setTheme(item)}
                        style={{
                          ...buttonBase,
                          background: theme === item ? colors.accent : colors.soft,
                          color: theme === item ? colors.accentText : colors.text,
                          border: `1px solid ${theme === item ? colors.accent : colors.border}`,
                          textTransform: 'capitalize',
                          flex: isMobile ? '1 1 calc(33.33% - 10px)' : '0 0 auto',
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Service mode</div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
                      gap: 10,
                      padding: 8,
                      borderRadius: 18,
                      background: colors.soft,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {['carpet', 'moving', 'duct'].map((item) => (
                      <button
                        key={item}
                        onClick={() => switchMode(item)}
                        style={{
                          ...buttonBase,
                          background: mode === item ? colors.accent : colors.card,
                          color: mode === item ? colors.accentText : colors.text,
                          border: `1px solid ${mode === item ? colors.accent : colors.border}`,
                          textTransform: 'capitalize',
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={labelStyle}>Sales rep</div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(90px, 1fr))', gap: 10 }}>
                    {SALES_REPS.map((rep) => (
                      <button
                        key={rep}
                        onClick={() => setSalesRep(rep)}
                        style={{
                          ...buttonBase,
                          background: salesRep === rep ? colors.info : colors.card,
                          color: salesRep === rep ? '#ffffff' : colors.text,
                          border: `1px solid ${salesRep === rep ? colors.info : colors.border}`,
                          width: '100%',
                        }}
                      >
                        {rep}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...cardStyle, padding: isMobile ? 16 : 22 }}>
              <div style={sectionTitleStyle}>Step 2</div>
              <div style={{ fontSize: isMobile ? 21 : 24, fontWeight: 900, marginBottom: 18 }}>
                Pick a preset or customize the quote
              </div>

              {mode === 'carpet' && (
                <>
                  <div style={presetGridStyle}>
                    {CARPET_PRESETS.map((preset) => {
                      const active = carpetSpecial === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => applyCarpetPreset(preset.id)}
                          style={{
                            ...buttonBase,
                            textAlign: 'left',
                            padding: 16,
                            borderRadius: 20,
                            background: active ? colors.accent : colors.card,
                            color: active ? colors.accentText : colors.text,
                            border: `1px solid ${active ? colors.accent : colors.border}`,
                          }}
                        >
                          <div style={{ fontSize: 14, fontWeight: 900 }}>{preset.label}</div>
                          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{preset.note}</div>
                          <div
                            style={{
                              display: 'inline-block',
                              marginTop: 12,
                              padding: '6px 10px',
                              borderRadius: 999,
                              background: active ? 'rgba(255,255,255,0.14)' : colors.soft,
                              fontSize: 13,
                              fontWeight: 900,
                            }}
                          >
                            ${preset.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={dualFieldGrid}>
                    <div>
                      <label style={labelStyle}>Service type</label>
                      <input
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        style={inputStyle}
                        placeholder="Carpet Cleaning"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Quoted price ($)</label>
                      <input
                        value={quotedPrice}
                        onChange={(e) => setQuotedPrice(sanitizeNumber(e.target.value))}
                        style={{
                          ...inputStyle,
                          border: quotedPrice ? `1px solid ${colors.border}` : `1px solid ${colors.danger}`,
                          background: quotedPrice ? colors.soft : colors.dangerSoft,
                        }}
                        placeholder="100"
                      />
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: quotedPrice ? colors.success : colors.danger,
                          marginTop: 6,
                        }}
                      >
                        {quotedPrice ? 'Price ready.' : 'Price is required.'}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === 'duct' && (
                <>
                  <div style={presetGridStyle}>
                    {DUCT_PRESETS.map((preset) => {
                      const active = ductSpecial === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => applyDuctPreset(preset.id)}
                          style={{
                            ...buttonBase,
                            textAlign: 'left',
                            padding: 16,
                            borderRadius: 20,
                            background: active ? colors.accent : colors.card,
                            color: active ? colors.accentText : colors.text,
                            border: `1px solid ${active ? colors.accent : colors.border}`,
                          }}
                        >
                          <div style={{ fontSize: 14, fontWeight: 900 }}>{preset.label}</div>
                          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{preset.note}</div>
                          <div
                            style={{
                              display: 'inline-block',
                              marginTop: 12,
                              padding: '6px 10px',
                              borderRadius: 999,
                              background: active ? 'rgba(255,255,255,0.14)' : colors.soft,
                              fontSize: 13,
                              fontWeight: 900,
                            }}
                          >
                            ${preset.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={dualFieldGrid}>
                    <div>
                      <label style={labelStyle}>Service type</label>
                      <input
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        style={inputStyle}
                        placeholder="Deep Duct Cleaning with Furnace"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Quoted price ($)</label>
                      <input
                        value={quotedPrice}
                        onChange={(e) => setQuotedPrice(sanitizeNumber(e.target.value))}
                        style={{
                          ...inputStyle,
                          border: quotedPrice ? `1px solid ${colors.border}` : `1px solid ${colors.danger}`,
                          background: quotedPrice ? colors.soft : colors.dangerSoft,
                        }}
                        placeholder="600"
                      />
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: quotedPrice ? colors.success : colors.danger,
                          marginTop: 6,
                        }}
                      >
                        {quotedPrice ? 'Price ready.' : 'Price is required.'}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {mode === 'moving' && (
                <>
                  <div style={presetGridStyle}>
                    {MOVING_PRESETS.map((preset) => {
                      const active = movingSpecial === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => applyMovingPreset(preset.id)}
                          style={{
                            ...buttonBase,
                            textAlign: 'left',
                            padding: 16,
                            borderRadius: 20,
                            background: active ? colors.accent : colors.card,
                            color: active ? colors.accentText : colors.text,
                            border: `1px solid ${active ? colors.accent : colors.border}`,
                          }}
                        >
                          <div style={{ fontSize: 14, fontWeight: 900 }}>{preset.label}</div>
                          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{preset.note}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ ...dualFieldGrid, marginBottom: 14 }}>
                    <div>
                      <label style={labelStyle}>First block price ($)</label>
                      <input
                        value={blockPrice}
                        onChange={(e) => setBlockPrice(sanitizeNumber(e.target.value))}
                        style={{
                          ...inputStyle,
                          border: blockPrice ? `1px solid ${colors.border}` : `1px solid ${colors.danger}`,
                          background: blockPrice ? colors.soft : colors.dangerSoft,
                        }}
                        placeholder="300"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Additional hour rate ($)</label>
                      <input
                        value={additionalRate}
                        onChange={(e) => setAdditionalRate(sanitizeNumber(e.target.value))}
                        style={{
                          ...inputStyle,
                          border: additionalRate ? `1px solid ${colors.border}` : `1px solid ${colors.danger}`,
                          background: additionalRate ? colors.soft : colors.dangerSoft,
                        }}
                        placeholder="150"
                      />
                    </div>
                  </div>

                  <div style={movingFieldGrid}>
                    <div>
                      <label style={labelStyle}>First block hours</label>
                      <select value={blockHours} onChange={(e) => setBlockHours(e.target.value)} style={inputStyle}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Movers</label>
                      <select value={numMovers} onChange={(e) => setNumMovers(e.target.value)} style={inputStyle}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Trucks</label>
                      <select value={truckInfo} onChange={(e) => setTruckInfo(e.target.value)} style={inputStyle}>
                        <option value="">1 truck</option>
                        <option value="1">1 shown</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Truck size</label>
                      <select value={truckSize} onChange={(e) => setTruckSize(e.target.value)} style={inputStyle}>
                        <option value="17">17</option>
                        <option value="20">20</option>
                        <option value="26">26</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{ ...cardStyle, padding: isMobile ? 16 : 22 }}>
              <div style={sectionTitleStyle}>Step 3</div>
              <div style={{ fontSize: isMobile ? 21 : 24, fontWeight: 900, marginBottom: 18 }}>Schedule and validate</div>

              <div style={validationGrid}>
                <div>
                  <div style={labelStyle}>Arrival window</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {ARRIVAL_WINDOWS[mode].map((windowText) => {
                      const active = currentArrivalWindow === windowText;
                      return (
                        <button
                          key={windowText}
                          onClick={() =>
                            mode === 'moving' ? setMovingArrival(windowText) : setArrivalWindow(windowText)
                          }
                          style={{
                            ...buttonBase,
                            textAlign: 'left',
                            background: active ? colors.infoSoft : colors.card,
                            color: active ? colors.info : colors.text,
                            border: `1px solid ${active ? colors.info : colors.border}`,
                          }}
                        >
                          {windowText}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ ...softCardStyle, padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>Pre-flight validation</div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Sales rep</div>
                      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800 }}>{salesRep || 'Missing'}</div>
                    </div>

                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Price</div>
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 14,
                          fontWeight: 800,
                          color: currentPrice ? colors.success : colors.danger,
                        }}
                      >
                        {currentPrice ? `$${currentPrice}` : 'Missing'}
                      </div>
                    </div>

                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Arrival window</div>
                      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800 }}>Ready</div>
                    </div>

                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Output state</div>
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 14,
                          fontWeight: 800,
                          color: canGenerate ? colors.success : colors.danger,
                        }}
                      >
                        {canGenerate ? 'Can generate' : 'Blocked'}
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: 12,
                        borderRadius: 14,
                        background: colors.dangerSoft,
                        color: colors.danger,
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 20 }}>
            <div
              style={{
                ...cardStyle,
                padding: isMobile ? 16 : 22,
                position: isDesktop ? 'sticky' : 'static',
                top: isDesktop ? 20 : 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: 10, flexDirection: isMobile ? 'column' : 'row' }}>
                <div>
                  <div style={sectionTitleStyle}>Live Preview</div>
                  <div style={{ fontSize: isMobile ? 21 : 24, fontWeight: 900 }}>Customer-facing booking summary</div>
                </div>

                <button
                  onClick={() => setShowDebug((prev) => !prev)}
                  style={{
                    ...buttonBase,
                    background: colors.soft,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  {showDebug ? 'Hide Debug' : 'Open Debug'}
                </button>
              </div>

              <div
                style={{
                  marginTop: 16,
                  padding: isMobile ? 14 : 18,
                  borderRadius: 20,
                  background: colors.preview,
                  color: colors.previewText,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '6px 10px',
                    borderRadius: 999,
                    background: canGenerate ? 'rgba(22, 163, 74, 0.18)' : 'rgba(220, 38, 38, 0.18)',
                    color: canGenerate ? '#86efac' : '#fca5a5',
                    fontSize: 11,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {canGenerate ? 'Valid' : 'Needs input'}
                </div>

                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    margin: '16px 0 0 0',
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: 1.65,
                    fontFamily: 'inherit',
                    wordBreak: 'break-word',
                  }}
                >
                  {bookingSummary}
                </pre>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, marginTop: 16 }}>
                <div style={{ ...softCardStyle, padding: 14 }}>
                  <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>Price</div>
                  <div style={{ fontSize: isMobile ? 24 : 28, fontWeight: 900, marginTop: 8 }}>
                    ${currentPrice || '—'}
                  </div>
                  <div style={{ fontSize: 12, color: colors.muted, marginTop: 6 }}>
                    {mode === 'moving' ? `+$${additionalRate || '0'} each additional hour` : currentService}
                  </div>
                </div>

                <div style={{ ...softCardStyle, padding: 14 }}>
                  <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>Arrival</div>
                  <div style={{ fontSize: 16, fontWeight: 900, marginTop: 8, lineHeight: 1.4 }}>
                    {currentArrivalWindow}
                  </div>
                </div>
              </div>

              <div style={{ ...softCardStyle, padding: 14, marginTop: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 900 }}>Message that gets copied</div>
                <textarea
                  rows={isMobile ? 4 : 3}
                  readOnly
                  value={
                    messageToCopy ||
                    'Click on the link below so we can get your work order created:\n[short link will appear here]'
                  }
                  style={{
                    ...inputStyle,
                    marginTop: 10,
                    resize: 'vertical',
                    background: colors.card,
                  }}
                />
              </div>

              <div style={actionRowStyle}>
                <button
                  onClick={generateLink}
                  disabled={!canGenerate || isGenerating}
                  style={{
                    ...buttonBase,
                    background: !canGenerate || isGenerating ? colors.accentSoft : colors.accent,
                    color: !canGenerate || isGenerating ? colors.muted : colors.accentText,
                    cursor: !canGenerate || isGenerating ? 'not-allowed' : 'pointer',
                    width: isMobile ? '100%' : 'auto',
                    flex: isMobile ? '0 0 100%' : '0 0 auto',
                  }}
                >
                  {isGenerating ? 'Generating...' : 'Generate Link'}
                </button>

                <button
                  onClick={copyMessage}
                  disabled={!generatedLink}
                  style={{
                    ...buttonBase,
                    background: generatedLink ? colors.card : colors.accentSoft,
                    color: generatedLink ? colors.text : colors.muted,
                    border: `1px solid ${generatedLink ? colors.border : colors.accentSoft}`,
                    cursor: generatedLink ? 'pointer' : 'not-allowed',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy Message'}
                </button>

                <button
                  onClick={copyLinkOnly}
                  disabled={!generatedLink}
                  style={{
                    ...buttonBase,
                    background: generatedLink ? colors.card : colors.accentSoft,
                    color: generatedLink ? colors.text : colors.muted,
                    border: `1px solid ${generatedLink ? colors.border : colors.accentSoft}`,
                    cursor: generatedLink ? 'pointer' : 'not-allowed',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  Copy Link Only
                </button>
              </div>

              {generatedLink && (
                <div style={{ ...softCardStyle, padding: 14, marginTop: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 10 }}>Short Link</div>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: colors.info,
                      fontWeight: 800,
                      fontSize: 14,
                      wordBreak: 'break-all',
                      textDecoration: 'none',
                    }}
                  >
                    {generatedLink}
                  </a>
                </div>
              )}

              {showDebug && (
                <div style={{ ...softCardStyle, padding: 14, marginTop: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 10 }}>Advanced Debug</div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Service</div>
                      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800 }}>{currentService}</div>
                    </div>

                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Price param</div>
                      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800 }}>${currentPrice || 'missing'}</div>
                    </div>

                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Sales rep</div>
                      <div style={{ marginTop: 6, fontSize: 14, fontWeight: 800 }}>{salesRep}</div>
                    </div>

                    <div style={{ ...softCardStyle, padding: 12, background: colors.card }}>
                      <div style={{ fontSize: 12, color: colors.muted, fontWeight: 800 }}>Long Link (Debug)</div>
                      {rawLink ? (
                        <a
                          href={rawLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            marginTop: 6,
                            color: colors.info,
                            fontWeight: 700,
                            fontSize: 13,
                            lineHeight: 1.5,
                            wordBreak: 'break-all',
                            textDecoration: 'none',
                          }}
                        >
                          {rawLink}
                        </a>
                      ) : (
                        <div style={{ marginTop: 6, fontSize: 13, color: colors.muted }}>
                          Generate a link to see debug output.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
