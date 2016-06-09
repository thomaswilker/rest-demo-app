'use strict';

/**
 * @ngdoc function
 * @name restDemoAppApp.controller:MainCtrl
 * @description
 * # PostsCtrl
 * Controller of the restDemo
 */
angular.module('restDemo')
  .controller('TodoListCtrl', function ($scope, $q, $http, $resource, SpringDataRestAdapter, _, selfLink) {
	
	var users = SpringDataRestAdapter.process($http.get('http://localhost:8080/api/users'));
	var posts = SpringDataRestAdapter.process($http.get('http://localhost:8080/api/blogPosts'), ['user']);
	
	$q.all([posts, users]).then(function(result) {
		$scope.posts = result[0]._embeddedItems;
		$scope.users = result[1]._embeddedItems;
	});
	
	$scope.change = function(post, p) {
		$http.patch(selfLink(post), _.set({}, p, post[p]));
	};
	
	$scope.changeLink = function(post, p) {
		$http.patch(selfLink(post), _.set({}, p, selfLink(post[p])));
	};
    
  });
