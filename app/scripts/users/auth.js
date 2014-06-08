'use strict';

/* Login Controller */

angular.module('myApp.controllers')
   .controller('auth', ['$scope', '$rootScope', 'loginService', '$location', function($scope, $rootScope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;
      $scope.regresponse = {};
      
      $rootScope.loginClick = function() {
        $scope.regresponse.show = false;
        $scope.createMode  =  false;
        $scope.email  =  null;
        $scope.pass  =  null;
      };

      $scope.login = function(provider, cb) {
        $scope.err = null;
        var options = {};
        if (provider==='password'){
          if ( !$scope.email ) {
            $scope.err = 'Please enter an email address';
          }
          else if ( !$scope.pass ) {
            $scope.err = 'Please enter a password';
          }
          else {
            options = {
              email: $scope.email,
              password: $scope.pass,
              rememberMe: true
            };
          }
        }
        else {
          options = {
            rememberMe: true
          };
        }

        if($scope.err===null && angular.isString(provider)){
          loginService.login(provider, options, function(err, user) {
            $scope.err = err? err + '' : null;
            if( !err ) {
              cb && cb(user);
            }
          });
        }
      };

      $scope.socialCb = function(user) {
        $location.path('/home');
      };

      $scope.submit = function() {
        if($scope.createMode === true) {
          $scope.createAccount();
        }else {
          $scope.login('password', function(){
            $location.path('/home');
          });
        }
      };


      $scope.createAccount = function() {
        $scope.err = null;
        if( assertValidLoginAttempt() ) {
          $scope.pass=(Math.floor(Math.random() * Math.pow(16,5)).toString(16));
          loginService.createAccount($scope.email,$scope.pass,function(err, user) {
              if( err ) {
                $scope.err = err? err + '' : null;
              }else {
                // must be logged in before I can write to my profile
                $scope.login('password', function() {
                    loginService.createProfile(user.uid, user.email);
                     
                    loginService.sendPasswordResetEmail(user.email, function(error,success){
                        var message=' send temporary password. ';
                        var instruction='';
                        if (!error) {
                          message = 'Success' + message ;
                          instruction = 'Check your email for your password. Don\'t forget to change it!';
                        }else{
                          message = 'Failed' + message;
                          instruction = 'Give a valid email! <a href=\'#/login\'>login</a>';
                        }
                        $scope.regresponse={message:message, instruction:instruction, show:true};
                      });

                    loginService.logout();
                    $location.path('/auth');
                  });
              }
            });
        }
      };

      function assertValidLoginAttempt() {
        if( !$scope.email ) {
          $scope.err = 'Please enter an email address';
        }
        // else if( !$scope.pass ) {
        //    $scope.err = 'Please enter a password';
        // }
        // else if( $scope.pass !== $scope.confirm ) {
        //    $scope.err = 'Passwords do not match';
        // }
        return !$scope.err;
      }
    }]);