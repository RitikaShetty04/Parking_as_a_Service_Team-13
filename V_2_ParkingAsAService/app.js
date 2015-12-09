
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , signup=require('./routes/Signup')
  , expressSession = require("express-session")
  , mongo = require("./routes/mongo")
  ,login=require("./routes/login")
  ,view_contracts=require("./routes/view_contracts")
  ,reserve=require("./routes/reserveParking")
  ,addParkingSpace=require("./routes/addParkingSpace")
  ,renter=require("./routes/renter")
  ,getParkingSpaces=require('./routes/getParkingSpaces')
  ,viewparkingspaces=require('./routes/viewparkingspaces');

var app = express();

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var mongoStore = require("connect-mongo")(expressSession);

//configure the sessions with our application
app.use(expressSession({   
	  
	resave: false,
	saveUninitialized: false,
	secret: 'ParkingAsAService',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({url:mongoSessionConnectURL})

}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/sign_up', signup.after_sign_up);
app.get('/view_contracts',view_contracts.view_contracts);
app.get('/renterLogin', login.before_renter_login);
app.post('/renterLogin', login.after_renter_login );
app.get('/login', login.before_owner_login);
app.post('/login',login.after_owner_login);
app.get('/adminLogin',login.before_admin_login);
app.post('/adminLogin',login.after_admin_login);
app.get('/searchParking',reserve.searchParking);

app.post('/addParkingSpace',addParkingSpace.addParkingSpace);

app.get('/ownerProfile', addParkingSpace.ownerProfile);
app.get('/addParkingPage', addParkingSpace.addParkingPage);
app.get('/viewMyParkingSpaces', addParkingSpace.viewMyParkingSpaces);
app.get('/logout', addParkingSpace.logout);

//renter navigation
app.get('/renterProfile', renter.renterProfile);
app.get('/searchParkingPage', renter.searchParkingPage);
app.get('/view_rentercontracts',renter.view_rentercontracts);


//app.post('/addParkingSpace',login.after_admin_login);
app.get('/waytoviewparkingspaces',viewparkingspaces.waytoviewparkingspaces);
app.post('/listParkingOfOwner',viewparkingspaces.listParkingOfOwner);
app.post('/changeAvailableTime',viewparkingspaces.changeAvailableTime);
app.post('/changeStatus',viewparkingspaces.changeStatus);
app.get('/getParkingSpaces',getParkingSpaces.getParkingSpaces);
app.get('/goToReserve',getParkingSpaces.goToReserve);
app.get('/goToReserveConfirm',getParkingSpaces.goToReserveConfirm);


mongo.connect(mongoSessionConnectURL, function() {
	http.createServer(app).listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
	});

});