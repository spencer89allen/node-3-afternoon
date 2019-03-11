var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session')
require('dotenv').config();

var checkForSession = require('./middlewares/checkForSession');
var swag_controller = require('./controllers/swag_controller');

var app = express();

app.use(bodyParser.json());
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use( checkForSession )
app.use( express.static( `${__dirname}/../build` ) );

//endpoints
app.get(/api/swag, swag_controller.read)

app.post( '/api/login', auth_controller.login );
app.post( '/api/register', auth_controller.register );
app.post( '/api/signout', auth_controller.signout );
app.get( '/api/user', auth_controller.getUser );

app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart/checkout', cart_controller.checkout );
app.delete( '/api/cart', cart_controller.delete );

app.get( '/api/search', search_controller.search );


var PORT = 3000;

app.listen(PORT, () => {
    console.log(`Your server is listening on port: ${PORT}`)
});