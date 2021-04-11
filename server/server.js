const express = require('express');
const path = require('path');

const PORT = 3000;

const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах

const app = express();

// const staticPath = path.join(__dirname, '..', 'src', 'assets', 'html');
// const staticPathIndex = path.join(__dirname, '..', 'src', 'assets', 'html', 'index.html');
const staticPath = path.join(__dirname, '..', 'dist');
const staticPathIndex = path.join(__dirname, '..', 'dist', 'index.html');

app.use(express.static(staticPath));

app.use(function (req, res) {
    res.sendFile(staticPathIndex);
});

app.listen(PORT, hostname, () => {
    console.log(`Server is listening on ${PORT} port...`);
});
