'use strict';

/**
 * @ngdoc function
 * @name restDemoAppApp.controller:MainCtrl
 * @description
 * # PostsCtrl
 * Controller of the restDemo
 */
angular.module('restDemo')
  .controller('HomeCtrl', function ($scope, selfLink, Users, UserService, SpringDataRestAdapter, $http) {
	
	$scope.$watch(function() { return UserService.current(); }, function(nv,ov) {
		if(nv) {
			var params = { params : { owner : selfLink(nv) } };
			SpringDataRestAdapter.process($http.get('http://localhost:8080/api/todoLists/search/findByOwner', params)).then(function(r) {
				$scope.todoLists = r._embeddedItems;
			});
		}
	}, true);
	  
  });