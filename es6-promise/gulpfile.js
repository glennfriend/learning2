var gulp = require("gulp");

/**
 *  front-end resource
 */
gulp.task('toAssets', function () {
    gulp.src('./node_modules/jquery/dist/*')                .pipe(gulp.dest("./public/assets/jquery/"));
    gulp.src('./node_modules/bootstrap/dist/**')            .pipe(gulp.dest("./public/assets/bootstrap/"));
    gulp.src('./node_modules/es6-promise/dist/**')          .pipe(gulp.dest("./public/assets/es6-promise/"));
    gulp.src('./node_modules/fetch-polyfill/fetch.js')      .pipe(gulp.dest("./public/assets/fetch-polyfill/"));
});

// --------------------------------------------------------------------------------

gulp.task('default', function() {
    gulp.run('toAssets');
});
