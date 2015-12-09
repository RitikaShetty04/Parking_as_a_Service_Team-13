var app = angular.module('myApp', []);
app.controller('Controller', function($scope,$http,$location,$window)
		  {
	  var latti="hellooutside";
	  $scope.added="false";
	  $scope.initAutocomplete = function()
	  {
		
		  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.3343640999999, lng:-121.9103711000000},
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  // Create the search box and link it to the UI element.
  $scope.input = document.getElementById('pac-input');
  
  var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
 
 
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('pac-input'));

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  $scope.lattitude;
  $scope.longitude;
  $scope.lat="hello";
  
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
    
      $scope.lattitude=place.geometry.location.lat();
      $scope.longitude=place.geometry.location.lng();
      //alert("Lattitude" + $scope.lattitude+ "Longitude" +$scope.longitude );

    latti=$scope.lattitude;
    //console.log("Value outside"+latti);
      //alert("Lattitude" + latti);
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
  //console.log("Value outside"+latti);
  // [END region_getplaces]
}
	  //lat lng
	  	$scope.lati=0;
		$scope.longi=0;
		$scope.getLocation=function(){
				
			$scope.address=document.getElementById('pac-input').value;
			$scope.strArray = $scope.address.split(",");
			$scope.city=$scope.strArray[1];
			console.log("city:" +$scope.strArray[1]);
		 $scope.geocoder = new google.maps.Geocoder(); 
		 $scope.geocoder.geocode({address:$scope.address}, function (results,status){ 
	    	          $scope.p = results[0].geometry.location;
	    	         $scope.lati=$scope.p.lat();
	    	         $scope.longi=$scope.p.lng();    

	    	         
	    	         $http({
						method : "POST",
						url : '/addParkingSpace',
						data : {
							
							"address":$scope.address,
							"city":$scope.city,
							"lattitude" : $scope.lati,
							"longitude" : $scope.longi
						}
					}).success(function(data) {
						console.log("Parking space added");
						$scope.result = "Parking space added";
						$scope.added="true";
						
					})
		
			});		
			  
		}
	  
		
		$scope.addParkingPage = function() {
			console.log("In owner controller");
			$window.location="/addParkingPage";
			};
			
			$scope.viewMyParkingSpaces = function() {
				console.log("In viewMyParkingSpaces controller");
				$window.location="/viewMyParkingSpaces";
				};
				
				$scope.viewAllOwnerContracts = function() {
					console.log("In viewAllOwnerContracts controller");
					$window.location="/view_contracts";
					};
					
				
		  });