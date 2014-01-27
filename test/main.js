'use strict';
var themer = require('../');
var assert = require('assert');
var path = require('path');
var File = require('gulp-util').File;

require('mocha');

describe('gulp-themer', function() {
  it('should create selectors map', function (done) {
    var stream = themer(['font', 'alt-font', 'madeup']);

    var css = new File({
      path: './test/fixture/file.css',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer('.font, body { color: blue; }, .alt-font, h1, h2, h3 { color: red; }')
    });

    stream.on('data', function (file) {
      assert(file.path, 'file-selectors.json');
      assert(file.contents.toString(), '{"font":"body","alt-font":"h1, h2, h3"}');
      done();
    });

    stream.write(css);
    stream.end();
  });
});
