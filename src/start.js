/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* jshint ignore:start */
(function(define){
/* jshint ignore:end */
define(function (require, exports, module, undefined) {
  'use strict';

  var RumDiaryJSClient = require('./rum-diary-js-client');
  var Bootstrap = require('./bootstrap');

  module.exports = RumDiaryJSClient;

  var bootstrap = new Bootstrap();
  bootstrap.init();

  if (bootstrap.shouldLoad()) {
    var client = new RumDiaryJSClient();
    client.init({
      tags: bootstrap.getTags(),
      loadUrl: bootstrap.getLoadUrl(),
      unloadUrl: bootstrap.getUnloadUrl()
    });
    module.exports.client = client;
  }
});
/* jshint ignore:start */
})((function(n,w){return typeof define=='function'&&define.amd
?define:typeof module=='object'?function(c){c(require,exports,module);}
:function(c){var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};
})('RumDiaryJSClient',this));
/* jshint ignore:end */

