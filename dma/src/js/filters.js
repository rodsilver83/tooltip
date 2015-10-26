var movieFilters = angular.module('movieFilters', []);

movieFilters.filter('timeFilter', function () {
  return function (secs) {
    //Calculate the Hours
    var hours = Math.floor(secs / 3600);
    //Calculate remaining minutes
    var mins = Math.floor((secs % 3600) / 60);
    //Return formatted time
    return hours + "hrs " + mins + "mins";
  };
});

movieFilters.filter('reverseFilter', function () {
  return function (reverse) {
    return reverse ? '\u2191' : '\u2193';
  };
});

movieFilters.filter('searchFilter', function () {
  return function (movies, filtersData) {
    var matches = [];
    var title = filtersData[0];
    var orderBy = filtersData[1];
    var reverse = filtersData[2];

    if (!angular.isDefined(movies) || !angular.isDefined(title)) {
      return movies;
    } else {
      //Use Uppercase for CI searchs
      title = title.toUpperCase();
    }

    //Filter by title and add the result in matches
    angular.forEach(movies, function (movie) {
      if (movie.title.toUpperCase().indexOf(title) > -1) {
        matches.push(movie);
      }
    });

    if (angular.isDefined(orderBy)) {
      if (orderBy === "Name") {
        matches.sort(compareTitle);
      }
      if (orderBy === "Date") {
        matches.sort(compareDate);
      }
    }

    if (angular.isDefined(reverse)) {
      if (!reverse) {
        matches.reverse();
      }
    }

    return matches;
  };

  function compareDate(a, b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  function compareTitle(a, b) {
    var atitle = a.title.toUpperCase();
    var btitle = b.title.toUpperCase();
    if (atitle < btitle)
      return -1;
    if (atitle > btitle)
      return 1;
    return 0;
  }


});