var app = angular.module('myApp', []);
      app.controller('Controller', function($scope,$http,$window)
    		  {
    	  var currdate,time,hrs,mins,timestringlength;
    	  $scope.currdate=new Date();
    	  
    	  var year,month,day,dateFormat;
    	  $scope.year = $scope.currdate.getFullYear()+"";
    	  $scope.month = ($scope.currdate.getMonth()+1)+"";
    	  $scope.day = $scope.currdate.getDate()+"";
    	  $scope.dateFormat = $scope.year + "-" + $scope.month + "-" + $scope.day; 
    	  
    	  $scope.time=$scope.currdate.getTime();
    	  $scope.hrs=$scope.currdate.getHours();
    	  $scope.mins=$scope.currdate.getMinutes();
    	
    	  var drop1;
    	  $scope.drop1=[];
    	  var drop2;
    	  $scope.drop2=[];
    	  var hours;
    	  $scope.hours=parseInt($scope.hrs); 
    	  for(var i=$scope.hours;i<24;i++)
    		  {
    	   if($scope.mins<30)
    		  {
    		  $scope.drop1.push($scope.hours+":30");
    		  $scope.hours=$scope.hours+1;
    		  $scope.drop1.push($scope.hours +":00");
    		  } 
    	   else
    		   {
    		   $scope.drop1.push($scope.hours+1 +":00");
    		   if($scope.hours+1!=24)
    			   {
    		   $scope.drop1.push($scope.hours+1 +":30");
    			   }
    		   $scope.hours=$scope.hours+1;
    		   }
    		  } 
    	  $scope.GetValue = function() {
    		  console.log("in getValue"+$scope.timings);
    		  $scope.checkintime = $scope.timings;
    		  $scope.timestringlength=parseInt($scope.checkintime.length);
    		  $scope.minposition=parseInt($scope.checkintime.indexOf(":"));
    		  $scope.minutestring=$scope.checkintime.substring($scope.minposition+1,$scope.timestringlength);
    		  $scope.hourstring=$scope.checkintime.substring(0,$scope.minposition);
    		  $scope.hour=parseInt($scope.hourstring);
    		  $scope.drop2.length=0;
    		  for(var i=$scope.hour;i<24;i++)
    			  {
    		  if($scope.minutestring=="30")
    			  {
    			  
    			  $scope.hour=$scope.hour+1;
    			  $scope.hourstring=$scope.hour+":00";
    			  $scope.drop2.push($scope.hourstring);
    			  if($scope.hour!="24")
				  {
    			  $scope.hourstring=$scope.hour+":30";
    			  $scope.drop2.push($scope.hourstring);
				  }
    			  }
    		  else
    			  {
    			  $scope.hourstring=$scope.hour+":30";
    			  $scope.drop2.push($scope.hourstring);
    			  if($scope.hour!="24")
				  {
    				  $scope.hour=$scope.hour+1;
    				  $scope.hourstring=$scope.hour+":00";
    				  $scope.drop2.push($scope.hourstring);
    				  }
    			  }
    			  }
    	  }
    	  
    	  $scope.confirmReservation = function() {
    		  
    		  if (confirm("Are you sure you want to proceed with the reservation?"))
              {
        		  $scope.checkouttime = $scope.checkout;
        		  $scope.timestringlength=parseInt($scope.checkouttime.length);
        		  $scope.minposition=parseInt($scope.checkouttime.indexOf(":"));
        		  $scope.minutestringcheckout=$scope.checkouttime.substring($scope.minposition+1,$scope.timestringlength);
        		  $scope.hourstringcheckout=$scope.checkouttime.substring(0,$scope.minposition);
        		  $scope.duration=parseInt($scope.checkouttime)-parseInt($scope.checkintime);
        		  $scope.durationstring=$scope.duration+"";
        		  if(($scope.minutestring=="30" && $scope.minutestringcheckout=="00"))
        			  {
        			  $scope.duration=parseInt($scope.checkouttime)-parseInt($scope.checkintime);
        			  $scope.durationstring=$scope.duration-1;
        			  $scope.durationstring=$scope.durationstring+".5";
        			  }
        		  else if(($scope.minutestring=="00" && $scope.minutestringcheckout=="30"))
        			  {
        			  $scope.duration=parseInt($scope.checkouttime)-parseInt($scope.checkintime);
        			  $scope.durationstring=$scope.durationstring+".5";
        			  }
    			  
              }
    		  else
    			  {
    			  
    			  }
    		  
    	  }
    	  
    			});