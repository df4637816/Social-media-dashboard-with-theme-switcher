 const {src,dest,watch,series} = require('gulp');
 const sass = require('gulp-sass')(require('sass'));
 const postcss = require('gulp-postcss');
 const autoprefixer = require('autoprefixer');
 const cssnano = require('cssnano');
 const babel = require('gulp-babel');
 const terser = require('gulp-terser');
 const cssnext = require('cssnext');


//sass task
 function scssTask(){
    var processors = [autoprefixer()
    ,cssnano,cssnext];
     return src('app/scss/style.scss',{sourcemaps:true})
     .pipe(sass())//編譯sass
     .pipe(postcss(processors))
     .pipe(dest('dist',{sourcemaps:'.'}));
 }

 //js yask
 function jsTask(){
      return src('app/js/app.js',{sourcemaps:true})
      .pipe(babel({presets:['@babel/preset-env']}))//編譯js
      .pipe(terser())//壓縮代碼
      .pipe(dest('dist',{sourcemaps:'.'}))
 }
 
 
 //watch Task

 function watchTask(){
     watch('*.html');
     watch(
        ['app/scss/**/*.scss','app/**/*.js']
     )
 }

 //Default Gulp Task
 exports.default = series(scssTask,jsTask,watchTask);