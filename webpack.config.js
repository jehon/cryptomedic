
const path = require('path');

const www = path.resolve(__dirname, 'www');

module.exports = {
	entry: www + '/app.js',
	output: {
		path: www,
		filename: 'bundle.js'
  	}
};
