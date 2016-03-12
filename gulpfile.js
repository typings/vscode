var gulp = require('gulp');
var tslint = require('gulp-tslint');

gulp.task('lint', function() {
  return gulp.src('src/*')
  .pipe(tslint())
  .pipe(tslint.report('verbose'));
});

gulp.task('default', ['lint']);
