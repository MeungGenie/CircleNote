require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');

dbConnect();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    const isDirectAcess = req.headers.accept && req.headers.accept.includes('text/html');

    if (isDirectAcess) {
        res.send('<h1>Server is running</h1>');
    } else {
        res.json({ message: "Hello from the server!"});
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});