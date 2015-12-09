var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";
var checkLoggedInUser = require("./checkLoggedInUser.js");

function searchParking(req,res) {
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	console.log("in searchparking");
	res.render('searchParking',{'user':req.session});
	}
}

exports.searchParking=searchParking;
