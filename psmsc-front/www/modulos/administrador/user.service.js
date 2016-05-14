(function() {
    'use strict';

    angular
        .module('app.administrador')
        .factory('ServiceUser', ServiceUser);

    ServiceUser.$inject = ['$http'];

    /* @ngInject */
    function ServiceUser($http,localBase) {

        var service = {recuperaUsuario:recuperaUsuario,
                       agregaUsuario:agregaUsuario
        };

        ////////////////
        function recuperaUsuario(localBase) {
        	var promise = $http.get(localBase)
            .then( function llamadaExitosa(response){
                    //Código cuando se realice una llamada exitosa
                    return response.data;
                }, function llamadaErronea(response){
                    //Código cuando ocurra un error en la llamada
                    console.log(response);
                });
            return promise;
        }
        ////////////////
        function agregaUsuario(localBase)
        {
            var data= {"data": {
                        "username":"NuevoUsuario",
                        "email": "correo",
                        "password": "contraseña",
                        "Rpassword":"contraseñaNuevamente",
                        "FechaNac": "05/12/1990"}
                        };
            var promise = $http.post(localBase,data).then(entregaExitosa,errorEntrega);

            function entregaExitosa()
            {
                console.log("entrega exitosa");
            }

            function errorEntrega()
            {
                console.log("Error en la solicitud");
            }

        }//Fin de AgregaUsuario
    
        return service;
    }
    
})();