const express = require('express');
const path = require("path");

const PORT = 4000;

const app = express();

const staticPath = path.join(__dirname, '..', 'static');
const staticPath2 = path.join(__dirname, '..', 'static', 'index.html');

app.use(express.static(staticPath));

app.use(function(req, res) {
    res.sendFile(staticPath2);
});


app.listen(PORT, 'localhost', () => {
    console.log('Hello, World!')
})
