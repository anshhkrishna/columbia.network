const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).setHeader('Allow', 'GET, OPTIONS').end();
  }

  try {
    const scriptPath = path.join(process.cwd(), 'webring.js');
    const script = fs.readFileSync(scriptPath, 'utf8');
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(script);
  } catch (err) {
    console.error('Embed script error:', err);
    res.status(500).end();
  }
};
