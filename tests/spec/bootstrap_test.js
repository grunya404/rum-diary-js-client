/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var Bootstrap = require('../../src/bootstrap');
var assert = chai.assert;

describe('bootstrap', function () {
  var bootstrap, script;

  beforeEach(function () {
    script = document.createElement('script');
    bootstrap = new Bootstrap();
    bootstrap.init({ script: script });
  });

  afterEach(function () {
    bootstrap = script = null;
  });

  describe('shouldLoad', function () {
    it('returns true if the script has no `data-autoinit` attribute', function () {
      assert.isTrue(bootstrap.shouldLoad());
    });

    it('returns true if the `data-autoinit` attribute is empty', function () {
      script.setAttribute('data-autoinit', '');
      assert.isTrue(bootstrap.shouldLoad());
    });

    it('returns true if the `data-autoinit` attribute is anything but false', function () {
      script.setAttribute('data-autoinit', 'true');
      assert.isTrue(bootstrap.shouldLoad());

      script.setAttribute('data-autoinit', '1');
      assert.isTrue(bootstrap.shouldLoad());

      script.setAttribute('data-autoinit', '0');
      assert.isTrue(bootstrap.shouldLoad());
    });

    it('returns false if the `data-autoinit` attribute is `false`', function () {
      script.setAttribute('data-autoinit', 'false');
      assert.isFalse(bootstrap.shouldLoad());
    });
  });

  describe('getTags', function () {
    it('returns an empty array if no `data-tags` attribute', function () {
      assert.deepEqual(bootstrap.getTags(), []);
    });

    it('returns an empty array if an empty `data-tags` attribute', function () {
      script.setAttribute('data-tags', '');
      assert.deepEqual(bootstrap.getTags(), []);
    });

    it('returns an array of tags, split by `,`', function () {
      script.setAttribute('data-tags', 'tag1, tag2');
      assert.deepEqual(bootstrap.getTags(), ['tag1', 'tag2']);
    });
  });

  describe('getLoadurl', function () {
    it('returns `/metrics` if `data-load_url` not specified', function () {
      assert.equal(bootstrap.getLoadUrl(), '/metrics');
    });

    it('returns `/metrics` if `data-load_url` empty', function () {
      script.setAttribute('data-load_url', '');
      assert.equal(bootstrap.getLoadUrl(), '/metrics');
    });

    it('returns value of `data-load_url` otherwise', function () {
      script.setAttribute('data-load_url', '/load');
      assert.equal(bootstrap.getLoadUrl(), '/load');
    });
  });

  describe('getUnloadurl', function () {
    it('returns `/metrics` if `data-unload_url` not specified', function () {
      assert.equal(bootstrap.getUnloadUrl(), '/metrics');
    });

    it('returns `/metrics` if `data-unload_url` empty', function () {
      script.setAttribute('data-unload_url', '');
      assert.equal(bootstrap.getUnloadUrl(), '/metrics');
    });

    it('returns value of `data-unload_url` otherwise', function () {
      script.setAttribute('data-unload_url', '/unload');
      assert.equal(bootstrap.getUnloadUrl(), '/unload');
    });
  });
});
