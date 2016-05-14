(function() {
    'use strict';

    angular
        .module('app.administrador')
        .factory('getUser', getUser);

    getUser.$inject = ['$resource','localBase'];

    /* @ngInject */
    function getUser($resource,localBase) {
	   	return $resource(localBase + "create/:idUser",{idUser:"@_idUser"},{
			update: {method: "PUT", params: {idUser:"@idUser"} }
		})
    }

})();