export default async function handler(req, res) {
  try {
    const url = (req.query.url || '').toString();
    if (!url) return res.status(400).json({ error: 'Missing url' });

    // Server-side call to TinyURL (no CORS problems)
    const r = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );
    const text = await r.text(); // e.g. https://tinyurl.com/abcd123

    const ok = /^https?:\/\/\S+$/i.test(text);
    return res.status(200).json({ shortUrl: ok ? text : url });
  } catch (e) {
    // Safe fallback to the original long URL
    return res.status(200).json({ shortUrl: req.query.url || '' });
  }
}
