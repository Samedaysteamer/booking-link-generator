export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }

  const errors = [];

  // 1) TinyURL (primary)
  const apiToken = process.env.TINYURL_API_TOKEN;
  if (apiToken) {
    try {
      const tinyResponse = await fetch('https://api.tinyurl.com/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ url, domain: 'tinyurl.com' }),
      });
      const payload = await tinyResponse.json().catch(() => ({}));
      const shortUrl = payload?.data?.tiny_url;
      if (tinyResponse.ok && shortUrl) {
        res.status(200).json({ shortUrl, provider: 'tinyurl' });
        return;
      }
      errors.push(`TinyURL: ${payload?.errors?.[0] || tinyResponse.status}`);
    } catch (error) {
      errors.push(`TinyURL: ${error.message}`);
    }
  } else {
    errors.push('TinyURL: TINYURL_API_TOKEN not set');
  }

  // 2) is.gd / v.gd (backups, no key needed)
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
