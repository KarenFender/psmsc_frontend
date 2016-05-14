(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('ShareService', ShareService);

    ShareService.$inject = ['$resource','localBase'];

    /* @ngInject */
    function ShareService($resource,localBase) {
        return $resource(localBase + "publicaciones/:idPublicacion",
        	{idPublicacion:"@_idPublicacion"},
        	{ update : {method: "PUT", params: {idPublicacion:"@idPublicacion"} } 
        });
    }
})();