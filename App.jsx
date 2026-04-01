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
  const [salesRep, setSalesRep] = useState('');

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
    const salesRepLine = salesRep ? `${salesRep}\n` : '';

    if (mode === 'moving') {
      const trucksLabel = truckInfo ? `(${truckInfo}) ` : '';
      return `${salesRepLine}$${blockPrice} First ${blockHours} Hours Then $${additionalRate} per 
hour for each additional hour after that.
${movingArrival}
${numMovers} Men ${trucksLabel}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`;
    }

    return `${salesRepLine}${serviceType}
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
    const salesRepLine = salesRep ? `${salesRep}\n` : '';

    const summary =
      mode === 'moving'
        ? `${salesRepLine}$${cleanBlockPrice} First ${blockHours} Hours Then $${cleanAdditionalRate} per 
hour for each additional hour after that.
${movingArrival}
${numMovers} Men ${truckInfo ? `(${truckInfo}) ` : ''}${truckSize} Ft Trucks
Payment methods:
Cash, CashApp, Zelle
CashApp payment $5 fee

***First ${blockHours}hrs due at arrival***`
        : `${salesRepLine}${serviceType}
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
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>
                  Validation
                </div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>Required before generate</div>
              </div>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>
                  Sales Rep
                </div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>{salesRep || 'Blank allowed'}</div>
              </div>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>
                  Mode
                </div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, textTransform: 'capitalize' }}>{mode}</div>
              </div>
              <div style={topStatStyle}>
                <div style={{ fontSize: 11, color: colors.muted, fontWeight: 800, textTransform: 'uppercase' }}>
                  Output
                </div>
                <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>
                  {generatedLink ? 'Short link ready' : 'Waiting to generate'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={mainGridStyle}>
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ ...cardStyle, padding: isMobile ? 16 : 22 }}>
              <div style={sectionTitleStyle}>Step 1</div>
              <div style={{ fontSize: isMobile ? 21 : 24, fontWeight: 900, marginBottom: 18 }}>
                Choose mode and sales rep
              </div>

              <div style={{ display: 'grid', gap: 18 }}>
                <div>
                  <div style={labelStyle}>Theme</div>
                  <div style={{ display:
