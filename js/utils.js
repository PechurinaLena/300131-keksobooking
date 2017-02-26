'use strict';

window.utils = (function () {
  var housingTypeSelect = document.getElementById('housing_type');
  var housingPriceSelect = document.getElementById('housing_price');
  var housingRoomNumber = document.getElementById('housing_room-number');
  var housingGuestsSelect = document.getElementById('housing_guests-number');
  var housingFeatures = document.getElementById('housing_features');
  var lowPrice = 10000;
  var highPrice = 50000;
  return {
    KEY_CODE: {
      ENTER: 13,
      ESCAPE: 27
    },
    applyFilters: function (similarApartments) {
      var housingTypeValue = housingTypeSelect.value;
      var filteredApartments = similarApartments.filter(function (element) {
        return element.offer.type === housingTypeValue || housingTypeValue === 'any';
      });

      var priceValue = housingPriceSelect.value;
      filteredApartments = filteredApartments.filter(function (element) {
        switch (priceValue) {
          case 'low':
            return element.offer.price < lowPrice;
          case 'middle':
            return element.offer.price >= lowPrice && element.offer.price < highPrice;
          case 'high':
            return element.offer.price >= highPrice;
        }
        return true;
      });

      var roomNumber = housingRoomNumber.value;
      filteredApartments = filteredApartments.filter(function (element) {
        return roomNumber === 'any' || element.offer.rooms.toString() === roomNumber;
      });

      var guestNumber = housingGuestsSelect.value;
      filteredApartments = filteredApartments.filter(function (element) {
        return guestNumber === 'any' || element.offer.guests.toString() === guestNumber;
      });

      var allFeatures = housingFeatures.querySelectorAll('input');
      Array.prototype.forEach.call(allFeatures, function (currentFeature) {
        if (currentFeature.checked) {
          var featureName = currentFeature.value;
          filteredApartments = filteredApartments.filter(function (element) {
            return element.offer.features.indexOf(featureName) >= 0;
          });
        }
      });
      return filteredApartments;
    },
  };
})();
