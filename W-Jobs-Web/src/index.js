(function () {

  'use strict';

  angular
      .module('app',['ui.bootstrap', 'ui.router', 'ngCookies','ngResource','pascalprecht.translate',
                     'ngSanitize', 'LocalStorageModule','angular-jwt','contenteditable', 'angularFileUpload',
                     'angular-advanced-searchbox','toastr'])
      .controller('IndexController', ['$scope', '$cookieStore', IndexController]);

  function IndexController($scope, $cookieStore) {
      /**
       * Sidebar Toggle & Cookie Control
       */
      var mobileView = 992;

      $scope.getWidth = function() {
          return window.innerWidth;
      };

      $scope.$watch($scope.getWidth, function(newValue, oldValue) {
          if (newValue >= mobileView) {
              if (angular.isDefined($cookieStore.get('toggle'))) {
                  $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
              } else {
                  $scope.toggle = true;
              }
          } else {
              $scope.toggle = false;
          }

      });

      $scope.toggleSidebar = function() {
          $scope.toggle = !$scope.toggle;
          $cookieStore.put('toggle', $scope.toggle);
      };

      window.onresize = function() {
          $scope.$apply();
      };
  }
})(); 