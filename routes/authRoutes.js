const passport = require('passport');

module.exports = (app) => {

    app.get('/api/current-user', (req, res) => {
        res.send(req.user);
    });

    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    //     /auth/facebook/callback

    app.get('/auth/facebook',
        passport.authenticate('facebook', {scope: 'public_profile'})
    );

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    // Use passport.authenticate() as route middleware to authenticate the
    // request.  The first step in Google authentication will involve
    // redirecting the user to google.com.  After authorization, Google
    // will redirect the user back to this application at /auth/google/callback

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
    );

    // Use passport.authenticate() as route middleware to authenticate the
    // request.  If authentication fails, the user will be redirected back to the
    // login page.  Otherwise, the primary route function function will be called,
    // which, in this example, will redirect the user to the home page.

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

};
