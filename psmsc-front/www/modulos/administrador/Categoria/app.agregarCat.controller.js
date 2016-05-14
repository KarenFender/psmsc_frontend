(function() {
    'use strict';

    angular
        .module('app.administrador')
        .controller('agregarCatCtrl', agregarCat);

    agregarCat.$inject = ['$http','localStorageService','agregarCatFry','$state'];

    /* @ngInject */
    function agregarCat($http,localStorageService,agregarCatFry,$state) {
        $http.defaults.headers.post.Authorization =  "bearer "+ localStorageService.get('token');
		console.log("ControladoragregarCat...");

        var vm = this;
        vm.settings = {
        	pageTitle: 'Ingresa una nueva categoría'
        };

        vm.categoria= {
        	nombre: ''
        };

        vm.agregar = agregar;
        vm.verCategorias = verCategorias;
        

        function agregar(){
        	agregarCatFry.save(vm.categoria).$promise.then(function(data){
        		vm.settings.success="Categoria "+vm.categoria.nombre +" agregada";
        		angular.copy({},vm.categoria);
        		console.log(data);
        	},function(err){
        		console.log("error desde server"+err);
        	});
        }

        function verCategorias()
        {
            $state.go('verCategorias');
        }

    }
})();