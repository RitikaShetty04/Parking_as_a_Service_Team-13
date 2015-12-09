var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";

function searchParking(req,res) {
	console.log("in searchparking");
	res.render('searchParking',{'user':req.session});
}

exports.searchParking=searchParking;
