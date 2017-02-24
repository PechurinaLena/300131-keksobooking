'use strict';

window.utils = (function () {
  var housingTypeSelect = document.getElementById('housing_type');
  var housingPriceSelect = document.getElementById('housing_price');
  var housingRoomNumber = document.getElementById('housing_room-number');
  var housingGuestsSelect = document.getElementById('housing_guests-number');
  var housingFeatures = document.getElementById('housing_features');
  var similarApartments;
  var filteredApartments;
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var elementToClone = document.querySelector('#pin-template').content.querySelector('.pin');
  var tokyoPins = document.querySelector('.tokyo__pin-map');
  var activePin = document.querySelector('.pin--active');

  var dialogClickHandler = function (event) {
    if (event.keyCode === ESCAPE_KEY_CODE || event.keyCode === ENTER_KEY_CODE || event.type === 'click') {
      window.card.close(activePin);
    }
  };

  var pinsClickHandler = function (evt) {
    if (evt.type === 'keydown') {
      if (evt.keyCode !== ENTER_KEY_CODE) {
        return;
      } else {
        var pinToFocus = evt.target;
        window.card.callback = function () {
          pinToFocus.focus();
        };
      }
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
  return {
    createClonedPins: function (data) {
      data.forEach(function (element, j) {
        var newElement = elementToClone.cloneNode(true);
        newElement.id = 'pin' + j;
        newElement.style.top = element.location.y + 'px';
        newElement.style.left = element.location.x + 'px';
        window.utils.addPinsImages(newElement, data[j]);
        tokyoPins.appendChild(newElement);
        newElement.addEventListener('click', pinsClickHandler);
        newElement.addEventListener('keydown', pinsClickHandler);
      });
    },
    createImage: function (src) {
      var newImage = document.createElement('img');
      newImage.src = src;
      newImage.style.width = '52px';
      newImage.style.height = '52px';
      return newImage;
    },
    renderImages: function (parent, data) {
      for (var i = 0; i < data.length; i++) {
        var newIMG = window.utils.createImage(data[i]);
        parent.appendChild(newIMG);
      }
    },
    renderFeatures: function (parent, data) {
      for (var j = 0; j < data.length; j++) {
        var newSpan = window.utils.featuresIcons(data[j]);
        parent.appendChild(newSpan);
      }
    },
    replaceAvatar: function (dialog, cardInfo) {
      var dialogTitle = dialog.querySelector('.dialog__title');
      var dialogAvatar = dialogTitle.querySelector('img');
      dialogAvatar.src = cardInfo.author.avatar;
    },
    featuresIcons: function (featureClass) {
      var newSpan = document.createElement('span');
      newSpan.classList.add('feature__image');
      newSpan.classList.add('feature__image--' + featureClass);
      return newSpan;
    },
    fillTextFields: function (dialog, cardInfo) {
      var lodgeCheckinTime = dialog.querySelector('.lodge__checkin-time');
      var textCheckinOut = 'Заезд после ' + cardInfo.offer.checkin + ',' + ' выезд до ' + cardInfo.offer.checkout;
      lodgeCheckinTime.innerText = textCheckinOut;
      var lodgeRoomsAndGuests = dialog.querySelector('.lodge__rooms-and-guests');
      var textRoomsAndGuests = cardInfo.offer.rooms + ' комнаты для ' + cardInfo.offer.guests + ' гостей';
      lodgeRoomsAndGuests.innerText = textRoomsAndGuests;
      var lodgeDescription = dialog.querySelector('.lodge__description');
      lodgeDescription.innerText = cardInfo.offer.description;
      var lodgeType = dialog.querySelector('.lodge__type');
      lodgeType.innerText = cardInfo.offer.type;
      var lodgePrice = dialog.querySelector('.lodge__price');
      lodgePrice.innerText = cardInfo.offer.price + '₽/ночь';
      var lodgeTitle = dialog.querySelector('.lodge__title');
      lodgeTitle.innerText = cardInfo.offer.title;
      var lodgeAdress = dialog.querySelector('.lodge__address');
      lodgeAdress.innerText = cardInfo.offer.address;
    },
    addPinsImages: function (domElement, dataItem) {
      var images = domElement.querySelector('img');
      var imgSrc = dataItem.author.avatar;
      images.src = imgSrc;
      return images;
    },
    feedApartmentsData: function (data) {
      similarApartments = data;
    },
    removeOldPins: function () {
      var oldPins = document.querySelectorAll('.pin');
      for (var i = 0; i < oldPins.length; i++) {
        if (!oldPins[i].classList.contains('pin__main')) {
          oldPins[i].parentNode.removeChild(oldPins[i]);
        }
      }
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
      for (var i = 0; i < allFeatures.length; i++) {
        var currentFeature = allFeatures[i];
        if (currentFeature.checked) {
          var featureName = currentFeature.value;
          filteredApartments = filteredApartments.filter(function (element) {
            return element.offer.features.indexOf(featureName) >= 0;
          });
        }
      }
      window.utils.removeOldPins();
      window.utils.createClonedPins(filteredApartments);
    },
  };
})();
