const { src, dest, task, series, watch } = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');

sass.compiler = require('node-sass');

task( 'clean', () => {
  return src( 'dist/**/*', { read: false }).pipe( rm() );
});

task( 'copy:html', () => {
  return src('src/*.html')
  .pipe(dest('dist'))
  .pipe(reload({ stream: true }));
  
});

task( 'copy:img', () => {
  return src('src/img/**/*').pipe(dest('dist/img'))
  
});

task( 'copy:fonts', () => {
  return src('src/fonts/**/*').pipe(dest('dist/fonts'))
  
});

task( 'styles', () => {
  return src ('src/css/main.scss')
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist'));
  
});

task('server', () => {
  browserSync.init({
     server: {
         baseDir: "./dist"
     }
    //  open: false
 });
});

watch ('./src/css/**/*.scss', series('styles'));
watch ('./src/*.html', series('copy:html'));

task('default', series ('clean', "copy:html", "copy:img", "copy:fonts", "styles", "server"));
