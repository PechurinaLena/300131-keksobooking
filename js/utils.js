'use strict';

window.utils = (function () {
  return {
    createClonedPins: function (elementToClone, dataArray, parent) {
      for (var j = 0; j < dataArray.length; j++) {
        var newElement = elementToClone.cloneNode(true);
        newElement.id = 'pin' + j;
        newElement.style.top = dataArray[j].location.y + 'px';
        newElement.style.left = dataArray[j].location.x + 'px';
        window.utils.addPinsImages(newElement, dataArray[j]);
        parent.appendChild(newElement);
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
    }
  };
})();
