import { Application } from "express";

const express = require('express');
const app: Application = express();
const cors = require('cors');

const port = 3000;
const hostname = 'localhost';


/*
CORS (Cross-Origin-Resource-Sharing)
is needed so that our Vue app can access the API even though it has a different source
*/
const corsOptions = {
    origin: ['http://localhost:5173'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    methods: '*',
}
app.use(cors(corsOptions));

//routes are being imported from route files
const user = require('./routes/user');
const dataset = require('./routes/dataset');
const criteria = require('./routes/criteria');

//app "uses" routes with route prefix
app.use('/users', user);
app.use('/datasets', dataset);
app.use('/criteria', criteria);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});