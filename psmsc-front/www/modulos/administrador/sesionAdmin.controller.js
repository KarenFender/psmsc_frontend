(function() {
    'use strict';

    angular
        .module('app.administrador')
        .controller('sesionAdminCtrl', sesionAdminCtrl);

    sesionAdminCtrl.$inject = ['$location'];

    /* @ngInject */
    function sesionAdminCtrl($location) {
        var vm = this;

        vm.administrador = {
       	email:'',
       	password:''
       };

       vm.sesionAdmin = rsesionAdmin;

        ////////////////

        function rsesionAdmin() {
        	$location.path('/sesionAdmin');
        }
    }
})();