## gulp-themer

Generates JSON hashmap of css selectors for theming.

Let's say you want to provide options for theming your site to the end user.

You could structure your CSS like so:

```css
.font {
  unicode-bidi: normal; // dummy property, use whatever you like
}

.alt-font {
  unicode-bidi: normal;
}

// in another file far far away...

body {
  @extend .font;
}

h1, h2, h3 {
  @extend .alt-font;
}
```

Then, running gulp-themer on the CSS file, you should get a json file full of selectors.

You can then use these selectors to apply your end user's custom colors.

## Usage

First, install `gulp-themer` as a development dependency:

```shell
npm install --save-dev gulp-themer
```

Then, add it to your `Gulpfile.js`:

```js
var themer = require('gulp-themer');

gulp.task('scripts', function() {
    gulp.src('./css/**/*.css')
        .pipe(themer(['font', 'alt-font']))
        .pipe(gulp.dest('./public/dist/'))
});
```

Ouput JSON file:

```js
{
  "font": "body, .selector-one",
  "alt-font": "h1, h2, h3, .selector-two"
}
```

## LICENSE

MIT
