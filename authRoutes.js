const express = require('express');
const parser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const exchanger = require('./exchanger');
const expressSession = require('express-session');
// const FacebookStrategy = require('passport-facebook').Strategy;

// const app = express();
const router = express();

router.use(parser.json());
// router.use('/', express.static('./public'));

router.use(expressSession({
    secret: 'FOBAR'
}));

passport.serializeUser((user, done) => {

    done(null, user)
});
passport.deserializeUser((user, done) => {

    done(null, user)
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {

    if (!email || !password) {
        return done('Not Valid', {}, {});
    }
    return done(null, { success: true });
}));



router.use(passport.initialize());
router.use(passport.session());




router.get('/api/posts/:id', (request, response, next) => {
    response.header('Content-Type', 'application/json');
    response.send({
        'success': true
    })
    response.send({
        "success": false
    })
})

// SIGN UP
router.post('/auth/signup', (request, response) => {
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
        });});


// LOG IN
router.post('/auth/login', (request, response, next) => {
    console.log("here")
    passport.authenticate('local', (err, user, info) => {
        if (err) console.log(err);
        if (!user) console.log(user);

        request.logIn(user, (err) => {
            if (err) return next(err);
            // if we are here, user has logged in!
            response.header('Content-Type', 'application/json');
            response.send({
                success: true,
                // userId: user.id
            });
        });
    })(request, response, next);
});

router.use((request, response, next) => {
    console.log('in authRoutes')
    console.log(request.session, request.user)
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(403)
        response.send({ success: false })
    }
})


module.exports = router;
