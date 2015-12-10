var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";
var duration;
var total;
var checkin;
var checkout;
var clickedSpaceDetail;

exports.sendBillDetail=function(req,res)
{
	console.log("in sendbilldetail");
	duration=req.param("duration");
	total=req.param("total");
	checkin=req.param("checkin");
	checkout=req.param("checkout");
	clickedSpaceDetail=req.param("clickedSpaceDetail");
	clickedSpaceDetail=JSON.parse(clickedSpaceDetail);
	console.log("clicked"+clickedSpaceDetail.owner_username);
	var date=new Date();
	date=date.toLocaleDateString();
	console.log("date"+date);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('parkingContract');
		var coll1=mongo.collection('parkingSpace');

		coll.insert({date : date,
			billingId : '10',
			owner_username : clickedSpaceDetail.owner_username,
			renter_username : req.session.loggedInUserName,
			parking_lattitude : clickedSpaceDetail.lattitude,
			parking_longitude : clickedSpaceDetail.longitude,
			parkingStartTime : checkin,
			parkingEndTime : checkout,
			duration : duration,
			baseRate : '20',
			totalAmount : total,
			address : clickedSpaceDetail.address
		},function(err,response)
		{
			if(response)
			{
				coll1.update({owner_username : clickedSpaceDetail.owner_username, address : clickedSpaceDetail.address},{$set : {availableFrom : checkout}},

						function(err,response){

						if(err)

						{



						}

						else

						{

						res.send({"response":"Success"});

						}

						});
				
			}
		});
	});


};

exports.goToBill=function(req,res)
{
	console.log("in gotobill");
	res.render("BillingPage",{"duration" : duration,"total" : total, "checkin":checkin, "checkout":checkout,"user":req.session});
};