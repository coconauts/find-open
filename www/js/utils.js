var log = function(txt) {
  $("#log").html(txt);

}

var isCordova = function(){
  console.log("URL " , document.URL);
  //var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1  && document.URL.indexOf( 'file://' ) === -1;
  return document.URL.indexOf('android_asset') !== -1;
}
/*
if (isCordova())  $("#browser").html("I'm running in cordova");
else $("#browser").html("I'm running in a browser");
*/
