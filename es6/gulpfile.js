var gulp        = require("gulp"),
    sourcemaps  = require("gulp-sourcemaps"),
    connect     = require('gulp-connect'),
    notify      = require('gulp-notify'),
    babel       = require("gulp-babel"),
    concat      = require('gulp-concat');

var watchList = [
    'public/index.html',
    'public/readme.txt',
    'public/template/*.htm',
    'public/dist/*.css',
    'public/dist/*.js',
    'public/dist/**/*.js',
    '!public/src/**/compile.tmp.js',
];

// listen
gulp.task('connect', function() {
    connect.server({
        root: './public/',
        livereload: true
    });
});

gulp.task('list', function () {
    gulp.src(watchList)
        .pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch( watchList, ['list']);
});

/**
 *  公用程式
 *  注意, 這些檔案 "沒有" watch
 */
gulp.task('toAssets', function () {
    gulp.src('./node_modules/babel-core/browser.*') .pipe(gulp.dest("public/assets/babel-core/"));
    gulp.src('./node_modules/bootstrap/dist/**')    .pipe(gulp.dest("public/assets/bootstrap/"));
    gulp.src('./node_modules/font-awesome/css/**')  .pipe(gulp.dest("public/assets/font-awesome/css/"));
    gulp.src('./node_modules/font-awesome/fonts/**').pipe(gulp.dest("public/assets/font-awesome/fonts/"));
    gulp.src('./node_modules/jquery/dist/*')        .pipe(gulp.dest("public/assets/jquery/"));
});

// --------------------------------------------------------------------------------
gulp.task('default', function() {
    console.log('---- start ----');
    gulp.run('connect', 'watch', 'toAssets');
});


