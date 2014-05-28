/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

function Bootstrap() {
  // nothing to do here.
}

Bootstrap.prototype = {
  init: function (options) {
    options = options || {};
    this.script = options.script || findScriptElement();
  },

  getTags: function () {
    var attrValue = getAttribute(this.script, 'data-tags');
    if (! attrValue) return [];

    var dirtyTags = attrValue.split(',');
    var cleanTags = [];
    for (var i = 0; i < dirtyTags.length; ++i) {
      var tag = trim(dirtyTags[i]);
      if (tag) cleanTags.push(tag);
    }
    return cleanTags;
  },

  shouldLoad: function () {
    var attrValue = getAttribute(this.script, 'data-autoinit');

    if (attrValue === 'false') return false;
    return true;
  },

  getLoadUrl: function () {
    var attrValue = getAttribute(this.script, 'data-load_url');

    if (! attrValue) return '/metrics';
    return attrValue;
  },

  getUnloadUrl: function () {
    var attrValue = getAttribute(this.script, 'data-unload_url');

    if (! attrValue) return '/metrics';
    return attrValue;
  }
};

function findScriptElement() {
  if (document.currentScript) return document.currentScript;

  var scripts = document.scripts;

  for (var i = 0; i < scripts.length; ++i) {
    var script = scripts[i];
    if (script.src.indexOf('rum-diary-js-client.js') > -1) {
      return script;
    }
  }
}

function getAttribute (el, attrName) {
  if (! el) return null;

  var attrValue = el.getAttribute(attrName);

  if (! attrValue) return attrValue;
  return trim(attrValue);
}

function trim (str) {
  return str.replace(/^\s+|\s+$/g, '');
}

module.exports = Bootstrap;
