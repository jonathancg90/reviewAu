var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        app.showAlert('Mensaje de prueba','Mensaje informativo');
        app.progress_bar():
    },
    showAlert: function(message, title){
        if(navigator.notification){
            navigator.notification.alert(message, null, title, 'OK');
        }
        else{
            alert(title ? (title + ':' + message) : message);
        }
    },
    progress_bar: function(){
        // progress bar
        var tries = 0;
        setInterval(function(){
            if (tries < 56){
                tries++;
                // $('#progress-bar').find('.ui-slider-bg').css({
                //     'width':'10px'
                // });
            }       
        }, 100);
    }
};
