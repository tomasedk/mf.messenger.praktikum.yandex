const express = require('express');
const path = require("path");

const PORT = 4000;

const app = express();

// const staticPath = path.join(__dirname, '..', 'src', 'assets', 'html');
// const staticPathIndex = path.join(__dirname, '..', 'src', 'assets', 'html', 'index.html');
const staticPath = path.join(__dirname, '..', 'dist');
const staticPathIndex = path.join(__dirname, '..', 'dist', 'index.html');

app.use(express.static(staticPath));

app.use(function (req, res) {
    res.sendFile(staticPathIndex);
});

app.listen(PORT, 'localhost', () => {
    console.log(`Server is listening on ${PORT} port...`);
})
