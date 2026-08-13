import React, { useEffect, useMemo, useState } from 'react';

/* ============================================================ */
/* Icons — hand-drawn, stroke-based, zero external dependencies  */
/* (the live project only has react + react-dom installed)       */
/* ============================================================ */

function Icon({ children, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

const IconDroplet = (props) => (
  <Icon {...props}>
    <path d="M12 2.5c3.6 4.4 6.5 8.2 6.5 11.7a6.5 6.5 0 0 1-13 0c0-3.5 2.9-7.3 6.5-11.7Z" />
  </Icon>
);

const IconWind = (props) => (
  <Icon {...props}>
    <path d="M3 8h9.7a2.4 2.4 0 1 0-2.2-3.3" />
    <path d="M3 12.5h13.2a2.4 2.4 0 1 1-2.2 3.3" />
    <path d="M3 17h7.3a2 2 0 1 1-1.8 2.7" />
  </Icon>
);

const IconTruck = (props) => (
  <Icon {...props}>
    <rect x="1.5" y="7" width="11" height="9" rx="1" />
    <path d="M12.5 10h3.6l3.4 3.2V16h-7z" />
    <circle cx="6" cy="17.6" r="1.7" />
    <circle cx="16.6" cy="17.6" r="1.7" />
  </Icon>
);

const IconTrash = (props) => (
  <Icon {...props}>
    <path d="M4 6.5h16" />
    <path d="M9 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h3.4A1.3 1.3 0 0 1 15 4.8v1.7" />
    <path d="M6 6.5 6.9 19a1.5 1.5 0 0 0 1.5 1.4h7.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.5" />
    <path d="M10 10.5v6" />
    <path d="M14 10.5v6" />
  </Icon>
);

const IconSun = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" />
  </Icon>
);

const IconMoon = (props) => (
  <Icon {...props}>
    <path d="M20 14.2A8.3 8.3 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
  </Icon>
);

const IconCopy = (props) => (
  <Icon {...props}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="1.7" />
    <path d="M5.5 15.5h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

const IconCheck = (props) => (
  <Icon {...props}>
    <path d="M4 12.5l5 5 11-11" />
  </Icon>
);

const IconPencil = (props) => (
  <Icon {...props}>
    <path d="M4 20l.9-4 10.5-10.5a2 2 0 0 1 2.8 0l.8.8a2 2 0 0 1 0 2.8L8.5 19.6 4 20.5Z" />
    <path d="M13.4 6.6l3.5 3.5" />
  </Icon>
);

const IconArrowRight = (props) => (
  <Icon {...props}>
    <path d="M4 12h16M13 5l7 7-7 7" />
  </Icon>
);

const IconLink = (props) => (
  <Icon {...props}>
    <path d="M9.5 14.5l5-5" />
    <path d="M11 6.5l1.4-1.4a4 4 0 0 1 5.6 5.6L16.6 12" />
    <path d="M13 17.5l-1.4 1.4a4 4 0 0 1-5.6-5.6L7.4 12" />
  </Icon>
);

const IconChevronDown = (props) => (
  <Icon {...props}>
    <path d="M5.5 8.5l6.5 6.5 6.5-6.5" />
  </Icon>
);

/* ============================================================ */
/* Business data — identical to the live app, untouched          */
/* ============================================================ */

const SALES_REPS = ['', '*01*', '*02*', '*03*', '*04*', '*05*'];

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
  {
    id: 'special_3men',
    label: '$450 first 2 hours',
    price: '450',
    hours: '2',
    rate: '225',
    movers: '3',
    trucks: '1',
    truckSize: '17',
    note: '$225 each additional hour / 3 men',
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
    'Arrival between 7 and 10',
    'Arrival between 9 to 11',
    'Arrival between 11 and 2',
    'Arrival between 1 and 3',
    'Arrival between 3 and 6',
    'Arrival between 6 and 8 pm',
  ],
  junk: ['Arrival between 8 and 12', 'Arrival between 12 and 4', 'Arrival between 4 and 8'],
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
      'Arrival between 7 and 10': { start: '7 AM', end: '10 AM' },
      'Arrival between 9 to 11': { start: '9 AM', end: '11 AM' },
      'Arrival between 11 and 2': { start: '11 AM', end: '2 PM' },
      'Arrival between 1 and 3': { start: '1 PM', end: '3 PM' },
      'Arrival between 3 and 6': { start: '3 PM', end: '6 PM' },
      'Arrival between 6 and 8 pm': { start: '6 PM', end: '8 PM' },
    },
    junk: {
      'Arrival between 8 and 12': { start: '8 AM', end: '12 PM' },
      'Arrival between 12 and 4': { start: '12 PM', end: '4 PM' },
      'Arrival between 4 and 8': { start: '4 PM', end: '8 PM' },
    },
  };
  return lookup[mode]?.[windowText] || { start: '', end: '' };
}

/* ============================================================ */
/* Design system                                                 */
/* ============================================================ */

const MODE_META = {
  carpet: { label: 'Carpet / Upholstery', short: 'Carpet', icon: IconDroplet, accent: '#0D9488', soft: '#CCFBF1', softDark: 'rgba(45,212,191,0.16)' },
  duct: { label: 'Duct Cleaning', short: 'Duct', icon: IconWind, accent: '#2563EB', soft: '#DBEAFE', softDark: 'rgba(96,165,250,0.16)' },
  moving: { label: 'Moving', short: 'Moving', icon: IconTruck, accent: '#DC2626', soft: '#FEE2E2', softDark: 'rgba(248,113,113,0.16)' },
  junk: { label: 'Junk Removal', short: 'Junk', icon: IconTrash, accent: '#EA580C', soft: '#FFEDD5', softDark: 'rgba(251,146,60,0.16)' },
};

const BASE = {
  light: {
    page: '#F4F5FA',
    surface: '#FFFFFF',
    surfaceAlt: '#FAFAFD',
    line: '#E5E7F0',
    ink: '#12141C',
    muted: '#6B7180',
    shadow: '0 1px 2px rgba(18,20,28,0.04), 0 12px 28px -16px rgba(18,20,28,0.16)',
  },
  dark: {
    page: '#0A0B0F',
    surface: '#15161D',
    surfaceAlt: '#1A1C25',
    line: '#272935',
    ink: '#F2F3F7',
    muted: '#9298A8',
    shadow: '0 1px 2px rgba(0,0,0,0.3), 0 16px 32px -18px rgba(0,0,0,0.6)',
  },
};

const FONT_DISPLAY = '"Space Grotesk", "Segoe UI", sans-serif';
const FONT_BODY = '"Plus Jakarta Sans", "Segoe UI", sans-serif';
const FONT_MONO = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';

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

/* ============================================================ */
/* App                                                            */
/* ============================================================ */

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
  const [movingArrival, setMovingArrival] = useState('Arrival between 7 and 10');
  const [numMovers, setNumMovers] = useState('2');
  const [truckInfo, setTruckInfo] = useState('1');
  const [truckSize, setTruckSize] = useState('17');

  const [carpetSpecial, setCarpetSpecial] = useState('cc100');
  const [ductSpecial, setDuctSpecial] = useState('custom');
  const [movingSpecial, setMovingSpecial] = useState('special_2men');

  const [junkQuarterPrice, setJunkQuarterPrice] = useState('200');
  const [junkHalfPrice, setJunkHalfPrice] = useState('400');
  const [junkFullPrice, setJunkFullPrice] = useState('800');
  const [junkArrival, setJunkArrival] = useState('Arrival between 4 and 8');
  const [junkTruckSize, setJunkTruckSize] = useState('17');
  const [junkFlatRate, setJunkFlatRate] = useState('');
  const [junkRetrievalFee, setJunkRetrievalFee] = useState('');
  const [junkHourlyRetrievalFee, setJunkHourlyRetrievalFee] = useState('');

  const [generatedLink, setGeneratedLink] = useState('');
  const [rawLink, setRawLink] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [messageDraft, setMessageDraft] = useState('');
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const colors = BASE[theme];
  const modeMeta = MODE_META[mode];
  const accent = modeMeta.accent;
  const accentSoft = theme === 'dark' ? modeMeta.softDark : modeMeta.soft;

  // Load display fonts + inject a small global stylesheet for things inline
  // styles can't express (focus rings tied to the live mode color, reduced
  // motion, placeholder color). Runs once.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!document.getElementById('blg-fonts')) {
      const link = document.createElement('link');
      link.id = 'blg-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('blg-globals')) {
      const style = document.createElement('style');
      style.id = 'blg-globals';
      style.textContent = `
        * { box-sizing: border-box; }
        input, select, textarea, button { font-family: inherit; }
        input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible {
          outline: 2px solid var(--blg-accent, #0D9488);
          outline-offset: 2px;
        }
        input::placeholder, textarea::placeholder { color: var(--blg-muted, #9AA1B2); opacity: 0.8; }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.margin = '0';
      document.body.style.background = colors.page;
    }
  }, [colors.page]);

  useEffect(() => {
    if (generatedLink) {
      setMessageDraft(
        `Click the link below to get your work order started:\n\n${generatedLink}\n\nNot clickable? Copy and paste it into your browser.`
      );
    } else {
      setMessageDraft('');
    }
    setIsEditingMessage(false);
  }, [generatedLink]);

  const currentArrivalWindow = mode === 'moving' ? movingArrival : mode === 'junk' ? junkArrival : arrivalWindow;

  const genericLink = useMemo(() => {
    return mode === 'duct'
      ? 'https://form.jotform.com/251573697976175'
      : mode === 'moving'
      ? 'https://form.jotform.com/251537865180159'
      : mode === 'junk'
      ? 'https://form.jotform.com/251537865180159'
      : 'https://form.jotform.com/251536451249054';
  }, [mode]);

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

    if (mode === 'junk') {
      const pricingBlock = junkFlatRate
        ? `Flat Rate: $${junkFlatRate}`
        : `$${junkQuarterPrice} 1/4 of a truck\n$${junkHalfPrice} 1/2 of a truck\n$${junkFullPrice} full truck load`;
      const retrievalLine = junkRetrievalFee ? `Retrieval Fee: $${junkRetrievalFee}\n` : '';
      const hourlyRetrievalLine = junkHourlyRetrievalFee ? `Hourly Retrieval Fee: $${junkHourlyRetrievalFee}/hr\n` : '';
      return `${salesRepLine}Truck Size: ${junkTruckSize}ft
${pricingBlock}
${retrievalLine}${hourlyRetrievalLine}${junkArrival}
Payment methods:
Cash, CashApp, Zelle`;
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
    junkQuarterPrice,
    junkHalfPrice,
    junkFullPrice,
    junkArrival,
    junkTruckSize,
    junkFlatRate,
    junkRetrievalFee,
    junkHourlyRetrievalFee,
  ]);

  const canGenerate = Boolean(
    currentArrivalWindow &&
      (mode === 'moving'
        ? blockPrice && blockHours && additionalRate && numMovers && truckSize
        : mode === 'junk'
        ? junkTruckSize && (junkFlatRate || (junkQuarterPrice && junkHalfPrice && junkFullPrice))
        : serviceType && quotedPrice)
  );

  function switchMode(nextMode) {
    setMode(nextMode);
    setErrorMessage('');
    setGeneratedLink('');
    setRawLink('');
    setCopiedField('');

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
    } else if (nextMode === 'junk') {
      setJunkQuarterPrice('200');
      setJunkHalfPrice('400');
      setJunkFullPrice('800');
      setJunkArrival('Arrival between 4 and 8');
      setJunkTruckSize('17');
      setJunkFlatRate('');
      setJunkRetrievalFee('');
      setJunkHourlyRetrievalFee('');
    } else {
      setBlockPrice('300');
      setBlockHours('2');
      setAdditionalRate('150');
      setMovingArrival('Arrival between 7 and 10');
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

  async function copyToClipboard(text, fieldName) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 1500);
    } catch (error) {
      setCopiedField('');
    }
  }

  function generateLink() {
    const cleanQuotedPrice = sanitizeNumber(quotedPrice);
    const cleanBlockPrice = sanitizeNumber(blockPrice);
    const cleanAdditionalRate = sanitizeNumber(additionalRate);
    const cleanJunkQuarterPrice = sanitizeNumber(junkQuarterPrice);
    const cleanJunkHalfPrice = sanitizeNumber(junkHalfPrice);
    const cleanJunkFullPrice = sanitizeNumber(junkFullPrice);
    const cleanJunkFlatRate = sanitizeNumber(junkFlatRate);

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

    if (mode === 'junk' && !junkTruckSize) {
      setErrorMessage('Please enter a truck size before generating the booking link.');
      setGeneratedLink('');
      setRawLink('');
      return;
    }

    if (mode === 'junk' && !cleanJunkFlatRate && !(cleanJunkQuarterPrice && cleanJunkHalfPrice && cleanJunkFullPrice)) {
      setErrorMessage('Please enter a flat rate, or all three truck-load prices, before generating the booking link.');
      setGeneratedLink('');
      setRawLink('');
      return;
    }

    setErrorMessage('');

    const baseUrl = genericLink;

    const finalPrice = mode === 'moving' ? cleanBlockPrice : mode === 'junk' ? cleanJunkFlatRate || '' : cleanQuotedPrice;
    const finalService = mode === 'moving' ? 'Moving' : mode === 'junk' ? 'Junk Removal' : serviceType;
    const finalWindow = mode === 'moving' ? movingArrival : mode === 'junk' ? junkArrival : arrivalWindow;
    const { start, end } = getArrivalTimes(mode, finalWindow);
    const salesRepLine = salesRep ? `${salesRep}\n` : '';

    const junkPricingBlock = cleanJunkFlatRate
      ? `Flat Rate: $${cleanJunkFlatRate}`
      : `$${cleanJunkQuarterPrice} 1/4 of a truck\n$${cleanJunkHalfPrice} 1/2 of a truck\n$${cleanJunkFullPrice} full truck load`;
    const junkRetrievalLine = junkRetrievalFee ? `Retrieval Fee: $${junkRetrievalFee}\n` : '';
    const junkHourlyRetrievalLine = junkHourlyRetrievalFee ? `Hourly Retrieval Fee: $${junkHourlyRetrievalFee}/hr\n` : '';

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
        : mode === 'junk'
        ? `${salesRepLine}Truck Size: ${junkTruckSize}ft
${junkPricingBlock}
${junkRetrievalLine}${junkHourlyRetrievalLine}${junkArrival}
Payment methods:
Cash, CashApp, Zelle`
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
    setCopiedField('');
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

  /* -------------------------------------------------------- */
  /* Shared style helpers                                      */
  /* -------------------------------------------------------- */

  const cardStyle = {
    background: colors.surface,
    border: `1px solid ${colors.line}`,
    borderRadius: 18,
    boxShadow: colors.shadow,
    padding: isMobile ? 18 : 24,
  };

  const eyebrowStyle = {
    fontFamily: FONT_MONO,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: colors.muted,
  };

  const labelStyle = {
    display: 'block',
    fontSize: 13.5,
    fontWeight: 600,
    color: colors.ink,
    marginBottom: 7,
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '13px 14px' : '12px 14px',
    borderRadius: 12,
    border: `1.5px solid ${colors.line}`,
    background: colors.surfaceAlt,
    color: colors.ink,
    fontSize: 15.5,
    outline: 'none',
    boxSizing: 'border-box',
    minHeight: 46,
    transition: 'border-color 0.15s ease',
  };

  const pillBase = {
    border: 'none',
    borderRadius: 999,
    padding: '10px 16px',
    fontSize: 13.5,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    minHeight: 40,
  };

  const buttonBase = {
    border: 'none',
    borderRadius: 12,
    padding: isMobile ? '14px 16px' : '12px 18px',
    fontSize: 14.5,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    minHeight: 48,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };

  const tileStyle = (isActive) => ({
    textAlign: 'left',
    padding: 14,
    borderRadius: 14,
    cursor: 'pointer',
    border: `1.5px solid ${isActive ? accent : colors.line}`,
    background: isActive ? accentSoft : colors.surfaceAlt,
    color: colors.ink,
    transition: 'all 0.15s ease',
    position: 'relative',
  });

  const dualFieldGrid = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 };
  const movingFieldGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))',
    gap: 14,
  };
  const presetGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: 12,
    marginBottom: 18,
  };

  function copyButton(label, value, field, opts = {}) {
    const isCopied = copiedField === field;
    const disabled = !value;
    return (
      <button
        onClick={() => copyToClipboard(value, field)}
        disabled={disabled}
        style={{
          ...buttonBase,
          background: opts.primary ? accent : 'rgba(255,255,255,0.08)',
          color: opts.primary ? '#ffffff' : '#F1F2F6',
          opacity: disabled ? 0.45 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          flex: isMobile ? '1 1 45%' : '1 1 0',
        }}
      >
        {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        {isCopied ? 'Copied' : label}
      </button>
    );
  }

  /* -------------------------------------------------------- */
  /* Render                                                     */
  /* -------------------------------------------------------- */

  return (
    <div
      style={{
        '--blg-accent': accent,
        '--blg-muted': colors.muted,
        minHeight: '100vh',
        width: '100%',
        background: colors.page,
        color: colors.ink,
        fontFamily: FONT_BODY,
        padding: isMobile ? '20px 14px 60px' : '36px 32px 80px',
        transition: 'background 0.2s ease',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: isMobile ? 20 : 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                background: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
            >
              <IconLink size={19} />
            </div>
            <div>
              <div style={eyebrowStyle}>Ops Console</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: isMobile ? 18 : 21, lineHeight: 1.1 }}>
                Booking Link Generator
              </div>
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle light and dark mode"
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              border: `1.5px solid ${colors.line}`,
              background: colors.surface,
              color: colors.ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
          </button>
        </div>

        {/* Mode switcher — signature element */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, minmax(0, 1fr))',
            gap: 10,
            marginBottom: isMobile ? 20 : 28,
          }}
        >
          {Object.entries(MODE_META).map(([id, meta]) => {
            const isActive = mode === id;
            const ModeIcon = meta.icon;
            return (
              <button
                key={id}
                onClick={() => switchMode(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: isMobile ? '13px 14px' : '15px 18px',
                  borderRadius: 15,
                  border: `1.5px solid ${isActive ? meta.accent : colors.line}`,
                  background: isActive ? meta.accent : colors.surface,
                  color: isActive ? '#ffffff' : colors.ink,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? colors.shadow : 'none',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: isActive ? 'rgba(255,255,255,0.2)' : theme === 'dark' ? meta.softDark : meta.soft,
                    color: isActive ? '#fff' : meta.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ModeIcon size={16} />
                </span>
                <span style={{ fontWeight: 700, fontSize: isMobile ? 13.5 : 14.5 }}>
                  {isMobile ? meta.short : meta.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'minmax(0, 1.15fr) minmax(360px, 0.85fr)' : '1fr',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {/* Left column — form */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={cardStyle}>
              <div style={{ ...eyebrowStyle, marginBottom: 14 }}>Step 1 &middot; Setup</div>

              <div style={{ marginBottom: 16 }}>
                <div style={labelStyle}>Sales Rep</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {SALES_REPS.map((rep) => {
                    const isActive = salesRep === rep;
                    return (
                      <button
                        key={rep || 'none'}
                        onClick={() => setSalesRep(isActive ? '' : rep)}
                        style={{
                          ...pillBase,
                          minWidth: 54,
                          background: isActive ? accent : colors.surfaceAlt,
                          color: isActive ? '#ffffff' : colors.ink,
                          border: `1.5px solid ${isActive ? accent : colors.line}`,
                        }}
                      >
                        {rep || 'None'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ ...eyebrowStyle, marginBottom: 4 }}>Step 2 &middot; Pricing</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: isMobile ? 19 : 22, marginBottom: 18 }}>
                {mode === 'moving'
                  ? 'Set the moving block rate'
                  : mode === 'junk'
                  ? 'Set the junk removal pricing'
                  : 'Set the service and price'}
              </div>

              {(mode === 'carpet' || mode === 'duct') && (
                <>
                  <div style={presetGridStyle}>
                    {(mode === 'carpet' ? CARPET_PRESETS : DUCT_PRESETS).map((preset) => {
                      const activeId = mode === 'carpet' ? carpetSpecial : ductSpecial;
                      const isActive = activeId === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => (mode === 'carpet' ? applyCarpetPreset(preset.id) : applyDuctPreset(preset.id))}
                          style={tileStyle(isActive)}
                        >
                          {isActive && (
                            <span
                              style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: accent,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <IconCheck size={11} />
                            </span>
                          )}
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: colors.muted }}>{preset.label}</div>
                          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 21, fontWeight: 700, marginTop: 4 }}>
                            ${preset.price}
                          </div>
                          <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>{preset.note}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={dualFieldGrid}>
                    <div>
                      <div style={labelStyle}>Service Type</div>
                      <input style={inputStyle} value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
                    </div>
                    <div>
                      <div style={labelStyle}>Quoted Price ($)</div>
                      <input
                        style={inputStyle}
                        value={quotedPrice}
                        onChange={(e) => setQuotedPrice(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div style={labelStyle}>Arrival Window</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ARRIVAL_WINDOWS[mode].map((windowText) => {
                        const isActive = arrivalWindow === windowText;
                        return (
                          <button
                            key={windowText}
                            onClick={() => setArrivalWindow(windowText)}
                            style={{
                              ...pillBase,
                              background: isActive ? accent : colors.surfaceAlt,
                              color: isActive ? '#ffffff' : colors.ink,
                              border: `1.5px solid ${isActive ? accent : colors.line}`,
                            }}
                          >
                            {windowText}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {mode === 'moving' && (
                <>
                  <div style={presetGridStyle}>
                    {MOVING_PRESETS.map((preset) => {
                      const isActive = movingSpecial === preset.id;
                      return (
                        <button key={preset.id} onClick={() => applyMovingPreset(preset.id)} style={tileStyle(isActive)}>
                          {isActive && (
                            <span
                              style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: accent,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <IconCheck size={11} />
                            </span>
                          )}
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: colors.muted }}>{preset.label}</div>
                          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 21, fontWeight: 700, marginTop: 4 }}>
                            ${preset.price}
                          </div>
                          <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>{preset.note}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div style={movingFieldGrid}>
                    <div>
                      <div style={labelStyle}>First Block Price ($)</div>
                      <input
                        style={inputStyle}
                        value={blockPrice}
                        onChange={(e) => setBlockPrice(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>Block Hours</div>
                      <input
                        style={inputStyle}
                        value={blockHours}
                        onChange={(e) => setBlockHours(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>Additional Rate ($/hr)</div>
                      <input
                        style={inputStyle}
                        value={additionalRate}
                        onChange={(e) => setAdditionalRate(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}># of Movers</div>
                      <input
                        style={inputStyle}
                        value={numMovers}
                        onChange={(e) => setNumMovers(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}># of Trucks</div>
                      <input
                        style={inputStyle}
                        value={truckInfo}
                        onChange={(e) => setTruckInfo(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>Truck Size (ft)</div>
                      <input
                        style={inputStyle}
                        value={truckSize}
                        onChange={(e) => setTruckSize(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div style={labelStyle}>Arrival Window</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ARRIVAL_WINDOWS.moving.map((windowText) => {
                        const isActive = movingArrival === windowText;
                        return (
                          <button
                            key={windowText}
                            onClick={() => setMovingArrival(windowText)}
                            style={{
                              ...pillBase,
                              background: isActive ? accent : colors.surfaceAlt,
                              color: isActive ? '#ffffff' : colors.ink,
                              border: `1.5px solid ${isActive ? accent : colors.line}`,
                            }}
                          >
                            {windowText}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {mode === 'junk' && (
                <>
                  <div style={movingFieldGrid}>
                    <div>
                      <div style={labelStyle}>Truck Size (ft)</div>
                      <input
                        style={inputStyle}
                        value={junkTruckSize}
                        onChange={(e) => setJunkTruckSize(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>1/4 Truck ($)</div>
                      <input
                        style={inputStyle}
                        value={junkQuarterPrice}
                        onChange={(e) => setJunkQuarterPrice(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>1/2 Truck ($)</div>
                      <input
                        style={inputStyle}
                        value={junkHalfPrice}
                        onChange={(e) => setJunkHalfPrice(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>Full Truck ($)</div>
                      <input
                        style={inputStyle}
                        value={junkFullPrice}
                        onChange={(e) => setJunkFullPrice(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div style={{ fontSize: 12.5, color: colors.muted, marginTop: 10, marginBottom: 16, lineHeight: 1.5 }}>
                    All three truck-load prices show together by default, since the load size isn&rsquo;t known until
                    you&rsquo;re at the customer&rsquo;s home.
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
                      gap: 14,
                    }}
                  >
                    <div>
                      <div style={labelStyle}>Flat Rate ($)</div>
                      <input
                        style={inputStyle}
                        value={junkFlatRate}
                        onChange={(e) => setJunkFlatRate(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                        placeholder="Optional"
                      />
                      <div style={{ fontSize: 11.5, color: colors.muted, marginTop: 6 }}>
                        Replaces the truck-load prices above
                      </div>
                    </div>
                    <div>
                      <div style={labelStyle}>Retrieval Fee ($)</div>
                      <input
                        style={inputStyle}
                        value={junkRetrievalFee}
                        onChange={(e) => setJunkRetrievalFee(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <div style={labelStyle}>Hourly Retrieval Fee ($/hr)</div>
                      <input
                        style={inputStyle}
                        value={junkHourlyRetrievalFee}
                        onChange={(e) => setJunkHourlyRetrievalFee(sanitizeNumber(e.target.value))}
                        inputMode="numeric"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div style={labelStyle}>Arrival Window</div>
                    <div style={{ position: 'relative' }}>
                      <select
                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', paddingRight: 40 }}
                        value={junkArrival}
                        onChange={(e) => setJunkArrival(e.target.value)}
                      >
                        {ARRIVAL_WINDOWS.junk.map((windowText) => (
                          <option key={windowText} value={windowText}>
                            {windowText}
                          </option>
                        ))}
                      </select>
                      <span
                        style={{
                          position: 'absolute',
                          right: 14,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          pointerEvents: 'none',
                          color: colors.muted,
                        }}
                      >
                        <IconChevronDown size={16} />
                      </span>
                    </div>
                  </div>
                </>
              )}

              {errorMessage && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 14,
                    borderRadius: 12,
                    background: theme === 'dark' ? 'rgba(248,113,113,0.12)' : '#FEF2F2',
                    color: theme === 'dark' ? '#FCA5A5' : '#B91C1C',
                    fontWeight: 600,
                    fontSize: 13.5,
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div style={{ marginTop: 18 }}>
                <button
                  onClick={generateLink}
                  disabled={!canGenerate || isGenerating}
                  style={{
                    ...buttonBase,
                    width: isMobile ? '100%' : 'auto',
                    background: accent,
                    color: '#ffffff',
                    opacity: !canGenerate || isGenerating ? 0.55 : 1,
                    cursor: !canGenerate || isGenerating ? 'not-allowed' : 'pointer',
                    padding: '14px 24px',
                    fontSize: 15,
                  }}
                >
                  {isGenerating ? 'Generating…' : 'Generate Booking Link'}
                  {!isGenerating && <IconArrowRight size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Right column — preview + console */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ ...cardStyle, borderLeft: `4px solid ${accent}` }}>
              <div style={{ ...eyebrowStyle, marginBottom: 10 }}>Live Preview</div>
              <div
                style={{
                  background: colors.surfaceAlt,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 16,
                  whiteSpace: 'pre-wrap',
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: colors.ink,
                }}
              >
                {bookingSummary}
              </div>
            </div>

            <div
              style={{
                background: theme === 'dark' ? '#000000' : '#12141C',
                borderRadius: 18,
                padding: isMobile ? 18 : 22,
                color: '#F1F2F6',
                boxShadow: colors.shadow,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(241,242,246,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: generatedLink ? '#34D399' : '#4B5262' }} />
                Output
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.65, marginBottom: 6 }}>Shortened Link</div>
                <div
                  style={{
                    padding: 13,
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.06)',
                    fontFamily: FONT_MONO,
                    fontSize: 13.5,
                    wordBreak: 'break-all',
                    minHeight: 22,
                  }}
                >
                  {generatedLink || 'Not generated yet'}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.65, marginBottom: 6 }}>Long Link</div>
                <div
                  style={{
                    padding: 13,
                    borderRadius: 11,
                    background: 'rgba(255,255,255,0.06)',
                    fontFamily: FONT_MONO,
                    fontSize: 13.5,
                    wordBreak: 'break-all',
                    minHeight: 22,
                  }}
                >
                  {rawLink || 'Not generated yet'}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.65, marginBottom: 6 }}>Message</div>
                {isEditingMessage ? (
                  <textarea
                    value={messageDraft}
                    onChange={(e) => setMessageDraft(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: 120,
                      padding: 13,
                      borderRadius: 11,
                      background: 'rgba(255,255,255,0.06)',
                      border: `1.5px solid ${accent}`,
                      color: '#F1F2F6',
                      fontSize: 13.5,
                      fontFamily: FONT_BODY,
                      lineHeight: 1.5,
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      padding: 13,
                      borderRadius: 11,
                      background: 'rgba(255,255,255,0.06)',
                      fontSize: 13.5,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      minHeight: 22,
                      lineHeight: 1.5,
                    }}
                  >
                    {messageDraft || 'Not generated yet'}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                {copyButton('Copy Message', messageDraft, 'message', { primary: true })}
                {copyButton('Copy Short', generatedLink, 'short')}
                {copyButton('Copy Long', rawLink, 'long')}
                <button
                  onClick={() => setIsEditingMessage((prev) => !prev)}
                  disabled={!generatedLink}
                  style={{
                    ...buttonBase,
                    background: isEditingMessage ? accent : 'rgba(255,255,255,0.08)',
                    color: '#F1F2F6',
                    opacity: generatedLink ? 1 : 0.45,
                    cursor: generatedLink ? 'pointer' : 'not-allowed',
                    flex: isMobile ? '1 1 45%' : '1 1 0',
                  }}
                >
                  <IconPencil size={16} />
                  {isEditingMessage ? 'Done' : 'Edit Text'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
