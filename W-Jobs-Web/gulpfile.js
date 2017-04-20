var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin'),
    inject = require('gulp-inject');

var paths = {
    css: 'src/**/*.min.css',
    js: 'src/assets/js/**/*.*', ///*.{js,json}
    scripts: 'src/**/*.{js,html}',
    styles: 'src/less/**/*.*',
    less_index:'src/less/index.less',
    images: 'src/assets/images/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    indexJs: 'src/index.js',
    fonts: 'src/assets/fonts/**/*.{ttf,woff,eof,svg}',
    bower_components: 'bower_components/**/*.*',
    content:'src/content/**/*.{js,html}',
    template:'src/template/**/*.{js,html}'
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    
    var sources = gulp.src([paths.js], {read: false});
    
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('www/'));
});

gulp.task('inject', function() {
    
    var sources = gulp.src([paths.content, paths.template, paths.js], {read: false}, {relative: true});
    
    return gulp.src(paths.index)
        .pipe(inject(sources))
        .pipe(gulp.dest('www/'));
});

gulp.task('index-js', function() {
    return gulp.src(paths.indexJs)
        // .pipe(minifyJs())
        .pipe(gulp.dest('www/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts', 'copy-component']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.fonts)
        // .pipe(rename({
        //     dirname: '/fonts'
        // }))
        .pipe(gulp.dest('www/src/assets/fonts'));
});

gulp.task('copy-component', function() {
    return gulp.src(paths.bower_components)
        // .pipe(rename({
        //     dirname: '/fonts'
        // }))
        .pipe(gulp.dest('www/bower_components/'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-js','custom-images', 'custom-less', 'custom-templates','content','template']);

gulp.task('custom-js', function() {
    return gulp.src(paths.js)
        .pipe(gulp.dest('www/src/assets/js'));
});

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('www/src/assets/images'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        // .pipe(minifyJs())
        // .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('www/src'));
});

gulp.task('content', function() {
    return gulp.src(paths.content)
        // .pipe(minifyJs())
        // .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('www/src/content'));
});

gulp.task('template', function() {
    return gulp.src(paths.template)
        // .pipe(minifyJs())
        // .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('www/src/template'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('www/templates'));
});


// ###############################################################################
const dir = {
    bower: 'bower_components/**/*.{js,css,ttf,woff,eof,svg}',
    assets: 'src/assets/**',
    content: 'src/content/**',
    template: 'src/template/**',
    indexHtml: 'src/index.html',
    indexJS: 'src/index.js',
    less: 'src/less/index.less'
}

gulp.task('copy-file', ['copy-bower','copy-assets', 'copy-content','copy-template']);

gulp.task('copy-bower', function() {
    return gulp.src([dir.bower])
        //.pipe(minifyJs())
        .pipe(gulp.dest('www/bower_components/'));
});

gulp.task('copy-assets', function() {
    return gulp.src([dir.assets])
        //.pipe(minifyJs())
        .pipe(gulp.dest('www/src/assets'));
});

gulp.task('copy-content', function() {
    return gulp.src(dir.content)
        .pipe(gulp.dest('www/src/content'));
});

gulp.task('copy-template', function() {
    return gulp.src(dir.template)
        .pipe(gulp.dest('www/src/template'));
});

gulp.task('inject-css-js', function() {
    
    var sources = gulp.src([paths.content, paths.template, paths.js], {read: false}, {relative: true});
    
    return gulp.src(dir.indexHtml)
        .pipe(inject(sources))
        .pipe(gulp.dest('www/'));
});

gulp.task('copy-index-js', function() {
    return gulp.src(dir.indexJS)
        .pipe(gulp.dest('www/'));
});

gulp.task('custom-less', function() {
    return gulp.src(dir.less)
        .pipe(less())
        .pipe(gulp.dest('www/src/assets/css'));
});


/**
 * Watch custom files
 */
gulp.task('watch', function() {
    
    gulp.watch(dir.indexHtml, ['inject-css-js']);
    gulp.watch(dir.js, ['copy-index-js']);
    gulp.watch(dir.assets, ['copy-assets']);
    gulp.watch(dir.content, ['copy-content']);
    gulp.watch(dir.template, ['copy-template']);
    gulp.watch('src/less/*.less', ['custom-less']);
});


/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'www/',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['www/**/*.*'])
        .pipe(watch(['www/**/*.*']))
        .pipe(connect.reload());
});


/**
 * Gulp tasks
 */
gulp.task('build',   ['build-assets', 'build-custom']); //'inject',
gulp.task('prod',    ['usemin', 'build', 'webserver', 'livereload', 'watch']);
gulp.task('default', ['inject','index-js','build', 'webserver', 'livereload', 'watch']);

// Dev
gulp.task('dev', ['copy-file', 'inject-css-js','copy-index-js','custom-less','webserver', 'livereload', 'watch']);