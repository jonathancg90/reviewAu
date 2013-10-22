
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

    }
};
