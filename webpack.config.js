const path = require('path');

module.exports = {
  entry: './src/scripts/visitorDomHandler.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'src/public/dist'), 
  },
  mode: 'development', 
};
