var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";

var checkLoggedInUser = require("./checkLoggedInUser.js");

exports.renterProfile = function(req,res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("in renterProfile page");
	res.render('renter_homepage',{'user':req.session});
	}
};

exports.searchParkingPage = function(req,res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("in searchParkingSpace page");
	res.render('searchParkingSpace',{'user':req.session});
	}
};


exports.view_rentercontracts = function(req, res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	var user_name = req.session.loggedInUserName;
	//get username from sessions
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('parkingContract');

		coll.find({renter_username: user_name}).toArray(function(err, user){
			if (user) {
				console.log("User found");
				var all_contracts=[];
				all_contracts=user;
				console.log("All: "+all_contracts.length);
				var result="Contract Found";
				//res.send({'result':"Contracts Found",'rows':all_contracts,'user':req.session});
				res.render('viewAllRenterContracts',{'result':"",'rows':all_contracts,'user':req.session});

			} else {
				console.log("User not found");
				console.log("returned false");
				res.render('viewAllRenterContracts',{'result':"No Contracts Found",'rows':"",'user':req.session});
			}
		});
	});
	}
};