const express = require('express');
const router = express();
const parser = require('body-parser');
const exchanger = require('./exchanger');
const db = require('sqlite');
const DB_NAME = './database.sqlite';

// router.use(parser.json());

// GET ROUTES

router.use((request, response, next) => {
    console.log('in apiRoutes');
    console.log(request.session, request.user);

    next();
})

router.get('/posts/:id', (request, response, next) => {


    exchanger.getActivity(request.params.id).then((data) => {
        response.header('Content-Type', 'application/json');
        response.send({ activity: data });
    }).catch((e) => {
        response.status(401);
    });


});

// added this example for you to work off of rich
router.get('/users', (request, response, next) => {

  //  uncomment to get users feed
//     exchanger.getUsersActivity(request, response).then((data) => {
//     response.header('Content-Type', 'application/json');
//     response.send({ users: data });


    exchanger.getUsers(request, response).then((data) => {
        response.header('Content-Type', 'application/json');
        response.send({ users: data });

    }).catch((e) => {
        response.status(401);
    });


    // next(); had to comment out rich to get /users to work

});

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

// had to comment this out rich or public would not serve
/* router.use((request, response) => {
    response.header('Content-Type', 'application/json');
    response.send(data)
}); */



module.exports = router; // had to change this from apiRouter to router or code wouldnt work i think it has to do with line 3

