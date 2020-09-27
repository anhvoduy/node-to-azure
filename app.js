var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Very basic HTML templates
var page = require('./page');
var authHelp = require('./authHelp');

// Configure express
// Set up rendering of static files
app.use(express.static('static'));
// Need JSON body parser for most API responses
app.use(bodyParser.json());
// Set up cookies and sessions to save tokens
app.use(cookieParser());
app.use(session({ 
    secret: '0dc529ba-5051-4cd6-8b67-c9a901bb8bdf',
    resave: false,
    saveUninitialized: false 
}));
  
// Home page
app.get('/', function(req, res) {
    res.send(page.loginPage(authHelp.getAuthUrl()));
});

app.get('/authorize', function(req, res) {
    var authCode = req.query.code;
    if (authCode) {
      console.log('');
      console.log('Retrieved auth code in /authorize: ' + authCode);
      authHelper.getTokenFromCode(authCode, tokenReceived, req, res);
    }
    else {
      // redirect to home
      console.log('/authorize called without a code parameter, redirecting to login');
      res.redirect('/');
    }
});

function tokenReceived(req, res, error, token) {
    if (error) {
        console.log('ERROR getting token:'  + error);
        res.send('ERROR getting token: ' + error);
    }
    else {
        // save tokens in session
        req.session.access_token = token.token.access_token;
        req.session.refresh_token = token.token.refresh_token;
        req.session.email = authHelper.getEmailFromIdToken(token.token.id_token);
        res.redirect('/logincomplete');
    }
};

app.get('/logincomplete', function(req, res) {
    var access_token = req.session.access_token;
    var refresh_token = req.session.access_token;
    var email = req.session.email;
    
    if (access_token === undefined || refresh_token === undefined) {
        console.log('/logincomplete called while not logged in');
        res.redirect('/');
        return;
    }
    
    res.send(pages.loginCompletePage(email));
});

// Start the server
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});