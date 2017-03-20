'use strict';

(function () {
  var dataURL = 'http://t1r1.ru/portfolio/keksobooking/data/data.json';
  var filterForm = document.querySelector('.tokyo__filters');
  var pinToClone = document.querySelector('#pin-template').content.querySelector('.pin');
  var tokyoPins = document.querySelector('.tokyo__pin-map');
  var activePin = document.querySelector('.pin--active');
  var similarApartments;
  var filteredApartments;

  var onFilterChanged = function () {
    filteredApartments = window.utils.applyFilters(similarApartments);
    removeOldPins();
    createClonedPins(filteredApartments);
  };


  var dialogClickHandler = function (event) {
    if (event.keyCode === window.utils.KEY_CODE.ENTER || event.keyCode === window.utils.KEY_CODE.ESCAPE || event.type === 'click') {
      window.card.close(activePin);
    }
  };

  var pinsClickHandler = function (evt) {
    if (!filteredApartments) {
      filteredApartments = similarApartments;
    }
    if (evt.type === 'keydown') {
      if (evt.keyCode !== window.utils.KEY_CODE.ENTER) {
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


  var createClonedPins = function (data) {
    data.forEach(function (element, j) {
      var newElement = pinToClone.cloneNode(true);
      newElement.id = 'pin' + j;
      newElement.style.top = element.location.y + 'px';
      newElement.style.left = element.location.x + 'px';
      window.fillCard.addPinsImages(newElement, element);
      tokyoPins.appendChild(newElement);
      if (j === 0) {
        var innerImage = newElement.querySelector('img');
        innerImage.focus();
      }
      newElement.addEventListener('click', pinsClickHandler);
      newElement.addEventListener('keydown', pinsClickHandler);
    });
  };

  var removeOldPins = function () {
    var oldPins = document.querySelectorAll('.pin');
    Array.prototype.forEach.call(oldPins, function (pin) {
      if (!pin.classList.contains('pin__main')) {
        pin.removeEventListener('click', pinsClickHandler);
        pin.removeEventListener('keydown', pinsClickHandler);
        pin.parentNode.removeChild(pin);
      }
    });
  };

  var pinsDataLoaded = function (data) {
    similarApartments = data;
    createClonedPins(data.slice(0, 3));
  };
  filterForm.addEventListener('change', onFilterChanged, true);
  window.load(dataURL, pinsDataLoaded);
})();
