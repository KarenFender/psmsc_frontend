(function() {
    'use strict';

    angular
        .module('app.administrador')
        .factory('agregarSubcatFry', ServiceSubcategoria);

    
     ServiceSubcategoria.$inject = ['$resource','localBase'];

    /* @ngInject */
    function ServiceSubcategoria($resource,localBase) {
       return $resource(localBase + "subcategoria/:id",{id:"@_id"},{
			update: {method: "PUT", params: {id:"@id"}}
		});
    }
})();