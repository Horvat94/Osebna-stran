var gulp = require("gulp"),
modernizr = require("gulp-modernizr");//testira brskalnike za feachure, css animation, opacity, svg, itd

gulp.task("modernizr",function(){
	return gulp.src(["./app/assets/styles/**/*.css","./app/assets/scripts/**/*.js"])//ciljamo v css 
	.pipe(modernizr({
		"options": [
			"setClasses"
		]
	}))//avtomatsko zazana za katere feature moramo testirati in ustvari js datoteko
	.pipe(gulp.dest("./app/temp/scripts/"));//pipamo na cilj
});

