const express = require('express');
let app = express();
const router = express.Router();
const handler = require('./dbFunctions/handler')
const parser = require('body-parser');
router.use(parser.json())

// get all users + their activity
router.get('/users', (req, res, next) => {
	handler.getUsers(req, res)
        .then((data) => {
            res.header('Content-Type', 'application/json');
            res.send({ users: data });
        })
        .catch((e) => {
            res.status(401);
        });
});

// get a specified user via user.id + their activity
router.get('/user/:user_id', (req, res, next) => {
	const id = parseInt(req.params.user_id, 10);
	console.log(id)
	handler.getUser(id)
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
router.get('/:follower_id/followedusers', (req, res) => {
	console.log("0")
	const id = parseInt(req.params.follower_id, 10);
	handler.getFollowed(id)
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

module.exports = router;
