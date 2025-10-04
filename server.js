const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (index.html, js/, css/, etc.)
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for comet API
app.get('/api/comets', async (req, res) => {
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const apiUrl = `https://cobs.si/api/planner.api?date=${formattedDate}`;

  try {
    const response = await fetch(apiUrl);
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', data);
    res.json(data);
  } catch (error) {
    console.error('API fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch comet data' });
  }
});

// Proxy endpoint for ISS API
app.get('/api/iss-now', async (req, res) => {
  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json');

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch ISS data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
