/**
 * Created by danny_000 on 27/04/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.usuario')
        .factory('UserFry', getUser);

    getUser.$inject = ['$resource','localBase'];

    /* @ngInject */
    function getUser($resource,localBase) {
        return $resource(localBase + "authenticateUser/:id",{id:"@_id"},{
            update: {method: "PUT", params: {id:"@id"} }
        })
    }

})();