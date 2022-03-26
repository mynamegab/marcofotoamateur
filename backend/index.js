const express = require('express');
var cors = require('cors');

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Currently in development'));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));