var yelp = new Yelp();

//https://www.yelp.com/developers/api_console
function Yelp(){
  var YWSID = "REPLACE-ME";
  var domain = "http://api.yelp.com/";

  this.get = function(name, callback) {
    var lat = 51.537252;
    var lon = -0.119523;
    this.search(lat,lon, name, function(error, businesses){
        for (var i = 0; i < businesses.length; i++){
          var b = businesses[i];
          if (b.name.indexOf(name) != -1) {
            console.log("Found business "+b.name + " with id " +b.id);
            callback(false, b);
            return;
          }
        }
    });
    var msg = "Unable to find business: " +name;
    console.log(msg);
    callback(msg);
  }
      this.search = function(lat, lon, name , callback){


        var bounds = getBounds(lat,lon);
        var boundsFilter = "&tl_lat=" + bounds.s + //+ mapBounds.getSouthWest().lat() +
           "&tl_long=" + bounds.w +//+ mapBounds.getSouthWest().lng() +
           "&br_lat=" + bounds.n +//+ mapBounds.getNorthEast().lat() +
           "&br_long=" + bounds.e ; // + mapBounds.getNorthEast().lng() +

        name = encodeURIComponent(name);
        var url = domain +
            "business_review_search?"+
            //"callback=" + "handleResults" +
            "&term=" + name +
            boundsFilter +
            "&num_biz_requested=10" +
            "&ywsid=" + YWSID;

            console.log("URL " + url);
            $.ajax({
              url: url,
              success: function(json) {
                callback(false, json.businesses);
              },
              error: function (xhr) {
                console.error("Unable to get yelp businesses ", xhr);
                callback(xhr);
              }

            })
      }

      var getBounds = function(lat, lon){
        var tolerance = 0.01;
        return {
          n: lat + tolerance,
          s: lat - tolerance,
          e: lon + tolerance,
          w: lon - tolerance
        }
      }
}
