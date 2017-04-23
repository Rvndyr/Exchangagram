//include express
const express = require('express');

//include sqlite
const db = require('sqlite');

//create an express application
const app = express();
const port = 9999;

// api routes
const exchangagramApi = require('./apiRoutes');
const authApp = require('./authRoutes');


const DB_NAME = './database.sqlite';


app.use('/', express.static('./public', {
    'index': ['index.html'],
}));


//prepend api routes url
app.use('/api', exchangagramApi);

app.use('/auth', authApp);

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => { console.log(`Exchangagram live at http://localhost:${port}`) })
    .catch(err => console.error(err.stack))