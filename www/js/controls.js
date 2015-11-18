var lastCategory = "food";

var searchCategory = function(category, openNow){

  $("#loading").show();

  lastCategory = category;
  geolocationService.getLocation(function(error, latlon) {
    if (error) {
      console.error("Controls", "#search-button", "Unable to get location", error);
      amplitude.logEvent("error-location", {error: error});
      log("Unable to get location " + JSON.stringify(error) );
      return;
    }

    amplitude.logEvent("search", {category: cateogry, latlon: latlon});

    log("Searching in " + latlon.lat + ","+latlon.lon);
    foursquare.explore(latlon.lat, latlon.lon, category, openNow, function(error,venues){
      console.log("Controls", "#search-button", error, venues.length);

      if (error) {
        console.error("Controls", "#search-button", "Unable to get venues", error);
        amplitude.logEvent("error-foursquare", {error: error});

      } else view.listVenues(venues);

      Materialize.showStaggeredList('#venues-list')
      $("#loading").hide();
      $("#search-again-panel").show();

      if (openNow && venues.length == 0)  {
        console.log("Controls", "Filtering open places didn't return venues");
      //  searchCategory(category, false);
      }
    });
  });
}

$("#search-again-closed").click(function(){
    log("Repeating search closed: "+ lastCategory);
    searchCategory(lastCategory, false);
    amplitude.logEvent("repeat", {category: lastCategory});
});

  $("#search-food").click(function(){
    log("Click on food");
    //searchCategory("4d4b7105d754a06374d81259");
    searchCategory("food", true);
  });

  $("#search-coffee").click(function(){
    log("Click on coffee");
    //searchCategory("4bf58dd8d48988d128941735");
    searchCategory("coffee", true);
  });

  $("#search-drinks").click(function(){
    log("Click on drinks");
    //searchCategory("4d4b7105d754a06376d81259");
    searchCategory("drinks", true);
  });
