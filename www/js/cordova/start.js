var geolocation;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {

        geolocation = navigator.geolocation;
        log("Device ready");
    }
};

app.initialize();
