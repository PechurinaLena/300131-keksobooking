'use strict';

window.load = function (url, onload) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function (evt) {
    var data = JSON.parse(evt.target.response);
    onload(data);
  });
  xhr.send();
};
