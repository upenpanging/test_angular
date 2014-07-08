	// filter controller
	// For ng-app= myApp
	app.filter('reverse', function (Data) {
	  return function (text) {
		return text.split("").reverse().join("")+" "+Data.message;
	  }
	});
    //----- For ng-app= myApp--------