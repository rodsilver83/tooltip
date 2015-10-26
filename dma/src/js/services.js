var phonecatServices = angular.module('moviesServices', ['ngResource']);

phonecatServices.factory('Movies', ['$resource',
  function($resource){
    return $resource('movies/:movieId.json', {}, {
      query: {method:'GET', params:{movieId:'movies'}, isArray:true}
    });
  }]);