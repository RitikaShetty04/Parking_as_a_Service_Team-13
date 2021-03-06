/**
 * New node file
 */

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log("logged in");
     // testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
     // document.getElementById('status').innerHTML = 'Please log ' +
      //  'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Please log ' +
       // 'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
	  fblogin();
	  console.log("in change login state");
    FB.getLoginStatus(function(response) {
    	console.log("in get login status"+response);
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
	  console.log("in fbsuncInit");
  FB.init({
    appId      : '415234018673788',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
	  console.log("in getloginstatus");
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
 function fblogin()
  {
  (function(d, s, id) {
	  console.log("in function");
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  }
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    /* FB.login(function(response) {
    	  // handle the response
    	}, {scope: 'email,user_likes',
    		return_scope : 'true'}); */
    FB.api('/me',{fields: 'first_name,last_name,gender,email'}, function(response) {
      //console.log('Successful login for: ' + response.age_range);
     // document.getElementById('firstName').removeAttribute('hidden');
      document.getElementById('firstName').value = response.first_name;
      document.getElementById('lastName').value = response.last_name;
      //document.getElementById('gender').value = response.gender;
      document.getElementById('email').value = response.email;
      //document.getElementById('age').value = response.age_range[0];
    })
  }
  
  function callingtest()
  {
	  checkLoginState();
	  testAPI();
	  
	  
  }
