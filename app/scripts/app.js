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
    
	  console.log('start');
	  $stateProvider
	  	.state('app', {
	  		url : '/',
	  		abstract : true,
	  		controller : 'AppCtrl',
	  		template: '<ui-view/>',
	  		replace : true
	  	})
	    .state('app.home', {
	      url : '/home',
	      controller : 'HomeCtrl',
	      templateUrl : 'views/home.html',
	    })
	    .state('app.newList', {
	      url : '/newList',
	      controller : 'NewListCtrl',
	      templateUrl : 'views/newList.html',
	    })
	    .state('app.list', {
	      url : '/list/:url',
	      controller : 'ListCtrl',
	      templateUrl : 'views/list.html',
	    });
	  
      
    $urlRouterProvider.otherwise('/home');
	
  })
  .service('UserService', function(SpringDataRestAdapter, $http, $rootScope) {
	  
	  var self = this;
	  var currentUser = null;
	  var users = [];
	  
	  function loadAllUsers() {
		  
		  SpringDataRestAdapter.process($http.get('http://localhost:8080/api/users')).then(function(result) {
			  users = result._embeddedItems;
			  $rootScope.$broadcast('usersLoaded', users);
		  });
	  }
	  
	  this.loadAllUsers = loadAllUsers;
	  this.currentUser = function(user) {
		  
		  if(user) {
			  currentUser = user;
			  $rootScope.$broadcast('currentUserChanged', user);
		  } else {
			  return currentUser;
		  }
		  
	  };	   
	  
  })
  .controller('AppCtrl', function(UserService) {
	  UserService.loadAllUsers();
  })
  .controller('HeaderCtrl', function($scope, $rootScope, UserService) {
	  
	  $scope.$on('usersLoaded', function(event, users) {
		  console.log(users);
	  });
	  
  });
