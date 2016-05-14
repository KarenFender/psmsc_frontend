/**
 * Created by danny_000 on 24/04/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.sesion')
        .factory('PublicacionesFry', solicitud);

    solicitud.$inject = ['$resource','localBase'];

    /* @ngInject */
    function solicitud($resource,localBase)
    {
        return $resource(localBase + "getPublicaciones/:id",
            {id:"@_id"},
            { update : {method: "PUT", params: {id:"@id"} },
            })
    }
})();
