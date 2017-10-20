
var gulp = require("gulp"),
	svgSprite = require("gulp-svg-sprite"),
	rename = require("gulp-rename"),
	del = require("del"),
	svg2png = require("gulp-svg2png");

var config ={//ustvarili smo objekt nakazuje ga zaviti oklepaji.. v tem objektu bo združil naše slike
	shape: {
		spacing: {
			padding: 1//popravimo da iocone niso preveč stisnjene
		}
	},
	mode: {// kakšen način oz. mode naj uporablja
		css: {//ima mode z imenom css
				variables: {
					replaceSvgWithPng: function(){//poljubno poimenujemo funkcijo
						return function(sprite,render){
							return render(sprite).split(".svg").join(".png");//split razdeli sprite v string in odreže .svg ter doda .png
						}
					} 
				},
				sprite: "sprite.svg",//izbriše .css iz sprite datoteke, ki jo drugače naredi z random charset
				render:{//povemu mu da mora zrendat css
					css:{//povemu mu da hočemo uporabljati css namesto sas,..itd
						template: "./gulp/templates/sprite.css"//mu podamo paketek z css template datoteko,
						// kjer  jo bo napolnil z informacijamo o vseh ikonah !!datoteko sami ustvarimo in sem podamo pot
					}
				}//tukaj mu povemu da naj zgenerira css za nas
		}
	}
}
 
gulp.task("beginClean", function(){//task pobriše stare sprite pred posodabljanjem novih
	return del(["./app/temp/sprite","./app/assets/images/sprites"]);
});

gulp.task("createSprite",["beginClean"], function(){
	return gulp.src("./app/assets/images/icons/**/*.svg")//gre v pod mape in vzame vse datoteke v icons s končnico .svg
			.pipe(svgSprite(config))//paketku svgSprite podamo objekt po imenu config
			.pipe(gulp.dest("./app/temp/sprite/"));//dest kopira datoteke izbrane z source v temp/sprite mapo
});

//ustvarjanje kopije .svg v .png za druge brskalnike
gulp.task("createPngCopy", ["createSprite"], function(){
	return gulp.src("./app/temp/sprite/css/*.svg")
	.pipe(svg2png())
	.pipe(gulp.dest("./app/temp/sprite/css"));
});

gulp.task("copySpriteGraphic",["createPngCopy"], function(){
	return gulp.src("./app/temp/sprite/css/**/*.{svg,png}")//zagrabi datoteko z .svg končnico
	.pipe(gulp.dest("./app/assets/images/sprites"));//kopira v datoteko navedeno na tej poti... glej tudi v templates/sprite pot za background-image!!
});

gulp.task("copySpriteCSS",["createSprite"], function(){//dependencies da naredi prvo tega pol pa drugega pove da je ta odvisen od navedenega v [tukaj]
	return gulp.src("./app/temp/sprite/css/*.css")
	.pipe(rename("_sprite.css"))
	.pipe(gulp.dest("./app/assets/styles/modules"));
});

gulp.task("endClean", ['copySpriteGraphic', 'copySpriteCSS'],function(){
	return del("./app/temp/sprite");
});

//gulp.task("icons",["createSprite,copySpriteCSS"]); - tako se oba taska izvedeta istočasno, kar pomeni da nebo prav delovalo zato moramo v createSpriteCSS vstavit nov parameter dependenciea, ki bo omogočil, da se bo izvedel do konca
gulp.task("icons",["beginClean","createSprite","createPngCopy","copySpriteGraphic","copySpriteCSS","endClean"]);