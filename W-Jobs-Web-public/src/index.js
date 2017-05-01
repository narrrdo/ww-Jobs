(function () {

  'use strict';

  angular
      .module('app',['ui.router','ngResource','pascalprecht.translate',
                     'ngSanitize', 'angularFileUpload','toastr','ngMask'])
      .controller('IndexController', [IndexController]);

  function IndexController() {
     
  }
})(); 