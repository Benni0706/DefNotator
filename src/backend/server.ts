import { Application } from "express";

const express = require('express');
const app: Application = express();

const port = 3000;
const hostname = 'localhost';

const user = require('./routes/user');

app.use('/users', user);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});