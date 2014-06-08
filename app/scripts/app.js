'use strict';

angular
  .module('myApp', [
    'myApp.controllers',
    'myApp.services',
    'myApp.config',
    'myApp.routes',
    'myApp.directives',
    'myApp.filters',
    'simpleLoginTools',
    'routeSecurity',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])

  .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
        // double-check that the app has been configured
        angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
        setTimeout(function() {
          angular.element(document.body).removeClass('hide');
        }, 250);
      }
      else {
        // establish authentication
        $rootScope.auth = loginService.init('/login');
        $rootScope.FBURL = FBURL;
      }
    }]);
