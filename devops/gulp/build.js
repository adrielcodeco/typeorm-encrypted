const path = require('path')
const gulp = require('gulp')
const runSequence = require('run-sequence')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const prettierEslint = require('gulp-prettier-eslint')
const merge = require('merge2')

const tsProject = ts.createProject(require.resolve('../../tsconfig.json'))

gulp.task('ts-build', () => {
  const tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.identityMap())
    .pipe(tsProject())
  return merge([
    tsResult.dts.pipe(gulp.dest(tsProject.config.compilerOptions.outDir)),
    tsResult.js
      .pipe(prettierEslint())
      .pipe(
        sourcemaps.mapSources((sourcePath, file) => {
          const absolute = path.resolve(
            process.cwd(),
            tsProject.config.compilerOptions.outDir,
            sourcePath
          )
          return path.relative(
            path.dirname(absolute.replace('/src', '/dist')),
            absolute
          )
        })
      )
      .pipe(
        sourcemaps.write('.')
      )
      .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
  ])
})

gulp.task('build', function (callback) {
  runSequence('clean-dist', 'clean-coverage', 'ts-build', callback)
})
