'use strict';

describe('MovieApp', function() {

  it('/ should redirect to index.html#/movies', function() {
    browser.get('dma/index.html');
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toEqual('/movies');
    });
  });

  describe('Movie list view', function() {
    beforeEach(function () {
      browser.get('dma/index.html#/movies');
    });
  });

});
