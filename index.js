const express = require('express');
const db = require('sqlite');
const api = require('./apiRoutes');
let app = express();
const port = 9999;

const DB_NAME = './database.sqlite';

app.use(require('./apiRoutes', api));

app.use('/', express.static('./public', {
    'index': ['index.html']
}));

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {
        console.log(`http://localhost:${port}`)
     })
    .catch(err => console.error(err.stack))
