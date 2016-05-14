(function() {
    'use strict';

    angular
        .module('app.busquedas')
        .factory('busquedasFry', busquedasFry);

    busquedasFry.$inject = ['$resource','localBase'];

    /* @ngInject */
    function busquedasFry($resource,localBase) {
       return $resource(localBase + "buscarPublicacion/:idPublicacion",{idPublicacion:"@_idPublicaion"},{
			put: {method: "PUT", params: {idPublicacion:"@idPublicacion"} }
		})
    }
})();