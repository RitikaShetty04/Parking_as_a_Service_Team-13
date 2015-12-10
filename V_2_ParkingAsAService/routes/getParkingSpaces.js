var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://localhost:27017/ParkingAsAService";

exports.getParkingSpaces=function(req,res)
{
	console.log("in getparkingSpaces");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('parkingSpace');

		coll.find({"status":'0'}).toArray(function(err,response)
				{
			if(err)
			{
				console.log("error in getParkingSpace");
			}else
			{
				var resulttosend=[];
				var date=new Date();
				var time=date.getTime();
				var hrs=date.getHours();
				var min=date.getMinutes();
				console.log("date"+date+" time "+time+" hrs "+hrs+" min "+min+" response "+response[0].availableFrom);
				for(var i=0;i<response.length;i++)
				{
					var availableFrom=response[i].availableFrom.split(':');
					var availableTo=response[i].availableTo.split(':');
					console.log("splitted"+availableFrom[0]);

					var availableFromhrs=availableFrom[0];
					var availableFrommin=availableFrom[1];

					var availableTohrs=availableTo[0];
					var availableTomin=availableTo[1];

//					if(parseInt(availableFromhrs)<hrs)
//					{
//						console.log("hello");
//						console.log("if1");
						if(parseInt(availableTohrs)>hrs)
						{					console.log("if2");

						if(((parseInt(availableTohrs)-hrs)==1))
						{
							console.log("if3");

							if(((parseInt(availableTomin)-min)>-30))
							{
								console.log("if4");

								resulttosend.push(response[i]);
							}
						}else
						{
							console.log("if5");

							resulttosend.push(response[i]);	
						}
						}else
							if(parseInt(availableTohrs)==hrs)
							{
								console.log("if6");
								if(((parseInt(availableTomin)-min)>30))
								{
									console.log("if7");
									resulttosend.push(response[i]);
								}

							}
//					}else
//						if(parseInt(availableFromhrs)==hrs && parseInt(availableFrommin)<=min)
//						{
//							console.log("else1");
//							if(parseInt(availableTohrs)>hrs)
//							{
//								console.log("else2");
//								if(((parseInt(availableTohrs)-hrs)==1))
//								{
//									console.log("else3");
//									if(((parseInt(availableTomin)-min)>-30))
//									{console.log("else4");
//									resulttosend.push(response[i]);
//									}
//								}else
//								{
//									console.log("else5");
//									resulttosend.push(response[i]);	
//								}
//							}
//							else if(parseInt(availableTohrs)==hrs)
//							{
//								console.log("else6");
//								if(((parseInt(availableTomin)-min)>30))
//								{console.log("else7");
//								resulttosend.push(response[i]);
//								}
//
//							}
//
//						}
				}
			//	console.log("result"+resulttosend[0].address);  

				res.send({"result":resulttosend});
			}

				});
	});
};
var clickedSpace;
exports.goToReserve=function(req,res)
{
	console.log("in js");
	clickedSpace=req.param("data");
	console.log("clickedSpace"+clickedSpace.address);
	res.send({"response":"Success"});
};

exports.goToReserveConfirm=function(req,res)
{
	console.log("clickedSpace");
	res.render("reserve_button",{"clickedSpace":clickedSpace,"loggedInUser":req.session,"user":req.session});
};
