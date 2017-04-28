const express = require('express');

const regApp = express();

const exchanger = require('./exchanger')

const parser = require('body-parser');

const expressSession = require('express-session');

regApp.use(parser.json());

regApp.use(expressSession({
    secret: 'NYCDA',
}));


regApp.post('/signup', (request, response, next) => {
    console.log('sign up')
    const isCreated = exchanger.createUser(request.body)
        .then((data) => {
            response.header('Content-Type', 'application/json');
            response.send({
                success: true
            })
        })
        .catch((e) => {
            console.log(e)
            response.status(401);
        });
});

// GFYS



module.exports = regApp;