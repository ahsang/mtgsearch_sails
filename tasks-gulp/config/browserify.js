/**
 * Compiles angular to one js file.
 */
var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function(gulp, plugins, growl) {

    gulp.task('browserify', function() {
        return browserify('./assets/js/main.js')
            .bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./.tmp/public/js/'))
            .pipe(plugins.if(growl, plugins.notify({ message: 'browserify dev task complete' })));
    });
};
