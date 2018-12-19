const gulp = require('gulp')
const run = require('gulp-run-command').default

let command = 'node_modules/.bin/tsc'
command += ' --noEmit'

gulp.task('typecheck', run(command))
