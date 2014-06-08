'use strict';

angular.module('myApp.routes', ['ngRoute'])

  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home.html',
      controller: 'home'
    });

    $routeProvider.when('/chat', {
      authRequired: true, 
      templateUrl: 'views/chat.html',
      controller: 'chat'
    });

    $routeProvider.when('/account', {
      authRequired: true, // must authenticate before viewing this page
      templateUrl: 'views/account.html',
      controller: 'account'
    });

    $routeProvider.when('/auth', {
      templateUrl: 'views/auth.html',
      controller: 'auth'
    });

    $routeProvider.otherwise({redirectTo: '/home'});
  }]);