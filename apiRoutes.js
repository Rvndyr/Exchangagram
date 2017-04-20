const express = require('express');
const router = express.router();
const parser = require('body-parser');

router.use(parser.json());

app.use('/', express.static('/public'));


// GET ROUTES

router.get('/posts', (request, response, next) => {


    next();
});

router.get('/users', (request, response, next) => {

    next();
})

router.get('/users/:id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);


    next()
});

router.get('/followers/:user_id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
})

router.get('/followers/:follower_id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
})

router.get('/activities', (request, response, next) => {

    next();
})

router.get('/activities/:user_id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
})

// POST ROUTES

router.post('/posts', (request, response, next) => {


    next();
});

router.post('/activities', (request, response, next) => {


    next();
});

router.post('/followers', (request, response, next) => {


    next();
});

router.post('/users', (request, response, next) => {


    next();
});


// PUT ROUTES



router.put('/post/:id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
});

router.put('/users/:id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
});


// DELETE ROUTES



router.delete('/post/:id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
});

router.delete('/users/:id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
});

router.delete('/followers/:followers_id', (request, response, next) => {
    const id = parseInt(request.params.id, 10);

    next();
});




// middle ware

router.use((request, response) => {
    response.header('Content-Type', 'application/json');
    response.send(data)
});


module.exports = apiRouter