const generateLink = () => {
  const summary = `${serviceType}
$${quotedPrice} Special
Arrival between ${arrivalWindow}
Payment method: Cash Cashapp Zelle
Card payment: 7% processing fee

Please fill out all information so we can create your work order and secure your time frame.`;

  const baseUrl = 'https://form.jotform.com/251536451249054';

  const params = new URLSearchParams();
  params.append('serviceType', serviceType);
  params.append('quotedPrice', quotedPrice);
  params.append('arrivalWindow', arrivalWindow);
  params.append('bookingSummary', encodeURIComponent(summary)); // for line breaks

  const fullLink = `${baseUrl}?${params.toString()}`;
  setGeneratedLink(fullLink);
};
