(function() {
    'use strict';

    angular
        .module('app.camara')
        .factory('Camera', camara);

    /* @ngInject */
    camara.$inject = ['$q'];

    function camara($q) {
        console.log("Entré a la camara factory");
        return {
        	getPicture: function(options)
        	{
        		var q= $q.defer();
        		navigator.camera.getPicture(function(result)
        		{
        			// Do any magic you need
        			q.resolve(result)
        		},
        		function(err)
        		{
        			q.reject(err);
        		},
        		options);
        		return q.promise;
        	}
        }
    }
})();