(function() {
    'use strict';

    angular
        .module('app.login')
        .factory('LoginFry', llamadaGet);

    llamadaGet.$inject = ['$resource','localBase'];

    /* @ngInject */
    function llamadaGet($resource,localBase) 
    {
        return $resource(localBase + "login/:idUser",
        	{idUser:"@_idUser"},
        	{ update : {method: "PUT", params: {idUser:"@idUser"} }
        })
    }
})();