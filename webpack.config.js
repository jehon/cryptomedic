
const path = require('path');

const www = path.resolve(__dirname, 'www');

module.exports = {
	entry: www + '/app.js',
	output: {
		path: www,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader?name=public/files/[name].[ext]'
			}
		]
	}
};
