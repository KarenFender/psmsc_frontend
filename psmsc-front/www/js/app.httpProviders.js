(function() {
    'use strict';

    angular
        .module('app')
        .run(configRun);    

    function configRun(localStorageService,$http) {
        $http.defaults.headers.common.Authorization = 'token '+localStorageService.get('token');
    }

})();