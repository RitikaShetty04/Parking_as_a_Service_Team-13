var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";

var checkLoggedInUser = require("./checkLoggedInUser.js");

exports.addParkingSpace = function(req, res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("In ParkingSpace JS");
	
	var lattitude = req.body.lattitude; 
	var longitude = req.body.longitude;
	var owner_username=req.session.loggedInUserName;
	var address=req.body.address;
	var city=req.body.city;
	var status="unavailable";
	
	console.log("Values in JS: "+lattitude+" "+longitude +" "+req.body.address +" "+owner_username+" "+ city);
	
// insert into DB parking space values

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('parkingSpace');
		

		coll.insert({
			owner_username : owner_username,
			lattitude : lattitude,
			longitude : longitude,
			address : address,
			city : city,
			status : status,
	}, function(err, user){
		if (user) {
			console.log("Parking Space added!");
				//res.send({"signup":"Owner Success"});

		} else {
			//res.send({"signup":"Fail"});
	
			}
	});
	
	});
}
};

exports.addParkingPage = function(req,res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("in add parking page");
	res.render('addParkingSpace',{'user':req.session});
	}
};

exports.viewMyParkingSpaces = function(req,res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("in viewMyParkingSpaces page");
	res.render('viewMyParkingSpaces',{'user':req.session});
	}
};

exports.logout = function(req, res) {
	req.session.destroy();
	console.log("Session destroyed :" +req.session);
	res.render("index", {
		title : 'Login',
		error : 'You have logged out successfully'
	});
};


