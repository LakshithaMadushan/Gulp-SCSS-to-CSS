gulp = require('gulp');
sassLint = require('gulp-sass-lint');
gutil = require('gulp-util');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
sass = require('gulp-sass');
sourceMaps = require('gulp-sourcemaps');
imagemin = require('gulp-imagemin');
minifyCSS = require('gulp-minify-css');
browserSync = require('browser-sync').create();
autoprefixer = require('gulp-autoprefixer');
gulpSequence = require('gulp-sequence').use(gulp);
shell = require('gulp-shell');
sourceMaps = require('gulp-sourcemaps');
plumber = require('gulp-plumber');

gulp.task('default', [ 'sass', 'serve' ]);

gulp.task('sass', function() {
	gulp
		.src('src/app/scss/**/*.scss')
		.pipe(
			plumber({
				errorHandler: function(err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(sourceMaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.on('error', gutil.log)
		.pipe(concat('body.css'))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('src/app/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('serve', function() {
	browserSync.init({
		port: 3322,
		server: 'src'
	});

	gulp.watch('src/app/scss/**/*.scss', [ 'sass' ]);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});
