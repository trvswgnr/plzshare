'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create();

// process javascript
gulp.task('js', function () {
  return gulp.src('./taw_social_sharing.js')
    .pipe($.uglify())
    .pipe($.rename('taw_social_sharing.min.js'))
    .pipe(gulp.dest('.'))
});

// watch for changes
gulp.task('watch', function () {
  gulp.watch('./taw_social_sharing.js', ['js']);
});
