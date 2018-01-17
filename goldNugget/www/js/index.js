var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.querySelector("#imgSplashScreen").remove();
        document.getElementById("app").removeAttribute('hidden');
    }
};

app.initialize();