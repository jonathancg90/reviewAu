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

        //Otros

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

        app.init();
    },

    init: function() {
        //Globales
        var domain = 'http://redau.herokuapp.com/';

        //Elementos disparadoresd e evento
        var login = $('#logIn'),
            carreras = $('#Carreras'),
            turno = $('#Turnos'),
            actualizar = $('#Cursos'),
            calificar = $('#Califica');
        //Elementos contenedores
        var contentLogin = $('.content-logIn'),
            contentProfile = $('.content-Profile'),
            contentCarreras = $('.content-Carreras'),
            contentTurno = $('.content-Turnos'),
            contentactualizar = $('.content-Cursos'),
            contentSaber = $('.content-Saber'),
            contentCalificar = $('.content-calificar');


        function evtLogin(){
            var data = {
                'username':$('#username').val(),
                'password':$('#password').val()
            };
            var url =  domain +'login-ajax';
            $.ajax({
                dataType: "json",
                type: "POST",
                data: data,
                url: url,
                success: function(data){
                    if(data.status==false){
                        $('.message').append(data.message);
                    }
                    else{
                        $.mobile.changePage("#page_profile");
//                        $('.message').append(data.message);
//                        $('#token').val(data.token);
//                        $('.Information').show();
//                        evtProfile();
//                        evtSaberCursoDelDia();
//                        evtCriterios();
                    }
                }
            });
        }
        function evtProfile(){
            var id = $('#token').val();
            if(id != ''){
                var data = {
                    token:id
                };
                var url =  domain +'perfil';
                $.ajax({
                    dataType: "json",
                    type: "POST",
                    data:data,
                    url: url,

                    success: function(data){
                        contentProfile.children('ul').html('');
                        contentProfile.children('ul').append('<li>Carrera: ID:'+data.carrera.id+' | Nombre: '+data.carrera.nombre+'</li>');
                        contentProfile.children('ul').append('<li>Ciclo: '+data.ciclo+'</li>');
                        contentProfile.children('ul').append('<li>Turno: ID:'+data.turno.id+' | Nombre: '+data.turno.nombre+'</li>');
                        contentProfile.children('ul').append('<li>'+data.username+'</li>');
                        contentProfile.children('ul').append('<li>Seccion '+data.seccion+'</li>');
                        //$.mobile.changePage("otherPage.html");
                    }
                });
            } else{
                contentProfile.children('ul').html('Usuario no valido');
            }
        }
        function evtTurnos(){
            var url =  domain +'turno';
            $.ajax({
                dataType: "json",
                type: "GET",
                url: url,
                success: function(data){
                    contentTurno.children('select').html('');
                    $.each(data, function(id, value){
                        contentTurno.children('select').append('<option value='+value.id+'>'+value.nombre+'</option>');
                    });
                }
            });
        }
        function evtCriterios(){
            var url =  domain +'criterios';
            $.ajax({
                dataType: "json",
                type: "GET",
                url: url,
                success: function(data){
                    contentCalificar.children('ul').html('');
                    $.each(data, function(id, value){
                        contentCalificar.children('ul').append('<li><h4>'+value.nombre+'</h4><input data-id="'+value.id+'" type="number" min="0" max="100" value="50"/></li>');
                    });
                }
            });
        }
        function evtCarreras(){
            var url =  domain +'carrera';
            $.ajax({
                dataType: "json",
                type: "GET",
                url: url,
                success: function(data){
                    contentCarreras.children('select').html('');
                    $.each(data, function(id, value){
                        contentCarreras.children('select').append('<option value='+value.id+'>'+value.nombre+'</option>');
                    });
                    //$.mobile.changePage("otherPage.html");
                }
            });
        }
        function evtActualizarProfile(){
            var token = $('#token').val();
            var data = {
                    'carrera':$("#ch-carrera").val(),
                    'turno':$("#ch-turnos").val(),
                    'ciclo':$('#ch-ciclo').val(),
                    'token':token
                };
            var url =  domain +'actualizar';
            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data:data,
                success: function(data){
                    console.log(data.status);
                }
            });
        }
        function evtSaberCursoDelDia(){
            var token = $('#token').val();
            var data = {
                    'token':token
                };
            var url =  domain +'curso';
            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data:data,
                success: function(data){
                    var id_curso = data.id,
                        profesor = data.profesor,
                        curso = data.curso;
                    contentSaber.children('ul').html('');
                    contentSaber.children('ul').append('<li>Profesor: ID:'+profesor+' | Curso: '+curso+'</li>');
                    $('#idCurso').val(id_curso);
                }
            });
        }

        function evtCalificar(){
            var token = $('#token').val(),
                curso = $('#idCurso').val();

            var inputs = $('.content-calificar input'),
                calificaciones = [];
            $.each(inputs, function(key, value){
                calificaciones.push({
                    'id':$(value).data('id'),
                    'valor':$(value).val()
                });
            });
            var data = {
                    'token':token,
                    'curso':curso,
                    'califica':JSON.stringify(calificaciones)
                };
            var url =  domain +'califica';
            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data:data,
                success: function(data){
                    debugger;
                }
            });
        }

        //Eventos
        login.on('click',function(e){
            e.preventDefault();
            evtLogin();
        });


        turno.on('click',function(e){
            e.preventDefault();
            evtTurnos();
        });

        carreras.on('click',function(e){
            e.preventDefault();
            evtCarreras();
        });
        actualizar.on('click',function(e){
            e.preventDefault();
            evtActualizarProfile();
        });

        calificar.on('click',function(e){
            e.preventDefault();
            evtCalificar();
        });
    }
};
