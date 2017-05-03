var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');

var paths = {
    src: 'src/**/*.*',
    bower: 'bower_components/**/*.*',
    indexHtml: 'index.html',
    indexJs: 'index.js'
};

gulp.task('index', function() {
    return gulp.src([paths.indexHtml, paths.indexJs])
        .pipe(gulp.dest('www/'));
});

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
    gulp.watch(paths.indexHtml, ['index']);
    gulp.watch(paths.indexJs, ['index']);
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


gulp.task('dev', ['index','src', 'bower', 'watch', 'webserver']); //livereload