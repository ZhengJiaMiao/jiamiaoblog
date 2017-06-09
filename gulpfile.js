var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    //clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

//cssѹ��
var cssnano = require('gulp-cssnano');
gulp.task('style', function() {
	return sass('src/css/*.scss')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css/'))
		.pipe(connect.reload());
});

 
// �ű�
gulp.task('js', function() { 
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
	.pipe(connect.reload());
});
 
// ͼƬ
gulp.task('images', function() { 
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }))
	.pipe(connect.reload());
});

//html����
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});
 
//�������ط�����,�������ļ��仯
var connect = require('gulp-connect');
gulp.task('connect', function () {
  connect.server({
	root: 'src',
	port: 8888,
    livereload: true
  });
});
gulp.task('watch', function() {
	gulp.watch('src/css/**/*.scss', ['style']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/images/*.*', ['images']);
	gulp.watch('src/*.html', ['html']);
});
gulp.task('reload', ['connect', 'watch']);