angular
	.module('app')
	.config(config);

function config(ionicDatePickerProvider,$stateProvider,$urlRouterProvider)
{
	    $stateProvider.state('inicio',{
        url:'/inicio',
        templateUrl:'templates/inicio.html',
        controller:'LoginCtrl',
        controllerAs:'vm'
      });
      $stateProvider.state('sesion',{
        url:'/sesion',
        templateUrl:'templates/sesion.html',
          controller: 'SesionCtrl',
          controllerAs: 'vm'
      });
      $stateProvider.state('bProducto',{
        url:'/bProducto',
        templateUrl:'templates/bProducto.html',
        controller: 'bProductoCtrl',
        controllerAs: 'vm'
      });
      $stateProvider.state('registro',{
        url:'/registro',
        templateUrl:'templates/registro.html',
        controller: 'AgregarUsuarioCtrl',
        controllerAs: 'vm'
      });
      $stateProvider.state('oContrasena',{
        url:'/oContrasena',
        templateUrl:'templates/oContrasena.html'
      });
      $stateProvider.state('terminosCondiciones',{
        url:'/terminosCondiciones',
        templateUrl:'templates/terminosCondiciones.html'
      });
      $stateProvider.state('compartir',{
        url:'/compartir',
        templateUrl:'templates/compartir.html',
        controller:'CompartirCtrl',
        controllerAs: 'vm'
      });
      /*
       *Actualizacion de vistas 14-Abril-2016
       **/
       $stateProvider.state('ayudaGral',{
        url:'/ayudaGral',
        templateUrl:'templates/ayudaGral.html',
        controller:'ayudaGralCtrl',
        controllerAs: 'vm'
       });
       $stateProvider.state('editRegistro',{
        url:'/editRegistro',
        templateUrl:'templates/editRegistro.html',
        controller:'editRegistroCtrl',
        controllerAs:'vm'
       });
       $stateProvider.state('restabContrasena.html',{
        url: '/restabContrasena',
        templateUrl: 'templates/restabContrasena.html',
        controller: 'restabContrasenaCtrl',
        controllerAs: 'vm'
       });
       $stateProvider.state('sesionAdmin',{
        url: '/sesionAdmin',
        templateUrl:'templates/sesionAdmin.html',
        controller: 'sesionAdminCtrl',
        controllerAs: 'vm'
       });
       $stateProvider.state('finContrasena',{
        url:'/finContrasena',
        templateUrl:'templates/finContrasena.html',
        controller: 'finContrasenaCtrl',
        controllerAs: 'vm'
       });
       $stateProvider.state('verCategorias',{
        url:'/verCategorias',
        templateUrl:'templates/verCategorias.html',
        controller: 'verCategoriasCtrl',
        controllerAs: 'vm'
       });
       $stateProvider.state('configuracion',{
        url: '/configuracion',
        templateUrl:'templates/configuracion.html'
        //controller: 'configuracionCtrl',
        //controllerAs: 'vm'
       });
       $stateProvider.state('agregarCat',{
        url: '/agregarCat',
        templateUrl: 'templates/agregarCat.html',
        controller: 'agregarCatCtrl',
        controllerAs:'vm'
       });
       $stateProvider.state('editarCategoria',{
        url: '/editarCategoria/:id',
        templateUrl: 'templates/editarCategoria.html',
        controller: 'editarCategoriaCtrl',
        controllerAs:'vm'
       });
      $urlRouterProvider.otherwise('/inicio');

      var datePickerObj = {
            inputDate: new Date(),
            setLabel: 'Listo',
            todayLabel: 'Hoy',
            closeLabel: 'Cerrar',
            weeksList: ["D","L","M","M","J","V","S"],
            monthsList: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            templateType: 'popup',
            from: new Date(2012, 8, 1),
            to: new Date(2018, 8, 1),
            showTodayButton: true,
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: false,
            mondayFirst: true
          };
      ionicDatePickerProvider.configDatePicker(datePickerObj);
} 