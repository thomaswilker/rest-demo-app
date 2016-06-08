'use strict';

/**
 * @ngdoc function
 * @name restDemoAppApp.controller:MainCtrl
 * @description
 * # PostsCtrl
 * Controller of the restDemo
 */
angular.module('restDemo')
  .controller('PostsCtrl', function ($scope, $q, $http, $resource, SpringDataRestAdapter, _) {
	
	var users = SpringDataRestAdapter.process($http.get('http://localhost:8080/api/users'));
	var posts = SpringDataRestAdapter.process($http.get('http://localhost:8080/api/blogPosts'), ['user']);
	
	console.log('test');
	
	$q.all([posts, users]).then(function(result) {
		$scope.posts = result[0]._embeddedItems;
		$scope.users = result[1]._embeddedItems;
	});
	
	function self(o) {
		return o._links.self.href;
	}
	
	$scope.change = function(post, p) {
		$http.patch(self(post), _.set({}, p, post[p]));
	};
	
	$scope.changeLink = function(post, p) {
		$http.patch(self(post), _.set({}, p, self(post[p])));
	};
    
  });
