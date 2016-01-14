var parse = require('object-path-parse');
var map = require('array-map');
var keys = Object.keys || require('object-keys');
var isArray = require('is-array');
var {createTree, getNodeValue} = require('./tree');

// remove(data, String or Array)
module.exports = function remove(data, array = []) {
  if (typeof data !== 'object') {
    throw new Error('data should be Object or Array');
  }

  if (!isArray(array)){
    array = [array];
  }

  if (array.length === 0){
    return data;
  }
  
  array = map(array, function(path){
    path = String(path);
    return {
      // Just use split if there is no '[' in path
      // eg: obj["list"] => parse, obj.list => split
      path: path.indexOf('[') > -1 ? parse(path) : path.split('.'),
      data: null,
    };
  });

  var tree = createTree(data, array);
  var value = getNodeValue(tree, 'remove');
  return value;
}

