// Variables
var gulp = 			require('gulp')
var sass = 			require('gulp-sass')
var autoprefixer = 	require('gulp-autoprefixer')
var htmlmin = 		require('gulp-htmlmin');
var cleanCSS = 		require('gulp-clean-css');
var plumber = 		require('gulp-plumber');
var notify = 		require('gulp-notify');
var browserSync =  	require('browser-sync')
var uglify = 		require('gulp-uglify');
var rename = 		require('gulp-rename')


// Fonctionnalités

// ne pas oublier de lancer gulp avec la commande "gulp", ctrl + pause pour stop

gulp.task('transformcss', function(){
	return gulp.src('src/css/scss/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers:['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(cleanCSS())
});


gulp.task('htmlmin', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglification', function () {
 	return gulp.src('src/js/*.js')
 		.pipe(rename(function(path){
 			path.basename += ".min";
 		}))
 		.pipe(uglify())
 		.pipe(gulp.dest('dist/js'));
});

gulp.task('synchro', function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	});
});


// Watch & Launch

gulp.task('watch',['synchro', 'htmlmin', 'transformcss'], function(){
	gulp.watch('src/css/scss/**/*.scss', ['transformcss']);
	gulp.watch('src/js/*.js', ['uglification']);
	gulp.watch('src/*.html', ['htmlmin']);
	gulp.watch('dist/*.html').on('change', browserSync.reload);
	gulp.watch('dist/css/*.css').on('change', browserSync.reload);
	gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});



gulp.task('default', ['watch']); 









