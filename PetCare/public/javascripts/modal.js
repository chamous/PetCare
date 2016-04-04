var modal = angular.module('modal', ['ngAnimate', 'ui.bootstrap']);

modal.controller('messageUserModalController', ['$http', '$scope', '$uibModalInstance', 
    function($http, $scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close($scope.message);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
}]);


modal.controller('reportUserModalController', ['$http', '$scope', '$uibModalInstance', 
    function($http, $scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close($scope.reportMsg);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
}]);


modal.controller('applyModalController', ['$http', '$scope', '$uibModalInstance', 
    function($http, $scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close($scope.applicationMsg);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
}]);


modal.controller('petReviewModalController', ['$http', '$scope', '$uibModalInstance', 'reviews',
    function($http, $scope, $uibModalInstance, reviews) {
        $scope.reviews = reviews;
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.range = function(value) {
            var ratings = [];
            for (var i = 1; i <= value; i++) {
                ratings.push(i)
            }
            return ratings
        };
}]);
