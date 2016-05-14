(function() {
    'use strict';

    angular
        .module('app.busquedas')
        .controller('bProductoCtrl', bProductoCtrl);

    bProductoCtrl.$inject = ['busquedasFry'];

    /* @ngInject */
    function bProductoCtrl(busquedasFry) {
    	 var vm = this;
    	 vm.publicaciones={};
    	vm.buscar = buscar;
    	vm.busqueda={
    		nombre:''
    	};



        function buscar() {
        	busquedasFry.save(vm.busqueda).$promise.then(function(response){
        		console.log(response);
        		vm.publicaciones = response.Publicaciones;

        	},function(Error){
        		alert(Error);
        	});
        }
    }
})();