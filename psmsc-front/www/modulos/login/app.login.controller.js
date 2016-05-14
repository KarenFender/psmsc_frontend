(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl',funcionLogin);

        funcionLogin.$inject = ['localStorageService','LoginFry','$location','$state'];

        function funcionLogin(localStorageService,LoginFry,$location,$state)
        {
        	var vm = this;
        	vm.credentials = {
        		email: "",
        		password: ""
        	};
			
        	vm.autenticar = validar;

        	function validar()
        	{
        		LoginFry.save(vm.credentials).$promise.then(function(data)
			  	{
                   localStorageService.set('token',data[0].token);
					angular.copy({},vm.credentials);
                    $state.go(data.url);
			  	}).catch(function (err) {
                    alert('Usuario o contraseña incorrectos');
                });
        	}
        }
})();