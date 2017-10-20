var gulp = require("gulp"),
	imagemin = require("gulp-imagemin"),//kompresiranje slik
	del = require("del"),
	usemin =require("gulp-usemin"),
	rev= require("gulp-rev"),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify"),
	browserSync = require('browser-sync').create();


	gulp.task("previewDist",function(){
		 browserSync.init({//avtomatsko osveževanje strani
    	notify: false,//skrije obvestilo v brskalniku
        server: {//strežnik na računalniku zažene brskalnik
            baseDir: "dist"//povemo kje se nahaja naš html
        }
    });
	});

gulp.task("deleteDistFolder",["icons"],function(){//pobrišemo dist na začetku
	return del("./docs");//git pricakuje docs
});

gulp.task("copyGeneralFiles",["deleteDistFolder"],function(){
	var pathsToCopy = [
	"./app/**/*",
	"!./app/index.html",
	"!./app/assets/images/**",
	"!./app/assets/styles/**",
	"!./app/assets/scripts/**",
	"!./app/temp",
	"!./app/temp/**"
	];
	return gulp.src(pathsToCopy)
	.pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages",["deleteDistFolder"],function(){
	return gulp.src(["./app/assets/images/**/*","!./app/assets/images/icons","!./app/assets/images/icons/**/*"])// 1- excludamo datoteke in mape
	.pipe(imagemin({
progressive: true,//omogočimo optimiziranje še boljše
interlaced: true,// to pomaga pri gif slikah
multipass: true// pomaga pri svg datotekami
		}))
	.pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("useminTrigger",["deleteDistFolder"],function(){
	gulp.start("usemin");
})

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]

    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task("build",["deleteDistFolder","copyGeneralFiles","optimizeImages","useminTrigger"]);