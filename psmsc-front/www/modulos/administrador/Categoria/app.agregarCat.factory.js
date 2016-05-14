(function() {
    'use strict';

    angular
        .module('app.administrador')
        .factory('agregarCatFry', ServiceCategoria);

    ServiceCategoria.$inject = ['$resource','localBase'];

    /* @ngInject */
    function ServiceCategoria($resource,localBase) {
      

        return $resource(localBase + "categoria/:id",{id:"@_id"},{
			update: {method: "PUT", params: {id:"@id"} }
		});
    }
})();