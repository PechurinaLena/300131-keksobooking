'use strict';

window.card = (function () {
  var dialogToClone = document.querySelector('#dialog-template').content.querySelector('.dialog');
  var tokyo = document.querySelector('.tokyo');
  return {
    show: function (cardInfo, onDialogClose) {
      var oldDialog = document.querySelector('.dialog');
      if (oldDialog) {
        oldDialog.parentNode.removeChild(oldDialog);
      }
      var newDialog = dialogToClone.cloneNode(true);
      var closeDialog = newDialog.querySelector('.dialog__close');
      closeDialog.addEventListener('click', onDialogClose);
      closeDialog.addEventListener('keydown', onDialogClose);
      window.fillCard.fillTextFields(newDialog, cardInfo); // поменять ссылку на fillCard

      var lodgePhotos = newDialog.querySelector('.lodge__photos');
      window.fillCard.renderImages(lodgePhotos, cardInfo.offer.photos);

      var lodgeFeatures = newDialog.querySelector('.lodge__features');
      window.fillCard.renderFeatures(lodgeFeatures, cardInfo.offer.features);

      window.fillCard.replaceAvatar(newDialog, cardInfo);

      tokyo.appendChild(newDialog);
      closeDialog.focus();
    },
    close: function (activePin) {
      var dialogElement = document.querySelector('.dialog');
      var closeDialog = dialogElement.querySelector('.dialog__close');
      closeDialog.setAttribute('aria-pressed', 'true');
      // closeDialog.removeEventListener('click', onDialogClose);
      // closeDialog.addEventListener('keydown', onDialogClose);
      dialogElement.parentNode.removeChild(dialogElement);
      activePin.classList.remove('pin--active');
      if (typeof this.callback === 'function') {
        this.callback();
      }
    },
    callback: null
  };
})();


