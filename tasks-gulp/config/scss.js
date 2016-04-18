/**
 * Compiles SCSS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/style.scss` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 */
module.exports = function(gulp, plugins, growl) {

	gulp.task('scss:dev', function() {
		return gulp.src('assets/styles/style.scss')
				.pipe(plugins.sass())
				.pipe(gulp.dest('.tmp/public/styles/'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'scss dev task complete' })));
	});
};
