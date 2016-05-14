(function() {
    'use strict';

    angular
        .module('app.administrador')
        .controller('editarCategoriaCtrl', verCategorias);

    verCategorias.$inject = ['$http','localStorageService','agregarCatFry'];

    /* @ngInject */
    function verCategorias($http,localStorageService,agregarCatFry) {
         $http.defaults.headers.post.Authorization =  "bearer "+ localStorageService.get('token');
        console.log("Editar categoria...");
        var vm = this;
        
        //var idCategoria = $routeParams.id;
        vm.categoria={nombre:''};

        agregarCatFry.get({id:idCategoria},function(data){
            vm.categoria = data.categoria;
        });

    }
})();