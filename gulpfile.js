var gulp = require('gulp');
var sassFile = 'css/*.scss';

gulp.task('watch', function() {
  gulp.watch(sassFile, ['css']);
});

gulp.task('css', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var sass         = require('gulp-sass');
    var autoprefixer = require('autoprefixer');

    return gulp.src(sassFile)
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer({ browsers: '>0.1%' }) ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('css/') );
});
