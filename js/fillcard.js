'use strict';

window.fillCard = (function () {

  var createImage = function (src) {
    var newImage = document.createElement('img');
    newImage.src = src;
    newImage.style.width = '52px';
    newImage.style.height = '52px';
    return newImage;
  };

  var createFeatureIcon = function (featureClass) {
    var newSpan = document.createElement('span');
    newSpan.classList.add('feature__image');
    newSpan.classList.add('feature__image--' + featureClass);
    return newSpan;
  };

  return {
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
    renderImages: function (parent, data) {
      data.forEach(function (item) {
        var newIMG = createImage(item);
        parent.appendChild(newIMG);
      });
    },
    renderFeatures: function (parent, data) {
      data.forEach(function (item) {
        var newSpan = createFeatureIcon(item);
        parent.appendChild(newSpan);
      });
    },
    replaceAvatar: function (dialog, cardInfo) {
      var dialogTitle = dialog.querySelector('.dialog__title');
      var dialogAvatar = dialogTitle.querySelector('img');
      dialogAvatar.src = cardInfo.author.avatar;
    },
    addPinsImages: function (domElement, dataItem) {
      var images = domElement.querySelector('img');
      var imgSrc = dataItem.author.avatar;
      images.src = imgSrc;
      return images;
    }
  };
})();
