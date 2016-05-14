(function() {
    'use strict';

    angular
        .module('app.usuario')
        .controller('editRegistroCtrl', editRegistroCtrl);

    editRegistroCtrl.$inject = ['$location','$http','localStorageService','UserFry','ionicDatePicker'];

    /* @ngInject */
    function editRegistroCtrl($location,$http,localStorageService,UserFry,ionicDatePicker)
    {
       var vm = this;
       activate();
       vm.usuario = {
        id: null,
       	username : null,
       	email:null,
       	fechaNac:null
       };
       vm.datepicker = abrirDatepicker;
       vm.recuperaContrasena = recContra;
       vm.verPublicaciones = verPublicaciones;
       vm.submit = CambiarDatos;

        function CambiarDatos()
        {
          UserFry.save({id:vm.usuario.id},vm.usuario).$promise.then(function success(data){
            angular.copy({},vm.usuario);
            settings.success = "Usuario "+ data.usuario.username + " editado correctamente";
          })
        }

        function activate()
        {
            $http.defaults.headers.post.Authorization = "bearer " + localStorageService.get('token');
            //Proceso para recuperar los datos del usuario a editar
            //(pendiente en el back)
            UserFry.get(function(data){
              console.log(data);
              vm.usuario = data.usuario;
            },function(err){
              console.log("Error en el servidor: "+err);
            });
        }

        function abrirDatepicker()
        {
          vm.configuracionFecha = {
            callback: function(val){
              vm.usuario.fechaNac =   moment(val).format('YYYY-MM-DD');
              console.log("Su fecha de nacimiento: "+vm.usuario.fechaNac);
            },
            from: new Date(1930, 1, 1), //Optional
            to: new Date(2005,1 ,1), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup',       //Optional
            showTodayButton:false
          };
          ionicDatePicker.openDatePicker(vm.configuracionFecha);
        }

       function recContra()
       {
       	 $location.path('/oContrasena');
       }

       function verPublicaciones()
       {
        $location.path('/sesion');
       }
    }
})();