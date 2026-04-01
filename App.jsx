import React, { useMemo, useState } from 'react';
import { Copy, ExternalLink, Link2, Bug, CheckCircle2, ChevronRight, Sparkles, User2, Clock3, DollarSign, ShieldCheck } from 'lucide-react';

const carpetPresets = [
  { id: 'cc100', label: 'Carpet Cleaning', price: 100, note: 'Fast close special' },
  { id: 'cc130', label: 'Carpet Cleaning', price: 130, note: 'Mid-ticket close' },
  { id: 'cc150', label: 'Carpet Cleaning', price: 150, note: 'Standard premium' },
  { id: 'up200', label: 'Upholstery Cleaning', price: 200, note: 'Sofa / loveseat entry' },
];

const ductPresets = [
  { id: 'deep500', label: 'Deep Duct Cleaning (No Furnace)', price: 500, note: 'Single-system close' },
  { id: 'deep600', label: 'Deep Duct Cleaning with Furnace', price: 600, note: 'Best-value upsell' },
  { id: 'deep1200', label: 'Two Units with Furnace', price: 1200, note: 'Multi-system close' },
];

const movingPresets = [
  { id: 'm300', label: '$300 first 2 hours', price: 300, meta: '$150 each additional hour' },
  { id: 'm260', label: '$260 first 2 hours', price: 260, meta: '$130 each additional hour' },
  { id: 'm600', label: '$600 first 2 hours', price: 600, meta: '$300 each additional hour / 4 men' },
  { id: 'm200', label: '$200 first hour', price: 200, meta: '$150 each additional hour / delivery' },
];

const carpetWindows = [
  'Arrival between 8 and 12',
  'Arrival between 10 and 2',
  'Arrival between 12 and 4',
  'Arrival between 1 and 5',
  'Arrival between 3 and 7',
];

const ductWindows = ['Arrival between 8 and 12', 'Arrival between 1 and 5'];
const movingWindows = [
  'Arrival between 7 and 9',
  'Arrival between 9 to 11',
  'Arrival between 11 and 1',
  'Arrival between 1 and 3',
  'Arrival between 3 to 5',
  'Arrival between 6 and 8 pm',
];

const repOptions = ['*01*', '*02*', '*03*', '*04*', '*05*'];

function PresetCard({ active, title, price, note, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-3xl border p-4 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
        active
          ? 'border-black bg-black text-white'
          : 'border-zinc-200 bg-white text-zinc-900'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold tracking-tight">{title}</div>
          <div className={`mt-1 text-xs ${active ? 'text-zinc-300' : 'text-zinc-500'}`}>{note}</div>
        </div>
        <div className={`rounded-2xl px-3 py-1 text-sm font-bold ${active ? 'bg-white/10' : 'bg-zinc-100'}`}>
          ${price}
        </div>
      </div>
    </button>
  );
}

function SmallStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2 text-zinc-500">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-[0.16em]">{label}</span>
      </div>
      <div className="mt-2 text-sm font-semibold text-zinc-900">{value}</div>
    </div>
  );
}

export default function BookingLinkGeneratorOperatorConsolePrototype() {
  const [mode, setMode] = useState('carpet');
  const [salesRep, setSalesRep] = useState('*04*');
  const [arrivalWindow, setArrivalWindow] = useState('Arrival between 8 and 12');
  const [serviceType, setServiceType] = useState('Carpet Cleaning');
  const [quotedPrice, setQuotedPrice] = useState('100');
  const [movingHours, setMovingHours] = useState('2');
  const [additionalRate, setAdditionalRate] = useState('150');
  const [numMovers, setNumMovers] = useState('2');
  const [truckSize, setTruckSize] = useState('17');
  const [showDebug, setShowDebug] = useState(false);
  const [generated, setGenerated] = useState(false);

  const presets = mode === 'carpet' ? carpetPresets : mode === 'duct' ? ductPresets : movingPresets;
  const arrivalOptions = mode === 'carpet' ? carpetWindows : mode === 'duct' ? ductWindows : movingWindows;

  const bookingSummary = useMemo(() => {
    if (mode === 'moving') {
      return `${salesRep}\n$${quotedPrice} First ${movingHours} Hours Then $${additionalRate} per hour for each additional hour after that.\n${arrivalWindow}\n${numMovers} Men ${truckSize} Ft Truck\nPayment methods: Cash, CashApp, Zelle\nCashApp payment $5 fee\n***First ${movingHours}hrs due at arrival***`;
    }

    return `${salesRep}\n${serviceType}\n$${quotedPrice} Special\n${arrivalWindow}\nPayment method: Cash Cashapp Zelle\nCard payment: 7% processing fee`;
  }, [mode, salesRep, quotedPrice, movingHours, additionalRate, arrivalWindow, numMovers, truckSize, serviceType]);

  const linkBase = mode === 'carpet'
    ? 'https://form.jotform.com/251536451249054'
    : mode === 'duct'
    ? 'https://form.jotform.com/251573697976175'
    : 'https://form.jotform.com/251537865180159';

  const mockLink = `${linkBase}?service=${encodeURIComponent(mode === 'moving' ? 'Moving' : serviceType)}&price=${encodeURIComponent(quotedPrice)}&salesRep=${encodeURIComponent(salesRep)}`;
  const shortLink = 'https://sds.ai/book/7K4Q2M';

  const applyPreset = (preset) => {
    if (mode === 'moving') {
      setQuotedPrice(String(preset.price));
      if (preset.id === 'm600') {
        setMovingHours('2');
        setAdditionalRate('300');
        setNumMovers('4');
        setTruckSize('17');
      } else if (preset.id === 'm260') {
        setMovingHours('2');
        setAdditionalRate('130');
        setNumMovers('2');
        setTruckSize('17');
      } else if (preset.id === 'm200') {
        setMovingHours('1');
        setAdditionalRate('150');
        setNumMovers('2');
        setTruckSize('17');
      } else {
        setMovingHours('2');
        setAdditionalRate('150');
        setNumMovers('2');
        setTruckSize('17');
      }
      return;
    }

    setServiceType(preset.label);
    setQuotedPrice(String(preset.price));
  };

  const isValid = Boolean(salesRep && quotedPrice && arrivalWindow && (mode === 'moving' || serviceType));

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-sky-50 p-4 md:p-8 text-zinc-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-[28px] border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
                <Sparkles className="h-3.5 w-3.5" />
                Booking Link Generator — Operator Console
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Faster quoting. Cleaner links. Fewer operator mistakes.
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-zinc-600 md:text-base">
                Redesigned as a dispatcher-grade workstation with mode switching, preset cards, live booking preview, inline validation, and an advanced debug drawer.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <SmallStat icon={ShieldCheck} label="Validation" value="Required before generate" />
              <SmallStat icon={Clock3} label="Speed" value="Preset-first workflow" />
              <SmallStat icon={User2} label="Rep" value={salesRep} />
              <SmallStat icon={Link2} label="Output" value="Short link + preview" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex flex-col gap-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step 1</div>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">Choose mode and sales rep</h2>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Service mode</label>
                    <div className="inline-flex w-full flex-wrap gap-2 rounded-3xl border border-zinc-200 bg-zinc-50 p-2">
                      {['carpet', 'moving', 'duct'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setMode(item);
                            setGenerated(false);
                            if (item === 'duct') {
                              setArrivalWindow('Arrival between 8 and 12');
                              setServiceType('Deep Duct Cleaning with Furnace');
                              setQuotedPrice('600');
                            }
                            if (item === 'carpet') {
                              setArrivalWindow('Arrival between 8 and 12');
                              setServiceType('Carpet Cleaning');
                              setQuotedPrice('100');
                            }
                            if (item === 'moving') {
                              setArrivalWindow('Arrival between 7 and 9');
                              setQuotedPrice('300');
                            }
                          }}
                          className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold capitalize transition ${
                            mode === item ? 'bg-black text-white shadow-sm' : 'bg-white text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Sales rep</label>
                    <div className="flex flex-wrap gap-2">
                      {repOptions.map((rep) => (
                        <button
                          key={rep}
                          onClick={() => setSalesRep(rep)}
                          className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                            salesRep === rep
                              ? 'bg-sky-500 text-white shadow-sm'
                              : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                          }`}
                        >
                          {rep}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step 2</div>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">Pick a preset or customize the quote</h2>
                </div>
                <div className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {mode === 'moving' ? 'Moving presets' : mode === 'duct' ? 'Duct presets' : 'Carpet presets'}
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {presets.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    title={preset.label}
                    price={preset.price}
                    note={preset.note || preset.meta}
                    active={
                      mode === 'moving'
                        ? String(preset.price) === quotedPrice
                        : preset.label === serviceType && String(preset.price) === quotedPrice
                    }
                    onClick={() => applyPreset(preset)}
                  />
                ))}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {mode !== 'moving' && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Service type</label>
                    <input
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-sky-400 focus:bg-white"
                    />
                    <p className="mt-2 text-xs text-zinc-500">Live editable. This updates the preview instantly.</p>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    {mode === 'moving' ? 'First block price ($)' : 'Quoted price ($)'}
                  </label>
                  <input
                    value={quotedPrice}
                    onChange={(e) => setQuotedPrice(e.target.value.replace(/[^0-9]/g, ''))}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ring-0 transition ${
                      quotedPrice
                        ? 'border-zinc-200 bg-zinc-50 focus:border-sky-400 focus:bg-white'
                        : 'border-red-300 bg-red-50 focus:border-red-400'
                    }`}
                    placeholder="Enter price"
                  />
                  <p className={`mt-2 text-xs ${quotedPrice ? 'text-zinc-500' : 'text-red-600'}`}>
                    {quotedPrice ? 'Required field passed.' : 'Price is required before generating a link.'}
                  </p>
                </div>
              </div>

              {mode === 'moving' && (
                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">First block hours</label>
                    <select value={movingHours} onChange={(e) => setMovingHours(e.target.value)} className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Additional hour rate</label>
                    <input value={additionalRate} onChange={(e) => setAdditionalRate(e.target.value.replace(/[^0-9]/g, ''))} className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Movers</label>
                    <select value={numMovers} onChange={(e) => setNumMovers(e.target.value)} className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm">
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">Truck size</label>
                    <select value={truckSize} onChange={(e) => setTruckSize(e.target.value)} className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm">
                      <option value="17">17</option>
                      <option value="20">20</option>
                      <option value="26">26</option>
                    </select>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Step 3</div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">Schedule and review before generate</h2>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Arrival window</label>
                  <div className="grid gap-2">
                    {arrivalOptions.map((window) => (
                      <button
                        key={window}
                        onClick={() => setArrivalWindow(window)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          arrivalWindow === window
                            ? 'border-sky-500 bg-sky-50 text-sky-900'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        {window}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-dashed border-zinc-300 bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Pre-flight validation
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-zinc-700">
                    <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2">
                      <span>Sales rep selected</span>
                      <span className="font-semibold">{salesRep ? 'Ready' : 'Missing'}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2">
                      <span>Price populated</span>
                      <span className={`font-semibold ${quotedPrice ? 'text-emerald-600' : 'text-red-600'}`}>{quotedPrice ? `$${quotedPrice}` : 'Missing'}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2">
                      <span>Arrival window chosen</span>
                      <span className="font-semibold">Ready</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2">
                      <span>Output state</span>
                      <span className={`font-semibold ${isValid ? 'text-emerald-600' : 'text-red-600'}`}>{isValid ? 'Can generate' : 'Blocked'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm md:p-6 xl:sticky xl:top-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Live Preview</div>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight">Customer-facing booking summary</h2>
                </div>
                <button
                  onClick={() => setShowDebug((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  <Bug className="h-4 w-4" />
                  {showDebug ? 'Hide debug' : 'Open debug'}
                </button>
              </div>

              <div className="mt-5 rounded-[24px] bg-zinc-950 p-5 text-zinc-50 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">Preview card</div>
                  <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    {isValid ? 'Valid' : 'Needs input'}
                  </div>
                </div>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-6 text-zinc-100">{bookingSummary}</pre>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                    <DollarSign className="h-4 w-4 text-zinc-500" />
                    Pricing
                  </div>
                  <div className="mt-2 text-2xl font-bold tracking-tight">${quotedPrice || '—'}</div>
                  <div className="mt-1 text-xs text-zinc-500">{mode === 'moving' ? `+$${additionalRate || '0'} / extra hour` : serviceType}</div>
                </div>
                <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                    <Clock3 className="h-4 w-4 text-zinc-500" />
                    Arrival window
                  </div>
                  <div className="mt-2 text-sm font-semibold text-zinc-900">{arrivalWindow}</div>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-zinc-200 bg-white p-4">
                <div className="text-sm font-semibold text-zinc-800">Text message preview</div>
                <div className="mt-3 rounded-2xl bg-sky-50 p-4 text-sm text-zinc-800">
                  Click on the link below so we can get your work order created:\n
                  <span className="mt-2 block font-semibold text-sky-700">{generated ? shortLink : '[short link will appear here]'}</span>
                </div>
              </div>

              {showDebug && (
                <div className="mt-5 rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                    <Bug className="h-4 w-4" />
                    Advanced debug drawer
                  </div>
                  <div className="mt-3 space-y-3 text-xs text-zinc-700">
                    <div className="rounded-2xl bg-white p-3">
                      <div className="font-semibold text-zinc-800">Target form</div>
                      <div className="mt-1 break-all">{linkBase}</div>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <div className="font-semibold text-zinc-800">Raw URL preview</div>
                      <div className="mt-1 break-all">{mockLink}</div>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <div className="font-semibold text-zinc-800">Parser expectation</div>
                      <div className="mt-1">salesRep = {salesRep} · service = {mode === 'moving' ? 'Moving' : serviceType} · price = ${quotedPrice || 'missing'}</div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

        <div className="sticky bottom-4 mt-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-[28px] border border-zinc-200 bg-white/90 p-4 shadow-xl backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-900">Operator action bar</div>
              <div className="text-xs text-zinc-500">Primary actions stay visible while the operator reviews the preview.</div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => isValid && setGenerated(true)}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm transition ${
                  isValid ? 'bg-black text-white hover:opacity-90' : 'cursor-not-allowed bg-zinc-200 text-zinc-500'
                }`}
              >
                Generate Link
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
                <Copy className="h-4 w-4" />
                Copy Message
              </button>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
                <Link2 className="h-4 w-4" />
                Copy Link
              </button>
              <button
                onClick={() => setShowDebug((v) => !v)}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                <ExternalLink className="h-4 w-4" />
                {showDebug ? 'Close Debug' : 'Open Debug'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
