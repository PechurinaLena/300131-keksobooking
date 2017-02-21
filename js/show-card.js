'use strict';

window.card = (function () {
  var dialogClose = document.querySelector('.dialog__close');
  // var dialog = document.querySelectorAll('.dialog');
  var tokyo = document.querySelector('.tokyo');
  // находим темплейт
  return {
    // show: function (mapElement, dialogElement) {
    //   dialogElement.style.display = 'block';
    //   dialogClose.focus();
    // },
    show: function (cardInfo) {
      var dialogTemplate = document.querySelector('#dialog-template');
      var dialogToClone = dialogTemplate.content.querySelector('.dialog');
      var newDialog = dialogToClone.cloneNode(true);

      var lodgeTitle = newDialog.querySelector('.lodge__title');
      lodgeTitle.innerText = cardInfo.offer.title;
      var lodgeAdress = newDialog.querySelector('.lodge__address');
      lodgeAdress.innerText = cardInfo.offer.address;
      var lodgePrice = newDialog.querySelector('.lodge__price');
      lodgePrice.innerText = cardInfo.offer.price + '₽/ночь';
      var lodgeType = newDialog.querySelector('.lodge__type');
      lodgeType.innerText = cardInfo.offer.type;
      var lodgeDescription = newDialog.querySelector('.lodge__description');
      lodgeDescription.innerText = cardInfo.offer.description;
      var lodgeCheckinTime = newDialog.querySelector('.lodge__checkin-time');
      var textCheckinOut = 'Заезд после ' + cardInfo.offer.checkin + ',' + ' выезд до ' + cardInfo.offer.checkout;
      lodgeCheckinTime.innerText = textCheckinOut;
      var lodgePhotos = newDialog.querySelector('.lodge__photos');
      var lodgeFeatures = newDialog.querySelector('.lodge__features');
      var photosURLs = cardInfo.offer.photos;
      var features = cardInfo.offer.features;
      for (var i = 0; i < photosURLs.length; i++) {
        var newIMG = document.createElement('img');
        newIMG.src = photosURLs[i];
        newIMG.style.width = '52px';
        newIMG.style.height = '52px';

        lodgePhotos.appendChild(newIMG);
      }

      for (var j = 0; j < features.length; j++) {
        var newSpan = document.createElement('span');
        newSpan.classList.add('feature__image');
        newSpan.classList.add('feature__image--' + features[j]);

        lodgeFeatures.appendChild(newSpan);
      }
      tokyo.appendChild(newDialog);
    },
    close: function (dialogElement, activePin) {
      dialogElement.style.display = 'none';
      dialogClose.setAttribute('aria-pressed', 'true');
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


