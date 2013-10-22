
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        app.init();
    },

    init: function() {
        //Globales
        var domain = 'http://redau.herokuapp.com/';


        //Elementos
        var login = $('#logIn');


        //Eventos
        login.on('click',function(e){
            var id = 1;
            e.preventDefault();
            var url =  domain +'perfil/'+id;
            $.ajax({
              type: "GET",
              url: url,
              success: function(){
                  debugger;
                  $.mobile.changePage("otherPage.html");
              }
            });
        });

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
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
