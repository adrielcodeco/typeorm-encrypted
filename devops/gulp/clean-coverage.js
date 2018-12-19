const gulp = require('gulp')
const clean = require('gulp-clean')

gulp.task('clean-coverage', function () {
  return gulp.src('coverage/*', { read: false }).pipe(clean())
})
