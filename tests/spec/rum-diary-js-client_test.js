/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var RumDiaryJSClient = require('../../src/rum-diary-js-client');
var AjaxMock = require('../mocks/ajax');
var assert = chai.assert;

describe('rum-diary-js-client', function () {
  var client, ajaxMock;

  beforeEach(function () {
    ajaxMock = new AjaxMock();
    client = new RumDiaryJSClient();
    client.init({
      micrajax: ajaxMock
    });
  });

  describe('getLoad', function () {
    it('returns data available on onload', function () {
      var data = client.getLoad();
      assert.ok(data);
    });
  });

  describe('sendLoad', function () {
    it('sends data available on onload to the server', function (done) {
      ajaxMock.on('ajax', function (data) {
        assert.equal(data.url, '/metrics');
        done();
      });

      client.sendLoad();
    });
  });

  describe('getUnload', function () {
    it('returns data available on onunload', function () {
      var data = client.getUnload();
      assert.ok(data);
    });
  });

  describe('sendUnload', function () {
    it('sends events/timers to the server', function (done) {
      ajaxMock.on('ajax', function (data) {
        assert.equal(data.url, '/metrics');
        done();
      });

      client.sendUnload();
    });
  });

  describe('logEvent', function () {
    it('adds an event to the event stream', function () {
      client.logEvent('my-event');

      var events = client.getUnload().events;
      assert.equal(events[0].type, 'my-event');
    });
  });

  describe('startTimer/stopTimer', function () {
    it('adds timer to the event stream', function () {
      client.startTimer('my-timer');
      client.stopTimer('my-timer');

      var timers = client.getUnload().timers;
      assert.ok(timers['my-timer'].length);
    });
  });

});
