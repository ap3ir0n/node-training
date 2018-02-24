const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mlab.uri);

const app = express();

app.use(
    cookieSession({
        keys: [keys.cookieSession],
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(process.env.PORT || 80);