(function() {
    'use strict';

    angular
        .module('app.compartir')
        .config(configuracion);
    function configuracion($compileProvider)
    {
    	$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }
})();