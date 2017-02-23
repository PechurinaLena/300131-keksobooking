'use strict';

window.utils = (function () {
  var housingTypeSelect = document.getElementById('housing_type');
  var housingPriceSelect = document.getElementById('housing_price');
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
      for (var j = 0; j < data.length; j++) {
        var newElement = elementToClone.cloneNode(true);
        newElement.id = 'pin' + j;
        newElement.style.top = data[j].location.y + 'px';
        newElement.style.left = data[j].location.x + 'px';
        window.utils.addPinsImages(newElement, data[j]);
        tokyoPins.appendChild(newElement);
        newElement.addEventListener('click', pinsClickHandler);
        newElement.addEventListener('keydown', pinsClickHandler);
        console.log('пины склонированы');
      }
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
      console.log('similarApartments is', similarApartments);
    },
    removeOldPins: function () {
      var oldPins = document.querySelectorAll('.pin');
      console.log('в OldPins сейчас содержится', oldPins);
      for (var i = 0; i < oldPins.length; i++) {
        if (!oldPins[i].classList.contains('pin__main')) {
          oldPins[i].parentNode.removeChild(oldPins[i]);
          console.log(oldPins[i].parentNode, 'это parentNode');
        }
      }
      console.log('removeOldPins отработали');
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

      window.utils.removeOldPins();
      window.utils.createClonedPins(filteredApartments);
    },
  };
})();
