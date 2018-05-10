var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    plumber = require('gulp-plumber'),
    fontmagician = require('postcss-font-magician'); 

var paths = {
    styles: './Styles/**/*.scss',
    css: './wwwroot/css/'
};

gulp.task('styles', function () {
    var plugins = [
        autoprefixer({ browsers: 'last 2 major versions' }),
        cssnano({ minifyFontValues: false }),
        fontmagician()
    ];

    return gulp.src(paths.styles)
        .pipe(plumber())

        .pipe(sass())

        .pipe(postcss(plugins))

        .pipe(rename(function (path) {
            path.basename = path.basename.toLowerCase() + '.min'
        }))

        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
    gulp.watch(paths.styles, ['styles']);
});