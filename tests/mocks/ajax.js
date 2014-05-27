/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function AjaxMock() {
  EventEmitter.call(this);
}
util.inherits(AjaxMock, EventEmitter);

AjaxMock.prototype.ajax = function ajax(options) {
  this.emit('ajax', options);
};

module.exports = AjaxMock;
