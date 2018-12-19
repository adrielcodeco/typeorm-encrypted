const path = require('path')
const gulp = require('gulp')
const util = require('gulp-util')
const prompt = require('gulp-prompt')

const tasks = [
  'build',
  'clean-coverage',
  'clean-dist',
  'lint',
  'precommit',
  'test',
  'typecheck'
]

tasks.forEach(task => {
  const taskFile = path.resolve(__dirname, './devops/gulp', task + '.js')
  require(taskFile)
})

gulp.task('select-task', function () {
  return gulp.src('./gulpfile.js').pipe(
    prompt.prompt(
      {
        type: 'checkbox',
        name: 'task',
        message: 'Choose your destiny.',
        choices: tasks
      },
      function (result) {
        // Enforce only one selection.
        if (result.task.length > 1) {
          util.log(util.colors.red('Error: More than one selected task!'))
          return
        }
        // Runs the task selected by the user.
        const selectedTask = result.task[0]
        if (!selectedTask) {
          util.log(util.colors.red('Error: No task selected!'))
          return
        }
        util.log('Running task: ' + util.colors.green(selectedTask))
        gulp.start(selectedTask)
      }
    )
  )
})

gulp.task('default', ['select-task'])
