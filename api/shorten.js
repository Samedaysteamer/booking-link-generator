export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }

  const apiToken = process.env.TINYURL_API_TOKEN;

  if (!apiToken) {
    res.status(500).json({ error: 'TINYURL_API_TOKEN is not set in your Vercel project env vars' });
    return;
  }

  try {
    const tinyResponse = await fetch('https://api.tinyurl.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ url, domain: 'tinyurl.com' }),
    });

    const payload = await tinyResponse.json();

    if (!tinyResponse.ok) {
      const message = payload?.errors?.[0] || payload?.error || 'TinyURL request failed';
      res.status(tinyResponse.status).json({ error: message });
      return;
    }

    const shortUrl = payload?.data?.tiny_url;

    if (!shortUrl) {
      res.status(500).json({ error: 'TinyURL did not return a short link' });
      return;
    }

    res.status(200).json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to reach TinyURL' });
  }
}
