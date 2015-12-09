/**
 * New node file
 */
var mongo=require('./mongo');
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";
var checkLoggedInUser=require('./checkLoggedInUser.js');

exports.waytoviewparkingspaces=function(req,res)
{
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
res.render('viewparkingspaces',{'user':req.session});	
	}
	else {
		res.render('login');
	}
};


exports.listParkingOfOwner=function(req,res)
{
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var username=req.session.loggedInUserName;
		var coll = mongo.collection('parkingSpace');
			
		var cursor=coll.find({owner_username: username}).toArray(function(err,items){
			{
				if(err)
					{
					console.log("error");
					}
				else
					{
					console.log(items[0].availableFrom);
					res.send({"parkingSpaceDetails" : items});
					}
				
			}
			
		});
	});
	}else {
		res.render('login');
	}

};

exports.changeAvailableTime=function(req,res)
{
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	var parkingSpaceId=req.param("parkingSpaceId");
	var availableFrom=req.param("availableFrom");
	var availableTo=req.param("availableTo");
	console.log("hello"+parkingSpaceId+availableFrom+availableTo);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		
		var coll = mongo.collection('parkingSpace');
		coll.update({"parkingSpaceId" : parkingSpaceId},
					{$set : {"availableFrom" : availableFrom, "availableTo" : availableTo, "status" : '0'}},function(err,response)
					{
						if(err)
							{
							console.log("error");
							}
						else
							{
							res.send({"result" : "success","parkingSpaceDetails" : response });
							
							}
					
					
					}
					);
				});
		
	
	}else {
		res.render('login');
	}

};


exports.changeStatus=function(req,res)
{
	if (checkLoggedInUser.checkLoggedInUser(req, res) === true) {
	var parkingSpaceId=req.param("parkingSpaceId");
	var status=req.param("status");
	
	console.log("hello"+parkingSpaceId);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		
		var coll = mongo.collection('parkingSpace');
		coll.update({"parkingSpaceId" : parkingSpaceId},
					{$set : {"status" : status }},function(err,response)
					{
						if(err)
							{
							console.log("error");
							}
						else
							{
							console.log("in success");
							res.send({"result" : "success","parkingSpaceDetails" : response });
							
							}
					
					
					}
					);
				});
	}else {
		res.render('login');
	}
};







