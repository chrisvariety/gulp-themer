'use strict';

var through = require('through');
var gutil = require('gulp-util');
var path = require('path');
var PluginError = gutil.PluginError;

module.exports = function(selectors) {
  if (!selectors) throw new PluginError('gulp-themer', 'Missing selectors option for gulp-themer');

  var newFiles = [];

  function hashFile(file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-themer', 'Streaming not supported'));

    var contents = file.contents.toString();

    var selectorMap = {};

    selectors.forEach(function(selector) {
      // TODO: use cssp ( https://npmjs.org/package/cssp ) instead of this ghetto regexp?
      // e.g. https://github.com/substack/css-prefix
      var match = contents.match(new RegExp('\\.' + selector + ', (.+?) {'));
      if (match && match[1]) {
        selectorMap[selector] = match[1].trim();
      }
    });

    var ext = path.extname(file.path);
    var newFilename = path.basename(file.path, ext) + '-selectors.json';

    newFiles.push(new gutil.File({
      path: newFilename,
      contents: new Buffer(JSON.stringify(selectorMap))
    }));
  }

  function endStream() {
    newFiles.forEach(function(file) {
      this.emit('data', file);
    }.bind(this));

    this.emit('end');
  }

  return through(hashFile, endStream);
};
