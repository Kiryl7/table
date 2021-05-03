const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const minify = require('optimize-css-assets-webpack-plugin');
 
module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'scripts.js'
	},
	module: {
		rules: [{
			test:/.(s*)css$/,
			use: [
				miniCss.loader,
				'css-loader',
				'sass-loader',
			]
		}]
	},
	optimization: {
		minimizer: [
			new minify({})
		],
	},
	plugins: [
		new miniCss({
			filename: '../style.css',
		}),
	]
};