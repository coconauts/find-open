

var foursquare = new Foursquare();

function Foursquare(){

  var TAG = "Foursquare";
  var client_id = "REPLACE-ME";
  var client_secret = "REPLACE-ME";
  var endpoint = "https://api.foursquare.com/v2/venues";
  var version = "20130815";

  var useFake = false;

  this.fakeSearch = function(lat, lon, callback){
    console.log(TAG,"fakeSearch", lat, lon);

    $.getJSON("foursquare-sample.json", function(json) {
      console.log(TAG,"fakeSearch", "success", json);
      callback(undefined, json.response.venues);
    });
  }

  this.fakeDetails = function(venueId, callback){
    console.log(TAG,"fakeDetails", venueId);

    $.getJSON("foursquare-details-sample.json", function(json) {
      console.log(TAG,"fakeDetails", "success", json);
      callback(undefined, json.response.venue);
    });
  }

  this.explore = function(lat, lon, section, openNow, callback){

    if (openNow) openNow = 1;
    else openNow = 0;

    console.log(TAG, "explore", lat, lon);

    var radius = 500;
    var limit = 50;
    var offset = 0;
    var url = endpoint +"/explore";

    $.ajax({
      url: url,
      data: {
        "ll": lat+","+lon,
        "v": version,
        section: section , //One of food, drinks, coffee, shops, arts, outdoors, sights, trending or specials
        "radius": radius,
        "limit": limit,
        offset: offset,
        venuePhotos: 1, //Return photos in response
        openNow: openNow, //Open now only
        "client_id":client_id,
        "client_secret":client_secret
      },
      success: function(json) {
        console.log(TAG,"explore", "success", json);
        var venues = [];
        if (json.response.groups.length > 0 )
        for (var i = 0; i < json.response.groups[0].items.length ; i++) {
          var item = json.response.groups[0].items[i];
          venues.push(item.venue);
        }
        callback(undefined, venues);
      },
      error: function(xhr){
        console.error(TAG,"explore", "error", xhr);
        callback(xhr);
      }
    });
  }
  this.search = function(lat, lon, categoryId,  callback){

    if(useFake) {
      this.fakeSearch(lat, lon, callback);
      return;
    }
    console.log(TAG, "search", lat, lon);

    var radius = 500;
    var limit = 50;
    var url = endpoint +"/search";//?ll="+lat+","+lon+"&v="+version+"&categoryId="+categoryId+"&radius="+radius+"&client_id="+client_id+"&client_secret="+client_secret;
    console.log(TAG,"search","url: "+ url);

    $.ajax({
      url: url,
      data: {
        "ll": lat+","+lon,
        "v": version,
        "categoryId": categoryId ,
        "radius": radius,
        "limit": limit,
        "client_id":client_id,
        "client_secret":client_secret
      },
      success: function(json) {
        console.log(TAG,"search", "success", json);
        callback(undefined, json.response.venues);
      },
      error: function(xhr){
        console.error(TAG,"search", "error", xhr);
        callback(xhr);
      }

    });
  }

//Not needed if you use explore endpoint
  this.details = function (venueId, callback) {

    if(useFake) {
      this.fakeDetails(venueId, callback);
      return;
    }
    console.log(TAG, "details", venueId);

    var url = endpoint +"/"+venueId;//?ll="+lat+","+lon+"&v="+version+"&categoryId="+categoryId+"&radius="+radius+"&client_id="+client_id+"&client_secret="+client_secret;

    $.ajax({
      url: url,
      data: {
        "v": version,
        "client_id":client_id,
        "client_secret":client_secret
      },
      success: function(json) {
        console.log(TAG,"details", "success", json);
        callback(undefined, json.response.venue);
      },
      error: function(xhr){
        console.error(TAG,"details", "error", xhr);
        callback(xhr);
      }
    });
  }

}
