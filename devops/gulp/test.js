const gulp = require('gulp')
const jest = require('gulp-jest').default

gulp.task('test', () => gulp.src('test').pipe(jest()))
