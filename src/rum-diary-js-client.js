/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

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

    self.loadUrl = options.loadUrl || '/metrics';
    self.unloadUrl = options.unloadUrl || '/metrics';

    self.micrajax = options.micrajax || Micrajax;

    self.windowEvents = options.windowEvents || new WindowEvents();
    self.windowEvents.init({
      load: bind(onLoad, self),
      unload: bind(onUnload, self)
    });

    self.speedTrap = options.speedTrap || SpeedTrap;
    self.speedTrap.init({
      tags: options.tags || []
    });
  },

  getLoad: function () {
    return this.speedTrap.getLoad();
  },

  sendLoad: function () {
    var data = this.speedTrap.getLoad();
    sendData.call(this, data, this.loadUrl, false);
  },

  getUnload: function () {
    return this.speedTrap.getUnload();
  },

  sendUnload: function () {
    var data = this.speedTrap.getUnload();
    sendData.call(this, data, this.unloadUrl, true);
  },

  logEvent: function (eventName) {
    this.speedTrap.events.capture(eventName);
  },

  startTimer: function (timerName) {
    this.speedTrap.timers.start(timerName);
  },

  stopTimer: function (timerName) {
    this.speedTrap.timers.stop(timerName);
  }
};

function onLoad () {
  var self = this;
  // use a set timeout to not interfere with loading and allow
  // navigationTiming metrics to become available.
  setTimeout(function () {
    self.sendLoad();
  }, 100);
}

function onUnload () {
  this.sendUnload();
}

function sendData (data, url, sync) {
  var self = this;
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

function bind(toBind, context) {
  return function () {
    return toBind.apply(context, arguments);
  };
}

module.exports = RumDiaryJSClient;

