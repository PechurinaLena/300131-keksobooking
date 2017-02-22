'use strict';

window.initializePins = (function () {
  var dataURL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var activePin = document.querySelector('.pin--active');
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var similarApartments;
  var dialog = document.querySelector('.dialog');
  dialog.style.display = 'none';

  var pinsDataLoaded = function (data) {
    var tokyoPins = document.querySelector('.tokyo__pin-map');
    similarApartments = data;
    similarApartments.splice(3);
    var templateElement = document.querySelector('#pin-template');
    var elementToClone = templateElement.content.querySelector('.pin');

    for (var j = 0; j < similarApartments.length; j++) {
      var newElement = elementToClone.cloneNode(true);
      newElement.id = 'pin' + j;
      newElement.style.top = similarApartments[j].location.y + 'px';
      newElement.style.left = similarApartments[j].location.x + 'px';
      window.utils.addPinsImages(newElement, similarApartments[j]);
      tokyoPins.appendChild(newElement);
    }
  };
  window.load(dataURL, pinsDataLoaded);


  return function (mapElement) {
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
          console.log(pinToFocus);
          window.card.callback = function () {
            pinToFocus.focus();
            console.log('pintofocus выполнился');
          };
        }
      }

      var target = evt.target;
      while (target !== evt.currentTarget) {
        if (target) {
          if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
            if (activePin) {
              activePin.classList.remove('pin--active');
            }
            target.classList.add('pin--active');
            var pinIndex = target.id.slice(3);
            var cardInfo = similarApartments[pinIndex];
            window.card.show(cardInfo, dialogClickHandler);
            activePin = target;
            return;
          }
          target = target.parentNode;
        }
      }
    };

    mapElement.addEventListener('click', pinsClickHandler, true);
    mapElement.addEventListener('keydown', pinsClickHandler, true);
    // dialogElement.addEventListener('click', dialogClickHandler);
    // console.log(dialogElement, 'dialogElement');
    // dialogElement.addEventListener('keydown', dialogClickHandler);
  };
})();
