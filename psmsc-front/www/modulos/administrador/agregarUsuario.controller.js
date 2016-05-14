(function() {
    'use strict';

    angular
        .module('app.administrador')
        .controller('AgregarUsuarioCtrl',Agregar);
	  	Agregar.$inject=['getUser','ionicDatePicker','$cordovaToast'];
	    
	function Agregar(getUser,ionicDatePicker,$cordovaToast)
	{
	  /* jshint validthis: true */
	  var vm = this;

	  vm.settings= {
	  	pageTitle:"Ingresa tus datos:"
	  };

	  vm.user ={
	  			username: "",
	  			password: "",
	  			password_confirmation: "",
	  			email: "",
	  			FechaNac: ""
	  };
	  
	  vm.agregar = sumbit;
	  vm.openDatepicker = abrirDatepicker;

	  //#009688-colorDefault de datepicker

	  function abrirDatepicker()
        {
        	vm.configuracionFecha = {
	        	callback: function(val){
	        		console.log('Valor regresado por datepicker: '+val, new Date(val));
	        		vm.user.FechaNac =  moment(val).format('YYYY-MM-DD');
	        		console.log("Fecha de Nacimiento: "+(vm.user.FechaNac));
	        	},
		      from: new Date(1930, 1, 1), //Optional
		      to: new Date(2005,1 ,1), //Optional
		      inputDate: new Date(1990,0,1),      //Optional
		      mondayFirst: true,       //Optional
		      closeOnSelect: false,       //Optional
		      templateType: 'popup',       //Optional
			  showTodayButton:false
	        };
        	ionicDatePicker.openDatePicker(vm.configuracionFecha);
        }

	  function sumbit()
	  {

	  	getUser.save(vm.user).$promise.then(function(data)
	  	{
	  		
	  		if(data.msg)
	  		{	  			
	  			angular.copy({},vm.user);
	  			vm.settings.success = "Usuario Registrado Correctamente";
	  			console.log("Usuario registrado");
	  			
	  		}
	  	},function(data){
			//var msg='msg';
			if(data.data.msg){
			console.log(data.data.msg);
			//navigator.notification.alert(data.msg,alertDismissed,'Registro','Ok');
			}
			
			if(data.password){
				console.log(data.password);
			}else{
				console.log('otra cosa');
			}
		});
	    console.log("Mensaje exitoso: " + vm.settings.success);
	  }

	}
})();