'use strict';

window.initializePins = (function () {
  var dataURL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var activePin = document.querySelector('.pin--active');
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;


  var pinsDataLoaded = function (data) {
    var tokyoPins = document.querySelector('.tokyo__pin-map');
    var similarApartments = data;
    similarApartments.splice(3, similarApartments.length - 3);
    var templateElement = document.querySelector('#pin-template');
    var elementToClone = templateElement.content.querySelector('.pin');

    for (var j = 0; j < similarApartments.length; j++) {
      var newElement = elementToClone.cloneNode(true);
      newElement.style.top = similarApartments[j].location.y + 'px';
      newElement.style.left = similarApartments[j].location.x + 'px';
      var images = newElement.querySelector('img');
      var imgSrc = similarApartments[j].author.avatar.toString();
      images.src = imgSrc;
      tokyoPins.appendChild(newElement);
    }
  };
  window.load(dataURL, pinsDataLoaded);

  return function (mapElement, dialogElement) {

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

      var target = evt.target;
      while (target !== evt.currentTarget) {
        if (target) {
          if (target.classList.contains('pin')) {
            if (activePin) {
              activePin.classList.remove('pin--active');
            }
            target.classList.add('pin--active');
            window.card.show(mapElement, dialogElement);
            activePin = target;
            return;
          }
          target = target.parentNode;
        }
      }
    };

    mapElement.addEventListener('click', pinsClickHandler, true);
    mapElement.addEventListener('keydown', pinsClickHandler, true);
    var dialogClickHandler = function (event) {
      if (event.keyCode === ESCAPE_KEY_CODE || event.keyCode === ENTER_KEY_CODE || event.type === 'click') {
        window.card.close(dialogElement, activePin);
      }
    };
    dialogElement.addEventListener('click', dialogClickHandler);
    dialogElement.addEventListener('keydown', dialogClickHandler);
  };
})();
