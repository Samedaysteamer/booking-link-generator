// Branded short-link domain for each generator mode.
// Duct is Same Day Steamerz, so it shares the carpet domain.
const BRANDED_DOMAINS = {
  carpet: 'go.samedaysteamerz.com',
  duct: 'go.samedaysteamerz.com',
  moving: 'go.moversmovingatl.com',
  junk: 'go.samedayatljunk.com',
};

async function tryTinyUrl(url, domain, apiToken) {
  const tinyResponse = await fetch('https://api.tinyurl.com/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({ url, domain }),
  });
  const payload = await tinyResponse.json().catch(() => ({}));
  const shortUrl = payload?.data?.tiny_url;
  if (tinyResponse.ok && shortUrl) return { shortUrl };
  return { error: payload?.errors?.[0] || tinyResponse.status };
}

export default async function handler(req, res) {
  const { url, mode } = req.query;

  if (!url) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }

  const errors = [];
  const apiToken = process.env.TINYURL_API_TOKEN;
  const brandedDomain = BRANDED_DOMAINS[mode];

  if (apiToken) {
    // 1) TinyURL on the branded domain (go.samedaysteamerz.com, etc.)
    if (brandedDomain) {
      try {
        const result = await tryTinyUrl(url, brandedDomain, apiToken);
        if (result.shortUrl) {
          res.status(200).json({ shortUrl: result.shortUrl, provider: `tinyurl:${brandedDomain}` });
          return;
        }
        errors.push(`TinyURL (${brandedDomain}): ${result.error}`);
      } catch (error) {
        errors.push(`TinyURL (${brandedDomain}): ${error.message}`);
      }
    }

    // 2) TinyURL on plain tinyurl.com (if the branded domain ever has a problem)
    try {
      const result = await tryTinyUrl(url, 'tinyurl.com', apiToken);
      if (result.shortUrl) {
        res.status(200).json({ shortUrl: result.shortUrl, provider: 'tinyurl' });
        return;
      }
      errors.push(`TinyURL: ${result.error}`);
    } catch (error) {
      errors.push(`TinyURL: ${error.message}`);
    }
  } else {
    errors.push('TinyURL: TINYURL_API_TOKEN not set');
  }

  // 3) is.gd / v.gd (last-resort backups, no key needed)
  for (const host of ['is.gd', 'v.gd']) {
    try {
      const r = await fetch(
        `https://${host}/create.php?format=simple&url=${encodeURIComponent(url)}`
      );
      const text = (await r.text()).trim();
      if (r.ok && text.startsWith('https://')) {
        res.status(200).json({ shortUrl: text, provider: host });
        return;
      }
      errors.push(`${host}: ${text.slice(0, 120)}`);
    } catch (error) {
      errors.push(`${host}: ${error.message}`);
    }
  }

  // Everything failed
  console.error('Shorten failed:', errors);
  res.status(502).json({ error: 'All shorteners failed', details: errors });
}
