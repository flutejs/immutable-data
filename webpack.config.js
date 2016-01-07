var fs = require('fs');
module.exports = function(webpackConfig, dora) {
  
  if (dora){
    webpackConfig.entry.index= './demo/index.js';
    return webpackConfig
  }

  webpackConfig.plugins.splice(0,1);
  webpackConfig.output.libraryTarget = 'commonjs2';
  webpackConfig.externals = fs.readdirSync('node_modules');
  return webpackConfig;
}