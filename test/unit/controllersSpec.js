'use strict';

/* jasmine specs for controllers go here */
describe('Movies controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('MovieApp'));

  describe('MovieListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('movies/movies.json').
          respond([{title: 'Toy Story'}, {title: 'Toy Story'}]);

      scope = $rootScope.$new();
      ctrl = $controller('MovieListCtrl', {$scope: scope});
    }));


  });

});
