'use strict';

window.utils = (function () {
  var housingTypeSelect = document.getElementById('housing_type');
  var housingPriceSelect = document.getElementById('housing_price');
  var housingRoomNumber = document.getElementById('housing_room-number');
  var housingGuestsSelect = document.getElementById('housing_guests-number');
  var housingFeatures = document.getElementById('housing_features');
  var similarApartments;
  var filteredApartments;
  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };
  var elementToClone = document.querySelector('#pin-template').content.querySelector('.pin');
  var tokyoPins = document.querySelector('.tokyo__pin-map');
  var activePin = document.querySelector('.pin--active');

  var dialogClickHandler = function (event) {
    if (event.keyCode === KEY_CODE.ENTER || event.keyCode === KEY_CODE.ENTER || event.type === 'click') {
      window.card.close(activePin);
    }
  };

  var pinsClickHandler = function (evt) {
    if (!filteredApartments) {
      filteredApartments = similarApartments;
    }
    if (evt.type === 'keydown') {
      if (evt.keyCode !== KEY_CODE.ENTER) {
        return;
      }
      var pinToFocus = evt.target;
      window.card.callback = function () {
        pinToFocus.focus();
      };
    }

    var target = evt.currentTarget;
    if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
      target.classList.add('pin--active');
      var pinIndex = target.id.slice(3);
      var cardInfo = filteredApartments[pinIndex];
      window.card.show(cardInfo, dialogClickHandler);
      activePin = target;
      return;
    }
  };

  var removeOldPins = function () {
    var oldPins = document.querySelectorAll('.pin');
    Array.prototype.forEach.call(oldPins, function (pin) {
      if (!pin.classList.contains('pin__main')) {
        pin.parentNode.removeChild(pin);
      }
    });
  };

  return {
    createClonedPins: function (data) {
      data.forEach(function (element, j) {
        var newElement = elementToClone.cloneNode(true);
        newElement.id = 'pin' + j;
        newElement.style.top = element.location.y + 'px';
        newElement.style.left = element.location.x + 'px';
        window.fillCard.addPinsImages(newElement, element);
        tokyoPins.appendChild(newElement);
        newElement.addEventListener('click', pinsClickHandler);
        newElement.addEventListener('keydown', pinsClickHandler);
      });
    },

    feedApartmentsData: function (data) {
      similarApartments = data;
    },
    applyFilters: function () {
      var housingTypeValue = housingTypeSelect.value;
      filteredApartments = similarApartments.filter(function (element) {
        return element.offer.type === housingTypeValue || housingTypeValue === 'any';
      });

      var priceValue = housingPriceSelect.value;
      filteredApartments = filteredApartments.filter(function (element) {
        switch (priceValue) {
          case 'low':
            return element.offer.price < 10000;
          case 'middle':
            return element.offer.price >= 10000 && element.offer.price < 50000;
          case 'high':
            return element.offer.price >= 50000;
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
      removeOldPins();
      window.utils.createClonedPins(filteredApartments);
    },
  };
})();
