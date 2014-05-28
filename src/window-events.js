/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

function WindowEvents() {}

WindowEvents.prototype = {
  init: function (options) {
    for (var key in options) {
      bindDOMEvent(window, key, options[key]);
    }
  }
};

function bindDOMEvent(element, handler, callback) {
  if (element.addEventListener) {
    element.addEventListener(handler, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + handler, callback);
  }
}

module.exports = WindowEvents;
