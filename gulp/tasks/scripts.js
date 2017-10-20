var gulp = require("gulp"),
	webpack = require("webpack");//dodamo web pack, ki je nameščen lokalno v projektu ker tako ga lahko programsko zaganjamo

gulp.task("scripts",["modernizr"], function(callback){//tako bo gulp zaznal kdaj je webpack zaključil
	webpack(require("../../webpack.config.js"),function(err,stats){//web pack nam da dostop do dveh parametrov err in stats
		if(err){//izpiše napako če pride do napake
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();//kličemo calback funkcijo da bo gulp prepričan, da je webpack se zaključil
	});//potrebuje pomoč da najde našo.config.js datoteko.. v require moramo relativno podati pot .. z../ se premikamo eno datoteko nazaj po hirerhiji
//require sprejem 2 argumenta, prvo config.datoteka in druga anonimna funkcija, ki se zažene, ko se bo webpack zaključil.
});