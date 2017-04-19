const express = require('express');
const router = express.router();
const parser = require('body-parser');

router.use(parser.json());


// GET ROUTES

router.get('/posts', (request, response, next) => {


    next();
});

router.get('/users', (request, response, next) => {

    next()
}); {

    router.get('/users/followers', (request, response, next) => {

        next();
    })

    // POST ROUTES

    router.post('/posts', (request, response, next) => {


        next();
    });

    router.put('/post/:id', (request, response, next) => {
        const id = parseInt(request.params.id, 10);

        next();
    });

    router.delete('/post/:id', (request, response, next) => {
        const id = parseInt(request.params.id, 10);

        next();
    });



    router.use((request, response) => {
        response.header('Content-Type', 'application/json');
        response.send(data)
    });


    module.exports = apiRouter