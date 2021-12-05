const { src, dist, parallel, series, watch, dest } = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');
const concat        = require('gulp-concat');
const cleancss      = require('gulp-clean-css')

function browsersync() {
    browserSync.init({
        server: { baseDir: 'src/' },
        notify: false, 
        online: true
    })
}

function styles() {
    return src('src/scss/main.scss')
    .pipe(sass())
    .pipe(cleancss(({ level: { 1: {specialComments: 0}}, format:'beautify'})))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
    
}

function buildcopy() {
    return src([
        'src/css/**/*.css',
        'src/**/*.html',
        'src/fonts/**/*',
        'src/image/**/*.jpg',
        'src/image/**/*.svg',
        'src/image/**/*.png',
        'src/js/**/*.js'
    ], { base: 'src'} )
    .pipe(dest('dist'))
}

function startwatch() {
    watch('src/**/*.css', styles)
    watch('src/**/*.html').on('change', browserSync.reload)
}

exports.browsersync = browsersync;
exports.styles      = styles;
exports.buildcopy   = buildcopy;
exports.startwatch  = startwatch;

exports.default     = parallel(styles, browsersync, startwatch);