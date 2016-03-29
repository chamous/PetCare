var petsitter_posting = angular.module('petsitter_posting', []);

petsitter_posting.controller('sitterPostingFormController', ['$http', '$location', '$scope', '$cookies', 
	function($http, $location, $scope, $cookies) {

	$scope.createPosting = function (isValid){

		// Check if form information is valid	
	    if (isValid) {

			// Create object to be sent through the POST request
			var dataObj = {
			    user: $cookies.get('userID'),
				title: $scope.title,
				types: $scope.types,
				duration: $scope.duration,
				location: $scope.location,
				price: $scope.price,
				experience: $scope.experience,
				supplies: $scope.supplies,
				number_of_pets: $scope.number_of_pets,
				description: $scope.description,
				thumbnail: '/images/default-profile-pic.png',	// TODO: Get user image
				status: 'open',
			};

			// Make POST request to the /sitterpostings

			$http.post('/api/sitterpostings', {data: dataObj})

				.success(function(data, status, headers, config) {

	    			$location.path(headers()['location']);

				}).error(function(data, status, headers, config) {
	    			
			});

		}

	};

}]);

petsitter_posting.controller('sitterPostingController', ['$http', '$scope', '$routeParams', '$cookies', 'appService',
	function($http, $scope, $routeParams, $cookies, appService) {
	
	$scope.sitterPosting = [];
	$scope.postingID = $routeParams.id;
	$scope.userRating = 0;
	$scope.toPostingID; // posting_id holder for application
	$scope.msg_content = "";
	$scope.userId = $cookies.get('userID');

	$scope.rating = rating;
	$scope.recomm_posts = [];

	if ($cookies.get('posts')) {
		$scope.posts = JSON.parse($cookies.get('posts'));

	    for (var i = 0; i < $scope.posts.length; i++) {
	        if ($scope.posts[i].posting_id != $scope.postingID)
	            $scope.recomm_posts.push($scope.posts[i]);
	    }
	}

	$http.get('/api/sitterpostings/' + $scope.postingID).success(function(data) {

		$scope.sitterPosting = data;

		// If user has a rating, store it
		if ($scope.sitterPosting.user) {
			if ($scope.sitterPosting.user.rating) {
				$scope.userRating = $scope.sitterPosting.user.rating;
			}
		}
	});

    $scope.showDetailPost = function(postId) {
        $cookies.put('posts', JSON.stringify($scope.posts));
        window.location="/petsitter_posts/" + postId;
    }

   	$scope.setPostingId = function(postId) {
		if (postId == -1) {
			$scope.toPostingID = $scope.postingID;
		} else {
			$scope.toPostingID = postId;
		}
	}

	$scope.apply = function() {
		appService.apply($scope.userId, false, $scope.toPostingID, $scope.msg_content);
        $scope.msg_content = "";
	};
}]);