import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

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
//app "uses" routes with route prefix
app.use('/access', require('./routes/access').router);
app.use('/users', require('./routes/user').router);
app.use('/datasets', require('./routes/dataset').router);
app.use('/criteria', require('./routes/criteria').router);
app.use('/definitions', require('./routes/definition').router);
app.use('/annotations', require('./routes/annotation').router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ you look good today`);
});
