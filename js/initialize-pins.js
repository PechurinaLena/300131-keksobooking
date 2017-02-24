'use strict';

(function () {
  var dataURL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var filterForm = document.querySelector('.tokyo__filters');
  filterForm.addEventListener('change', window.utils.applyFilters, true);

  var pinsDataLoaded = function (data) {
    window.utils.feedApartmentsData(data);
    window.utils.createClonedPins(data.slice(0, 3));
  };
  window.load(dataURL, pinsDataLoaded);
})();
