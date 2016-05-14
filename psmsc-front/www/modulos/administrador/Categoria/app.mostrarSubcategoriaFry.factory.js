(function() {
    'use strict';

    angular
        .module('app.administrador')
        .factory('mostrarSubcategoriaFry', mostrarSubcategoria);

    mostrarSubcategoria.$inject = ['$resource','localBase'];

    /* @ngInject */
    function mostrarSubcategoria($resource,localBase) {
       return $resource(localBase + "getSubcategoria/:id",{id:"@_id"},{
			update: {method: "PUT", params: {id:"@id"}}
		});
    }
})();