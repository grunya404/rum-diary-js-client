/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* jshint ignore:start */
(function(define){
/* jshint ignore:end */
define(function (require, exports, module, undefined) {
  'use strict';

  function bind(toBind, context) {
    return function () {
      return toBind.apply(context, arguments);
    };
  }

  var Micrajax = require('../bower_components/micrajax/src/micrajax');
  var SpeedTrap = require('../bower_components/speed-trap/src/speed-trap');
  var WindowEvents = require('./window-events');

  function RumDiaryJSClient() {
    // nothing to do here.
  }

  RumDiaryJSClient.prototype = {
    init: function (options) {
      options = options || {};
      var self = this;

      self.server = options.server || '';
      self.loadEndpoint = options.loadEndpoint || '/metrics';
      self.unloadEndpoint = options.unloadEndpoint || '/metrics';

      self.micrajax = options.micrajax || Micrajax;

      self.windowEvents = options.windowEvents || new WindowEvents();
      self.windowEvents.init({
        load: bind(self.onLoad, self),
        unload: bind(self.onUnload, self)
      });

      self.speedTrap = options.speedTrap || SpeedTrap;
      self.speedTrap.init({
        tags: options.tags || []
      });

    },

    getLoad: function () {
      return this.speedTrap.getLoad();
    },

    onLoad: function () {
      var self = this;
      // use a set timeout to not interfere with loading and allow
      // navigationTiming metrics to become available.
      setTimeout(function () {
        var data = self.speedTrap.getLoad();
        self._sendData(data, self.loadEndpoint, false);
      }, 100);
    },

    getUnload: function () {
      return this.speedTrap.getUnload();
    },

    onUnload: function () {
      var self = this;
      var data = self.speedTrap.getUnload();
      self._sendData(data, self.unloadEndpoint, true);
    },

    logEvent: function (eventName) {
      this.speedTrap.events.capture(eventName);
    },

    startTimer: function (timerName) {
      this.speedTrap.timers.start(timerName);
    },

    stopTimer: function (timerName) {
      this.speedTrap.timers.stop(timerName);
    },

    _sendData: function (data, endpoint, sync) {
      var self = this;
      var url = self.server + endpoint;
      /*
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, JSON.stringify(data));
      } else {
        */
        self.micrajax.ajax({
          async: !sync,
          // put to update the data.
          type: 'POST',
          url: url,
          contentType: 'application/json',
          data: data
        });
      /*}*/
    }
  };


  function getScriptElement() {
    var scripts = document.scripts;

    for (var i = 0; i < scripts.length; ++i) {
      var script = scripts[i];
      if (script.src === '/include.js') {
        return script;
      }
    }
  }

  function getScriptTags() {
    var script = getScriptElement();
    if (! script) return [];

    var tagsAttribute = script.getAttribute('data-tags') || '';
    return tagsAttribute.split(',');
  }

  function shouldLoad() {
    var script = getScriptElement();
    if (! script) return false;

    var attr = script.getAttribute('data-noinit');
    return attr !== null && typeof attr !== 'undefined';
  }

  if (shouldLoad()) {
    var client = new RumDiaryJSClient();
    client.init({
      tags: getScriptTags()
    });
  }

  module.exports = RumDiaryJSClient;
});
/* jshint ignore:start */
})((function(n,w){return typeof define=='function'&&define.amd
?define:typeof module=='object'?function(c){c(require,exports,module);}
:function(c){var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};
})('RumDiaryJSClient',this));
/* jshint ignore:end */

