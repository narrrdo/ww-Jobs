var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
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


gulp.task('env-dev', function() {
    return gulp.src('.env/env.js')
        .pipe(rename({
            dirname: "src/assets/js",
            basename: "env",
            prefix: "",
            suffix: "",
            extname: ".js"
        }))
        .pipe(gulp.dest('www/'));
});

gulp.task('env-uat', function() {
    return gulp.src('.env/env-uat.js')
        .pipe(rename({
            dirname: "src/assets/js",
            basename: "env",
            prefix: "",
            suffix: "",
            extname: ".js"
        }))
        .pipe(gulp.dest('www/'));
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


gulp.task('dev', ['index','src', 'env-dev', 'bower', 'watch', 'webserver']); //livereload
gulp.task('uat', ['index','src', 'env-uat', 'bower', 'watch', 'webserver']);