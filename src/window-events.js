/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* jshint ignore:start */
(function(define){
/* jshint ignore:end */
define(function (require, exports, module, undefined) {
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
});
/* jshint ignore:start */
})((function(n,w){return typeof define=='function'&&define.amd
?define:typeof module=='object'?function(c){c(require,exports,module);}
:function(c){var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};
})('WindowEvents',this));
/* jshint ignore:end */

