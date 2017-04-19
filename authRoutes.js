const express = require('express');
const parser = require('body-parser');
const passport = require('passport');
const LocaleStraegy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;



const app = express();

app.use(parson.json());

app.use('/', express.static('/public'));

app.use(passport.initialize());
app.use(passport.session());


app.get('/api/posts/:id', (request, response) => {
    response.header('content-type', 'application/json');
    response.send({

        "success": false
    });

    response.send({
        "success": True
    });

});


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
                    return done('f-ed up', {}, {});
                }
                return done(null, { success: true });

                app.post('/auth/login', (request, response, next) => {
                    passport.authenticate('local', (err, user, info) => {
                        if (err) console.log(err);
                        if (!user) console.log(user);

                        request.logIn(user, (err) => {
                            if (err) return next(err);
                            // if we are here, user has logged in!
                            response.header('Content-Type', 'application/json');

                            response.send({
                                success: true,
                            });
                        });
                    })(request, response, next);
                });
