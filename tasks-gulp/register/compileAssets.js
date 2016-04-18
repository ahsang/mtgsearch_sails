module.exports = function (gulp, plugins) {
    gulp.task('compileAssets', function (cb) {
        plugins.sequence(
            //'clean:dev',
            'jst:dev',
            'scss:dev',
            'copy:dev',
            'browserify',
            cb
        );
    });
};
