var view = new View();

function View(){
  var TAG = "View";
  var MAX_VENUES = 20;

  this.listVenues = function(venues){
    console.log(TAG, "listVenues", venues.length);

      var $list = $("#venues-list");
      $list.empty();

      for (var i = 0 ; i< venues.length && i < MAX_VENUES; i++){
        var venue = venues[i];
        //list += printVenue(venue);
        $venueItem = $(printVenue(venue));
        $list.append($venueItem);
      }
  }

  var printVenue = function(venue){
    console.log(TAG, "printVenue", venue);

        var googlemaps = googleMapsLink(venue.location.lat, venue.location.lng);
        var distance = transformDistance(venue.location.distance)
        var category = venue.categories[0].name;

        var firstPhoto = venue.featuredPhotos.items[0];
        var featuredPhoto = "";
        if (firstPhoto) featuredPhoto = imageUrl(firstPhoto);

        var template = $('#template').html();
         Mustache.parse(template);   // optional, speeds up future uses
         var rendered = Mustache.render(template, {featuredPhoto: featuredPhoto, venue: venue, googlemaps: googlemaps, distance: distance, category: category});

          return rendered;
    }

  var transformDistance = function(distanceInM) {
    var distanceInTime = distanceInM / 1.4;
    if (distanceInTime < 60) distanceInTime = parseInt(distanceInTime)+ " s";
    else if (distanceInTime < 3600) distanceInTime = parseInt(distanceInTime / 60)+ " min";
    else distanceInTime = parseInt(distanceInTime / 3600) + " h";

    if (distanceInM < 1000) var distance = distanceInM + " m";
    else var distance = (distanceInM / 1000) + " km";

    return distance + " ("+distanceInTime+")";
  }

  //Not needed if you use explore endpoint
    var printVenueDetails = function($venueItem, venue){

      console.log(TAG, "printVenueDetails", venue, "UL", $venueItem);
      console.log(TAG, "printVenueDetails", venue.id + " rating: "+ venue.rating);

      $venueItem.find(".venue-rating").html(venue.rating); //add color too
      if (venue.bestPhoto) $venueItem.find(".venue-image").attr('src', imageUrl(venue.bestPhoto));
      $venueItem.find(".venue-url").attr('href', venue.canonicalUrl);
      if (venue.hours) {
        $venueItem.find('.venue-open').html(venue.hours.isOpen + " ("+venue.hours.status+")");
        $venueItem.find('.venue-hours').html(timeTimeframe(todayTimeframe(venue.hours.timeframes)));
      }
      if(venue.contact) {
          $venueItem.find('.venue-phone').html(venue.contact.formattedPhone);
          $venueItem.find('.venue-phone').attr("href", "tel:"+venue.contact.phone);

      }
    }

    var todayTimeframe = function(timeframes) {
      for (var i = 0; i < timeframes.length; i++){
        var timeframe = timeframes[i];
        if (timeframe.includesToday) return timeframe;
      }
    }
    var timeTimeframe = function(timeframe) {
      if (!timeframe) return "Not available";

      console.log(TAG, "timeTimeframe", timeframe);

      var time = "";
      var sep = "";
      for (var i = 0; i < timeframe.open.length; i++){
        time += sep + timeframe.open[i].renderedTime;
        sep =  "/";
      }
      return time;
    }

  var imageUrl = function(bestPhoto) {
    var maxSize = bestPhoto.width + "x" + bestPhoto.height;
    var size = "100x100";
    return bestPhoto.prefix + size + bestPhoto.suffix;
  }

  var googleMapsLink = function(lat, lon, text) {
    var zoom = 17;
    var url = "http://maps.google.com/maps?q=loc:"+ lat +","+lon;
    /*if(isIOS()) url = "comgooglemaps://?center="+ lat +","+lon+ "&zoom="+zoom;
    else*/
    return url;
  }

}
