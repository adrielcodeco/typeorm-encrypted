const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('precommit', function (callback) {
  runSequence('typecheck', 'build', 'test', callback)
})
