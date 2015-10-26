var movieApp = angular.module('movieApp', [
  'ngRoute',
  'moviesControllers',
  'moviesServices',
  'movieFilters',
  'ngAnimate',
  'ui.bootstrap',
  'pascalprecht.translate'
]);

movieApp.config(['$routeProvider','$translateProvider',
  function($routeProvider,$translateProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'templates/movie-list.html',
        controller: 'MovieListCtrl'
      }).
      when('/movies/:movieId', {
        templateUrl: 'templates/movie-detail.html',
        controller: 'MovieDetailCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });

    $translateProvider.translations('en', {
      'TITLE': 'Hello',
      'FOO': 'This is a paragraph'
    });

    $translateProvider.translations('de', {
      'TITLE': 'Hallo',
      'FOO': 'Dies ist ein Absatz'
    });

    $translateProvider.preferredLanguage('en');
  }]);