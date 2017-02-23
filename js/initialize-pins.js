'use strict';

(function () {
  var dataURL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var dialog = document.querySelector('.dialog');
  var filterForm = document.querySelector('.tokyo__filters');

  dialog.style.display = 'none';
  filterForm.addEventListener('change', window.utils.applyFilters, true);

  var pinsDataLoaded = function (data) {
    window.utils.feedApartmentsData(data);
    window.utils.applyFilters();
  };
  window.load(dataURL, pinsDataLoaded);
})();
