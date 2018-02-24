const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((err, user) => {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
        clientID: keys.facebook.appId,
        clientSecret: keys.facebook.appSecret,
        callbackURL: '/auth/facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({facebookId: profile.id}).then((user) => {
            if (user) {
                done(null, user);
            } else {
                new User({
                    facebookId: profile.id
                })
                    .save()
                    .then(user => done(null, user));
            }
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((user) => {
            if (user) {
                done(null, user);
            } else {
                new User({
                    googleId: profile.id
                })
                    .save()
                    .then(user => done(null, user));
            }
        });
    }
));