const express = require('express');
const parser = require('body-parser');
const db = require('sqlite');
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
    secret: 'HUSH'
}));

// router.use(expressSession({
//     secret: 'FOBAR'
// }));






passport.serializeUser((user, done) => {

    done(null, user)
});
passport.deserializeUser((user, done) => {

    done(null, user)
});

// passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//     },
//     (email, password, done) => {
//         db.get(`SELECT users.id, users.email FROM users WHERE users.email = '${email}' AND users.password = '${password}'`)
//             .then((valid) => {
//                 console.log("VALID: ", valid);
//                 if (!valid) return done(null, false);
//                 return done(null, valid);
//             })
//             .catch(err => console.error(err.stack))
//     }
// ));

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log('IN AUTH STRATEGY')
        db.get(`SELECT ID, NAME, EMAIL
               FROM users 
               WHERE EMAIL IS '${username}' AND PASSWORD = '${password}'`)
            .then((user) => {
                console.log("USER", user);
                if (!user) return done(null, false);
                console.log('LOGIN SUCCESS!!!');
                return done(null, user);
            })
            .catch(err => console.error(err.stack))
    }));






router.use(passport.initialize());
router.use(passport.session());

// LOG IN
router.post('/auth/login', (request, response, next) => {
    console.log("here")
    console.log(request.body)
    passport.authenticate('local', (err, user, info) => {
        // if (err) console.log(err);
        // if (!user) console.log("USER: ".user);
        console.log(err);
        console.log("USERRRR", user);
        console.log(info);

        request.logIn(user, (err) => {
            if (err) return next(err);
            // if we are here, user has logged in!
            response.header('Content-Type', 'application/json');
            response.send({
                success: true,
                Id: user.ID,
                name: user.NAME
            });
        });
    })(request, response, next);
});


router.use((request, response, next) => {
    console.log('in authRoutes')
        // console.log(request.session, request.user)
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(403)
        response.send({ success: false })
    }
})


module.exports = router;