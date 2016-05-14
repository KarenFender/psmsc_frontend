(function() {
    'use strict';

    angular
        .module('app.compartir')
        .controller('CompartirCtrl', comparte);

    /* @ngInject */
    comparte.$inject = ['$scope',
						'$ionicLoading',
						'Camera',
						'Upload',
						'$timeout',
						'ionicDatePicker',
						'$http',
						'localStorageService',
						'$location'
	];
	
	function comparte($scope,$ionicLoading,Camera,Upload,$timeout,ionicDatePicker,$http,localStorageService,$location)
	{
		activate();
    	//Proceso para meter datos del producto a la base
    	var vm = this;
        vm.settings = {
        	pageTitle: 'Ingresa los datos del Producto'
        };
        vm.producto= {
        	nombre: 'ProductoActualizado',
        	precio: '',
        	inicioOferta: '',
        	finOferta: '',
        	detallesUbicacion: '',
			latitud: '',
			longitud:''
        };
		vm.f= null;
		vm.errFile= null;
		vm.picPhoto = null;
		
		//Funciones
		vm.tomarFoto = tomaFoto;
		vm.uploadPic = upload;
		vm.openDateInicio = abrirDatepicker;
		vm.openDateFin = abrirDatepicker2;
		vm.takePhoto = takePhoto;
		vm.capturePhoto = capturePhoto;
		vm.atras = atras;

		function atras() {
			$location.path('/sesion');
		}

		function activate()
		{
			$http.defaults.headers.post.Authorization =  "bearer "+ localStorageService.get('token');
			console.log("ControladorCompartir...");
			console.log("Token: "+ localStorageService.get('token') );
		}

		function abrirDatepicker()
		{
			vm.configuracionFecha = {
				callback: function(val){
					console.log('Valor regresado por datepicker: '+val, new Date(val));
					vm.producto.inicioOferta =   moment(val).format('YYYY-MM-DD');
					console.log("Inicio Oferta: "+vm.producto.inicioOferta);
				},
				from: new Date(2016,1 ,1), //Optional
				to: new Date(2018,1 ,1), //Optional
				inputDate: new Date(),      //Optional
				mondayFirst: true,       //Optional
				closeOnSelect: false,       //Optional
				templateType: 'popup'       //Optional
			};
			ionicDatePicker.openDatePicker(vm.configuracionFecha);
		}

		function abrirDatepicker2()
		{
			vm.configuracionFecha = {
				callback: function(val){
					console.log('Valor regresado por datepicker: '+val, new Date(val));
					vm.producto.finOferta =   moment(val).format('YYYY-MM-DD');
					console.log("Inicio Oferta: "+vm.producto.finOferta);
				},
				from: vm.producto.inicioOferta, //Optional
				to: new Date(2018,1 ,1), //Optional
				inputDate: new Date(),      //Optional
				mondayFirst: true,       //Optional
				closeOnSelect: false,       //Optional
				templateType: 'popup'       //Optional
			};
			ionicDatePicker.openDatePicker(vm.configuracionFecha);
		}


		 function upload(file)
		 {
			 vm.f = file;
			 //vm.errFile = errFiles && errFiles[0];
			 if(file) {
				 alert("There is an Object!!");
				 if(!(Upload.isFile(file)))
				 {
					 var blob = dataURItoBlob(file);
					 file = new File([blob],'nuevaFotografia.jpeg');
					 alert("Imagen Convertida");
				 }
				 file.upload = Upload.upload({
					 method: 'POST',
					 url: //'http://novaera-projects.org/psmsc_backend/api/crearPublicacion',
					 'http://localhost/backend/public/api/crearPublicacion',
					 data: {
						 'file': file,
						 'nombre': vm.producto.nombre,
						 'precio': vm.producto.precio,
						 'inicioOferta': vm.producto.inicioOferta,
						 'finOferta': vm.producto.finOferta,
						 'detallesUbicacion': vm.producto.detallesUbicacion,
						 'latitud': vm.producto.latitud,
						 'longitud': vm.producto.longitud
					 }
				 });
				 file.upload.then(function (response) {
					 angular.copy({},vm.producto);
					 //console.log(response);
					 vm.settings.success = "Publicación Generada correctamente";
					 alert("Publicación compartida");
					 file = null;
				 }, function (response) {
					 if (response.status > 0)
						 $scope.errorMsg = response.status + ': ' + response.data;
					 alert("Error en la subida");
				 }, function (evt) {
					 // Math.min is to fix IE which reports 200% sometimes
					 file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				 });

			 }
	     }
	     //Fin de proceso para la conexión con la base

	     function tomaFoto()
	     {
	     	vm.opt = {
	     		quality: 90,
	     		targetWidth: 100,
	     		targetHeight: 100,
	     		saveToPhotoAlbum: false,
				destinationType: destinationType.DATA_URL
	     	};
	     	Camera.getPicture().then(
	     		function onSuccesss(imageData)
	     		{
	     			vm.picPhoto  = document.getElementById('MyImage');
					vm.picPhoto.style.display = 'block';
	     			vm.picPhoto.src = "data:image/jpeg;base64," +  imageData;
	     		},
	     		function onFaill(message)
	     		{
	     			alert("Error debido a "+message);
	     		},
	     		vm.opt
	     		);
	     }
//________________________________________________________________________
		/*
		 *Inicio de versión para tomar fotos con navigator URI
		 * Agregado: Función para convertir una DATA_URL a Blob
		 * */

		//Variables para cordovaCamera

		var pictureSource;   //picture source
		var destinationType; //sets the format of returned value

		//Esperamos la conexión de Cordova con el dispositivo
		document.addEventListener("deviceready",onDeviceReady,false);

		//Cordova está listo para usarse
		function onDeviceReady()
		{
			pictureSource = navigator.camera.PictureSourceType;
			destinationType = navigator.camera.DestinationType;
		}

		/*
		* Esta función es llamada para realizar la llamada a la
		* cámara del dispositivo móvil
		* regresa la URI de la imagen (path)
		* */
		function takePhoto()
		{
			navigator.camera.getPicture(onSuccess,onFail,{
					quality:90,
					destinationType: destinationType.FILE_URI,
					sourceType: pictureSource.CAMERA,
					saveToPhotoAlbum: false
				}
			);
		}
		
		function onSuccess(imageURI)
		{
			vm.picPhoto = document.getElementById('MyImage');
			vm.picPhoto.style.display = 'block';
			vm.picPhoto.src =/*"data:image/jpeg;base64,"+*/imageURI;
		}
		function onFail(message)
		{
			alert("Failed because: "+message);
		}

		function dataURItoBlob(dataURI) {
			// convert base64/URLEncoded data component to raw binary data held in a string
			var byteString;
			if (dataURI.split(',')[0].indexOf('base64') >= 0)
				byteString = atob(dataURI.split(',')[1]);
			else
				byteString = unescape(dataURI.split(',')[1]);

			// separate out the mime component
			var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

			// write the bytes of the string to a typed array
			var ia = new Uint8Array(byteString.length);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}

			return new Blob([ia], {type:mimeString});
		}
//________________________________________________________________________

//________________________________________________________________________
		//Con cordova-plugin-media-capture
		vm.capture = null;
		function capturePhoto()
		{
			navigator.device.capture.captureImage(captureSuccess,captureError,{limit:1});
			//alert(vm.capture);
		}
		
		function captureSuccess(mediaFiles) {
			var i,len;
			for(i=0,len=mediaFiles.lenght;i<len;i+=1){
				vm.capture = mediaFiles[i].fullPath;
				//do something interesting w
			}
		}

		function captureError(error){
			navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
		}

//________________________________________________________________________



        $scope.mapCreated = function(map) {
		    $scope.map = map;
		};

		$scope.centerOnMe = function () {
		  console.log("Centering");
		  if (!$scope.map) {
		    return;
		  }

		  $scope.loading = $ionicLoading.show({
		    content: 'Actualizando ubicación...',
		    showBackdrop: false
		  });

		  navigator.geolocation.getCurrentPosition(function (pos) {
		    console.log('Se encontró ubicación', pos);
		    var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
		    $scope.map.setCenter(myLatlng);
		    $scope.loading.hide();
			  vm.producto.latitud = pos.coords.latitude;
			  vm.producto.longitud = pos.coords.longitude;
			  console.log("Latitud: " + vm.producto.latitud + " Longitud: "+vm.producto.longitud);

		    var marker = new google.maps.Marker({
		                  position: myLatlng,
		                  map: $scope.map,
		                  draggable:true
		    })
		  }, function (error) {
		    alert('No se encontró ubicación: ' + error.message);
		  });
		};
    }
})();