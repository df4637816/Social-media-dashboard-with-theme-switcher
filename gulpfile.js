 const {src,dest,watch,series} = require('gulp');
 const sass = require('gulp-sass');
 const postcss = require('gulp-postcss');
 const autoprefixer = require('autoprefixer');
 const cssnano = require('cssnano');
 const babel = require('gulp-babel');
 const terser = require('gulp-terser');
 const cssnext = require('cssnext');
const { Server } = require('http');
const browsersync = require('browser-sync').create();
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
 
 function browserSyncServer(cb){
    browsersync.init({
        server:{
            baseDir:'.',
        }},{
            notify:{
                styles:{
                    top:'auto',
                    bottom:'0',
                }
            }
        }
    )
 }

 function browserSyncReload(cb){
     browsersync.reload();
     cb();
 }

 //watch Task

 function watchTask(){
     watch('*.html',browserSyncReload);
     watch(
        ['app/scss/**/*.scss','app/**/*.js']
     )
 }