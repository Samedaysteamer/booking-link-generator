export default async function handler(req, res) {
  try {
    const url = (req.query.url || '').toString();
    if (!url) return res.status(400).json({ error: 'Missing url' });

    // Helper: call a shortener endpoint that returns plain text
    const callPlain = async (endpoint) => {
      const r = await fetch(endpoint, {
        // Some services are picky; set a UA + no-cache
        headers: { 'User-Agent': 'curl/8', 'Cache-Control': 'no-store' },
      });
      const text = (await r.text()).trim();
      return /^https?:\/\/\S+$/i.test(text) ? text : null;
    };

    // 1) Try is.gd (simple + reliable)
    // Docs: https://is.gd/apishorteningreference.php
    const isgd = await callPlain(
      `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`
    );
    if (isgd) {
      return res.status(200).json({ shortUrl: isgd });
    }

    // 2) Fallback: TinyURL
    const tiny = await callPlain(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );
    if (tiny) {
      return res.status(200).json({ shortUrl: tiny });
    }

    // 3) Last resort: return the original URL so UI still works
    return res.status(200).json({ shortUrl: url });
  } catch (e) {
    // Never 500 the UI—just return the original link
    return res.status(200).json({ shortUrl: req.query.url || '' });
  }
}
