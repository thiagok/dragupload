var gulp = require('gulp');
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');

var sassFiles = 'assets/styles/sass/**/*.sass',
    cssDest   = 'assets/styles/css/';

gulp.task('styles', function () {
  return sass(sassFiles, {
    style: 'compressed'
  })
  .pipe(gulp.dest(cssDest));
});

gulp.task('watch',function() {
  gulp.watch(sassFiles,['styles']);
});
