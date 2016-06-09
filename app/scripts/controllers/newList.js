'use strict';

/**
 * @ngdoc function
 * @name restDemoAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the restDemoAppApp
 */
angular.module('restDemo')
  .controller('NewListCtrl', function ($scope, $state, $http, selfLink) {
    
	  
	  $scope.createList = function() {
		  
		  var list = { title : $scope.title, owner : 'http://localhost:8080/api/users/1'};
		  
		  $http.post('http://localhost:8080/api/todoLists', list).then(function(r) {
			  $state.go('list', {url : selfLink(r.data)});
		  });
		  
	  };
	  
	  
  });
