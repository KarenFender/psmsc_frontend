(function() {
    'use strict';

    angular
        .module('app.administrador')
        .controller('AgregarUsuarioCtrl',Recuperar);
	  	Recuperar.$inject=['ServiceUser','$scope'];
	    
	function Recuperar(ServiceUser,$scope)
	{
		$scope.settings = [{
			pageTitle: 'Prueba de Conexión'
		}]
	  console.log("Entrando al controlador...")
	  /* jshint validthis: true */
	  var vm = this;
	  vm.usuarios =[];
	  ServiceUser.recuperaUsuario().then(function(data){
	  	console.log(data);
	  	vm.usuarios = data;
	  });
	}
})();