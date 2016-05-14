/**
 * Created by danny_000 on 23/04/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.sesion')
        .factory('SesionFry', getUsuario);

    getUsuario.$inject = ['$resource','localBase'];

    /* @ngInject */
    function getUsuario($resource,localBase)
    {
        return $resource(localBase + "getUser/:id",
            {id:"@_id"},
            { update : {method: "PUT", params: {id:"@id"} },
            })
    }
})();
