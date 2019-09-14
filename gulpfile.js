const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');


const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');

task( 'clean', () => {
  return src( '${DIST_PATH}/**/*', { read: false }).pipe( rm() );
});

task( 'copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({ stream: true }));
  
});

task( 'copy:img', () => {
  return src('${SRC_PATH}/img/**/*').pipe(dest('${DIST_PATH}/img'))
  
});

task( 'copy:fonts', () => {
  return src('${SRC_PATH}/fonts/**/*').pipe(dest('${DIST_PATH}/fonts'))
  
});



task( 'styles', () => {
  return src([...STYLE_LIBS, 'src/css/main.scss'])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(
    gulpif(
   env === 'dev',
   autoprefixer({
    cascade: false
})
)
.pipe(gulpif(env === 'prod', gcmq()))
.pipe(gulpif(env === 'prod', cleanCSS()))
.pipe(gulpif(env === 'dev', sourcemaps.write()))
.pipe(dest(DIST_PATH))
.pipe(reload({ stream: true })));
});


task('scripts', () =>{
  return src([...JS_LIBS, 'src/scripts/*.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(babel({
    presets: ['@babel/env']
}))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream: true}));
})


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
watch ('./src/scripts/*.js', series('scripts'));
task('default', series ('clean', parallel("copy:html", "copy:img", "copy:fonts", "styles"), "scripts", "server"));
