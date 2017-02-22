'use strict';

window.card = (function () {
  var dialogClose = document.querySelector('.dialog__close');
  var tokyo = document.querySelector('.tokyo');
  return {
    show: function (cardInfo, closeCallback) {
      var dialogTemplate = document.querySelector('#dialog-template');
      var dialogToClone = dialogTemplate.content.querySelector('.dialog');
      var oldDialog = document.querySelector('.dialog');
      if (oldDialog) {
        oldDialog.parentNode.removeChild(oldDialog);
      }
      var newDialog = dialogToClone.cloneNode(true);
      var closeDialog = newDialog.querySelector('.dialog__close');
      closeDialog.addEventListener('click', closeCallback);
      closeDialog.addEventListener('keydown', closeCallback);
      window.utils.fillTextFields(newDialog, cardInfo);
      var photosURLs = cardInfo.offer.photos;
      var lodgePhotos = newDialog.querySelector('.lodge__photos');
      for (var i = 0; i < photosURLs.length; i++) {
        var newIMG = window.utils.createImage(photosURLs[i]);
        lodgePhotos.appendChild(newIMG);
      }
      var lodgeFeatures = newDialog.querySelector('.lodge__features');

      var features = cardInfo.offer.features;
      for (var j = 0; j < features.length; j++) {
        var newSpan = window.utils.featuresIcons(features[j]);
        lodgeFeatures.appendChild(newSpan);
      }

      window.utils.replaceAvatar(newDialog, cardInfo);

      tokyo.appendChild(newDialog);
    },
    close: function (dialogElement, activePin) {
      console.log('я выполнился');
      dialogElement.style.display = 'none';
      console.log(dialogElement, 'dialogElement is');
      dialogClose.setAttribute('aria-pressed', 'true');
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


