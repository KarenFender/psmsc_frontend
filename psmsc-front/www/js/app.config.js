(function(){
	'use strict';
	angular.module('app').config(appConfig)


	function appConfig(RestangularProvider,localBase){
		RestangularProvider.setBaseUrl(localBase);
	}
})();

