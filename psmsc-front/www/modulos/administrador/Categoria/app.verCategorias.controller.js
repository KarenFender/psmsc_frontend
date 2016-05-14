(function() {
    'use strict';

    angular
        .module('app.administrador')
        .controller('verCategoriasCtrl', verCategorias);

    verCategorias.$inject = ['$http','localStorageService','agregarCatFry','$state','agregarSubcatFry','mostrarSubcategoriaFry'];

    /* @ngInject */
    function verCategorias($http,localStorageService,agregarCatFry,$state,agregarSubcatFry,mostrarSubcategoriaFry) {
        var vm = this;
        activate();
        vm.categorias={
            nombre:'',
            id:''
        };
        vm.settings={
            title:'Categorias'
        };
        //Bandera para activar el input para editar una categoria
        vm.flag = false;
        vm.flag2 = false;
        //ID de la categoría a editar
        vm.idCategoria='';
        //Componente para editar la categoria (input)
        vm.categoria= {
            nombre:''
        };
        //Función para editar la categoria
        vm.editar = editarCategoria;
        //función para colocar los datos
        vm.set = colocar;
        vm.eliminar = eliminar;
        vm.agregarCat = agregarCat;
        vm.agregarSubcat = agregarSubcat;
        vm.colocarsub = colocarsub;
        vm.mostrarSubcategoria = mostrarSubcategoria;
        //vm.editarSubcategoria = editarSubcategoria

        vm.subcat = null;

        vm.subcategoria= {
                nombre: '',
                categoria_id:''
            };

        vm.subcategorias;

        /*
         * Proceso de recuperación de las categorias
         * */
        function activate()
        {
            $http.defaults.headers.post.Authorization =  "bearer "+ localStorageService.get('token');
            agregarCatFry.get().$promise.then(function(data){
                console.log(data);
                vm.categorias=data.categoria;
            },function(err){
                console.log("error desde server"+err);
            });
        }

        
        function editarCategoria(idCategoria)
        {
            console.log("id de la categoria: "+idCategoria);
            agregarCatFry.update({id:vm.idCategoria}, vm.categoria).$promise.then(function (data) {
                vm.categoria = data;
                console.log("Categoria "+vm.categoria.nombre+" editada");
                vm.settings.success = 'Categoria Editada correctamente';
                vm.flag = false;
                activate();
            },function(err){
                console.log("Error des desde el servidor: "+err);
            });
        }
        
        function colocar(categoria)
        {
            vm.flag=true;
            vm.flag2= false;
            vm.categoria = categoria;
            vm.idCategoria = categoria.id;
            console.log('ID de la categoria: '+vm.idCategoria);
        }

         function eliminar(idCategoria)
        {
            console.log("id de la categoria: "+idCategoria);
            agregarCatFry.delete({id:idCategoria}).$promise.then(function (data){
                console.log(data.msg);
                vm.settings.success = data.msg;
                activate();
            }, function(err){
                console.log("Error desde el servidor: "+err);
            });
        }

        function agregarCat()
        {
            $state.go('agregarCat');
        }

        function agregarSubcat()
        {
             agregarSubcatFry.save(vm.subcategoria).$promise.then(function (data){
                console.log(data);
                //vm.subcat = data;
                 vm.flag2 = false;
                activate();
            }, function(err){
                console.log("Error desde el servidor: "+err);
            });
        }

        function  colocarsub(categoriaId)
        {
            vm.flag2 = true;
            vm.flag = false;
            vm.subcategoria.categoria_id = categoriaId;
            console.log("El Id de la categoria a a que pertenece será: "+vm.subcategoria.categoria_id);
        }

        function mostrarSubcategoria(categoriaId)
        {
            vm.subcategoria.categoria_id=categoriaId;
            console.log("El id de la Categoria a la que pertenecen las subcategorias es: "+vm.subcategoria.categoria_id);
            mostrarSubcategoriaFry.save(vm.subcategoria).$promise.then(function(data){
                console.log("Subcastegorias :"+data.subcategoria);
                vm.subcategorias=data.subcategoria;
            },function(err){
                console.log("error desde server"+err);
            });
        }

        /*function editarSubcategoria()
        {
            console.log("id de la subcategoria: "+idCategoria);
            agregarCatFry.update({id:vm.idCategoria}, vm.categoria).$promise.then(function (data) {
                vm.categoria = data;
                console.log("Categoria "+vm.categoria.nombre+" editada");
                vm.settings.success = 'Categoria Editada correctamente';
                vm.flag = false;
                activate();
            },function(err){
                console.log("Error des desde el servidor: "+err);
            });
        }*/


            

           
            
        

    }
})();