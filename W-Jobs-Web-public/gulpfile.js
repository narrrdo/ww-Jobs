var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');

var paths = {
    src: 'src/**/*.*',
    bower: 'bower_components/**/*.*'
};

gulp.task('src', function() {
    return gulp.src([paths.src])
        .pipe(gulp.dest('www/src/'));
});

gulp.task('bower', function() {
    return gulp.src([paths.bower])
        .pipe(gulp.dest('www/bower_components/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.src, ['src']);
    gulp.watch(paths.bower, ['bower']);
});

gulp.task('webserver', function() {
    connect.server({
        root: 'www/',
        livereload: true,
        port: 8078
    });
});

// gulp.task('livereload', function() {
//     gulp.src(['/**/*.*'])
//         //.pipe(watch(['/**/*.*']))
//         .pipe(connect.reload());
// });


gulp.task('dev', ['src', 'bower', 'watch', 'webserver']); //livereload