var path = require("path");//je el Node in je potrebna za absolutno pot!

module.exports = {//ustvarimo objekt, ki pove webpacku kaj narediti
	entry: {
		App: "./app/assets/scripts/App.js",//vstopne točke
		Vendor: "./app/assets/scripts/Vendor.js"

	},//katero datoteko naj poišče da naredi bundle
	output: {//kam shrani bundled file je tudi objekt
		path: path.resolve(__dirname,"./app/temp/scripts"),//absolutna pot.. path ima funkcijo z imenom resolve..
		//sprejme 2 parametra - __dirname - ustvari absolutno pot do naše datoteke v računalniku "webpack.config.js", drugi argument kaže na mapo kam bomo shranili

		//path: "./app/temp/scripts",//kam shranimo oz. pot bundled file ./ - relativna pot.. web pack potrebuje absolutno pot
		//filename: "App.js"//ime združene(bundled) datoteke..
		filename: "[name].js"//polje z imeni
	},
	
	module:{
		loaders: [{
			loader: "babel-loader",
			query: {
				presets: ["es2015"]
			},
			test: /\.js$/, //povemo da se pridrži javascript datotekam z regularnim izrazom
			exclude: /node_modules/ //kaj naj izloči
		}]
	}

}
