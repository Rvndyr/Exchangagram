const express = require('express');
const router = express();
const parser = require('body-parser');
const exchanger = require('./exchanger');
const db = require('sqlite');
const DB_NAME = './database.sqlite';

// router.use(parser.json());

// ------------------------------------------------------
// POST ROUTES
// ------------------------------------------------------

// Follow a user ##url feeds the user_id + followed_id.
router.post('/:user_id/follow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.followed_id, 10);
    exchanger.followUser(user_id, followed_id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                followed_users: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// create a post. ##url feeds the user_id + followed_id. req targets activity table columns
router.post('/:user_id/post', (req, res, next) => {
    let args = {};
    for (const prop in req.body) {
        args['$' + prop] = req.body[prop];
    }
    req.body = args;
    const user_id = parseInt(req.params.user_id, 10);
    exchanger.createActivity(user_id, req.body)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                post: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// ------------------------------------------------------
// GET ROUTES
// ------------------------------------------------------

router.get('/feed/:user_id', (request, response) => {
    exchanger.getActivity(request.params.user_id).then((data) => {
        response.header('Content-Type', 'application/json');
        response.send({ activity: data });
    }).catch((e) => {
        response.status(401);
    });
});

// get all users
router.get('/users', (request, response) => {
    exchanger.getUsers(request, response).then((data) => {
        response.header('Content-Type', 'application/json');
        response.send({ users: data });
    }).catch((e) => {
        response.status(401);
    });
});


// Get a specified user and activties of user_id
router.get('/user/:user_id', (req, res, next) => {
    const id = parseInt(req.params.user_id, 10);
    exchanger.getUser(id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                user: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// get users that $user_id follows
router.get('/:user_id/followedusers', (req, res) => {
    const id = parseInt(req.params.user_id, 10);
    exchanger.getFollowed(id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                followed_users: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// Get a specified post ## url feeds post_id
router.get('/post/:post_id', (req, res, next) => {
    const id = parseInt(req.params.post_id, 10);
    exchanger.getPost(id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                user: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// ------------------------------------------------------
// PUT ROUTES
// ------------------------------------------------------

// Edit a post ##url feeds the user_id + post_id. req  posts table column 'descr'
router.put('/:user_id/update_post/:post_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const post_id = parseInt(req.params.post_id, 10);
    const updatedText = req.body.activity_payload

    exchanger.updatePost(user_id, post_id, updatedText)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                update: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// ------------------------------------------------------
// DELETE ROUTES
// ------------------------------------------------------

// Unfollow a user ## feeds the user_id + followed_id.
router.delete('/:user_id/unfollow/:followed_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const followed_id = parseInt(req.params.followed_id, 10);
    exchanger.unfollow(user_id, followed_id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                followed_users: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// Delete a post ##url feeds the user_id + post_id.
router.delete('/:user_id/delete_post/:post_id', (req, res, next) => {
    const user_id = parseInt(req.params.user_id, 10);
    const post_id = parseInt(req.params.post_id, 10);
    exchanger.deletePost(user_id, post_id)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({
                followed_users: data
            });
        })
        .catch((e) => {
            console.log(e)
            res.status(401);
        });
});

// // middle ware

// // had to comment this out rich or public would not serve
router.use((request, response) => {
    response.header('Content-Type', 'application/json')
    response.send(data);
});



module.exports = router; // had to change this from apiRouter to router or code wouldnt work i think it has to do with line 3
