'use strict';

/* Home Controller */

angular.module('myApp.controllers')

  .controller('home', ['$scope', 'syncData', function($scope, syncData) {
    syncData('syncedValue').$bind($scope, 'syncedValue');
	}]);