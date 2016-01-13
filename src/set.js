var parse = require('object-path-parse');
var map = require('array-map');
var keys = Object.keys || require('object-keys');
var {createTree, getNodeValue} = require('./tree');


module.exports = function set(data, obj = {}) {
  if (typeof data !== 'object') {
    throw new Error('data should be Object or Array');
  }
  var array = keys(obj);
  if (array.length === 0) {
    return data;
  }
  array = map(array, function(path){
    return {
      // Just use split if there is no '[' in path
      // eg: obj["list"] => parse, obj.list => split
      path: path.indexOf('[') > -1 ? parse(path) : path.split('.'),
      data: obj[path],
    };
  });
  var tree = createTree(data, array);
  var value = getNodeValue(tree);
  return value;
}
