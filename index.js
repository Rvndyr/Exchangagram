const express = require('express');
const app = express();
const port = 9999;
const parser = require('body-parser');
app.use(parser.json())

const db = require('sqlite');
const DB_NAME = './database.sqlite';


app.use('/', express.static('public', {
    'index': ['index.html']
}));

app.get('/users', (req, res, next) => {
    db.all('SELECT * FROM users')
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

app.use((req, res, next) => {
    let args = {};
    for (const prop in req.body) {
        console.log(prop, req.body[prop]);
        args['$' + prop] = req.body[prop];
    }
    req.body = args;
    next();
})

app.post('/user', (req, res, next) => {
    db.all('SELECT * FROM user')
        .then(() => {
            return db.run("INSERT INTO user (name) values ($name)", req.body)
        })
        .then((user) => {

            return db.get('SELECT * FROM user WHERE user.id = ?', [user.lastID])
        })
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ user: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

Promise.resolve()
    .then(() => db.open(DB_NAME, { Promise }))
    .then(() => db.migrate({ force: 'last' }))
    .then(() => app.listen(port))
    .then(() => {
        console.log(`Server started on http://localhost:${port}`)
     })
    .catch(err => console.error(err.stack))
