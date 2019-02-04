const express = require("express");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 5000;
const app = express();

// dit kan later

app.get('/', (req, res) => res.send('Test ga naar /week1'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
