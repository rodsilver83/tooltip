var moviesControllers = angular.module('moviesControllers', []);

moviesControllers.controller('MovieListCtrl',
  ['$scope', '$filter', '$log', 'Movies',
    function ($scope, $filter, $log, Movies) {
      $scope.movies = Movies.query();

      //Filters
      $scope.orderProp = 'Date';
      $scope.reverse = false;
      $scope.title = '';

      //Pagination
      $scope.itemsPerPage = 5;
      $scope.currentPage = 1;

      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

      $scope.pageChanged = function () {
      };

      //Call on the promise return of service data
      $scope.movies.$promise.then(function (data) {
        //Init data
        $scope.movies = data;
        $scope.totalItems = $scope.movies.length;
        $scope.itemStart = 1;
        $scope.itemEnd = 5;

        $scope.filteredMovies = $scope.movies.slice(0, $scope.itemsPerPage);
        $scope.filteredPagingMovies = $scope.movies.slice(0, $scope.itemsPerPage);

        $scope.$watch('[title,orderProp,reverse,currentPage]',
          function (title, order, reverse, currentPage) {
            //Get filter results
            $scope.filteredMovies = $filter('searchFilter')($scope.movies, title, order, reverse);

            //Slice de page view
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
              end = begin + $scope.itemsPerPage;
            $scope.filteredPagingMovies = $scope.filteredMovies.slice(begin, end);

            //Calculate items and pages from result
            $scope.totalItems = $scope.filteredMovies.length;
            $scope.noOfPages = ($scope.filteredMovies.length / $scope.itemsPerPage) + 1;

            if ($scope.totalItems > $scope.itemsPerPage
              && $scope.currentPage < Math.floor($scope.noOfPages)) {
              $scope.itemEnd = $scope.itemsPerPage * $scope.currentPage;
            } else {
              $scope.itemEnd = $scope.totalItems;
            }

            $scope.itemStart = $scope.itemsPerPage * ($scope.currentPage -1) + 1;

          });

      });

    }]);

moviesControllers.controller("MovieDetailCtrl",
  ['$scope', '$routeParams', '$log', 'Movies',
    function ($scope, $routeParams, $log, Movies) {
      $scope.movie = Movies.get({movieId: $routeParams.movieId});
    }]);
