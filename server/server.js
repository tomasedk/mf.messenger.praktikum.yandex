const express = require('express');
const path = require("path");

const PORT = 4000;

const app = express();

const staticPath = path.join(__dirname, '..', 'static');

app.use(express.static(staticPath));

app.listen(PORT, 'localhost', () => {
    console.log('Hello, World!')
})
