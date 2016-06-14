'use strict';

/**
 * @ngdoc overview
 * @name restDemoAppApp
 * @description
 * # restDemoAppApp
 *
 * Main module of the application.
 */
angular
  .module('restDemo', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'spring-data-rest',
    'ui.sortable',
    'ui.router'
  ])
  .constant('_', window._)
  .constant('selfLink', function(o) {
	  return o._links.self.href;
  })
  .config(function ($urlRouterProvider, $stateProvider) {
    
	  $stateProvider
	  	.state('app', {
	  		abstract : true,
	  		controller : 'AppCtrl',
	  		templateUrl : 'views/app.html',
	  		resolve : {
	  			Users : function(SpringDataRestAdapter, $http, UserService) {
	  				return SpringDataRestAdapter.process($http.get('http://localhost:8080/api/users')).then(function(r) {
	  					var users = r._embeddedItems;
	  					UserService.current(users.length > 0 ? users[0] : {});
	  					return users;
	  				});
	  			}
	  		}
	  	})
	  	.state('app.home', {
	      url : '/home',
	      controller : 'HomeCtrl',
	      templateUrl : 'views/home.html',
	    });
	  
      
    $urlRouterProvider.otherwise('/home');
	
  })
  .service('UserService', function() {
	  var user = {};
	  this.current = function(u) {
		  if(u) {
			 user = u; 
		  } else {
			 return user;
		  }
	  };
  })
  .controller('AppCtrl', function(Users, $scope, selfLink, UserService) {
	  $scope.selfLink = selfLink;
	  $scope.users = Users;
	  
	  $scope.$watch(function() { return UserService.current(); } , function(nv, ov) {
		  if(nv) {
			  $scope.currentUser = nv;
		  }
	  }, true);
	  
	  $scope.changeUser = function(u) {
		  UserService.current(u);
	  };
  });
