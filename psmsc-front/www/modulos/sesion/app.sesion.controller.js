/**
 * Created by danny_000 on 22/04/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('SesionCtrl',funcionSesion);

    funcionSesion.$inject = ['localStorageService','SesionFry','$http','PublicacionesFry','$location'];

    function funcionSesion(localStorageService,SesionFry,$http,PublicacionesFry,$location)
    {
        activate();
        var vm = this;
        vm.usuario = {
            nombre:'',
            Authorization: ''
        };
        vm.publicaciones;
        vm.logout = salir;
        vm.compartir = compartir;


        /*Implementación de funciones*/
        function salir()
        {
            vm.usuario.Authorization = null;
            localStorageService.remove('token');
            console.log("Token: "+vm.usuario.Authorization);
            $location.path('/inicio');
        }

        function activate()
        {
            $http.defaults.headers.post.Authorization = "bearer "+ localStorageService.get('token');
            //Solictud para recuperar el nombre del usuario
            SesionFry.save().$promise.then(function(data){
                vm.usuario.nombre= data.username;
            }).catch(function(err){
                console.log("Error: "+err);
            });
            //Solicitud para recuperar las publicaciones
            PublicacionesFry.get(function(data){
                console.log(data);
                vm.publicaciones = data.publicaciones;
            },function(){
                console.log("Error en el servidor ");
            });
        }

        function compartir()
        {
            $location.path('/compartir');
        }
    }
})();
