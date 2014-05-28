/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.config('mocha', {
    src: ['tests/**/*.html'],
    options: {
      run: true
    }
  });

  grunt.config('watch', {
    scripts: {
      files: [ 'src/*.js', 'tests/mocks/*.js', 'tests/lib/*.js', 'tests/spec/*.js' ],
      tasks: [ 'browserify', 'mocha' ]
    }
  });

  grunt.config('browserify', {
    dist: {
      files: {
        'dist/rum-diary-js-client.js': ['src/start.js']
      }
    },
    test: {
      files: {
        'tests/tests.js': ['tests/spec/all_tests.js']
      },
      options: {
        bundleOptions: {
          debug: true
        }
      }
    }
  });
};
