const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/api', (req, res) => res.send('Currently in development'));

// Send all other requests to the frontend
app.use(express.static('dist'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));