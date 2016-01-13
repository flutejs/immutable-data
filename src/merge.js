var isPlainObject = require('is-plain-object');
var forEach = require('array-foreach');
var keys = Object.keys || require('object-keys');
var {createTree, getNodeValue} = require('./tree');

// Get the tree path array
// return Array of Structure({path: Array of String, data: node value}) 
//
// eg: 
// value:
//   a
//  / \ 
// b   c
// |   |
// 1   2
// return:
// [{path:["a","b"], data:1}, {path:["a","c"], data:2}]
//
// If the data is not a plain object, assign it to the element,
//
// eg: 
// merge({list:[1,2]}, {list:[0]}) => {list:[0]}
// merge({list:[1,2]}, {list:{"0":0}}) => {list:[0,2]}
function getObjectPath(value) {
  var list = [];
  function traverse(data, path = []) {
    if (isPlainObject(data)) {
      forEach(keys(data), function(key){
        traverse(data[key], path.concat(key));
      });
      return;
    }
    list.push({
      path,
      data,
    });
  }
  traverse(value);
  return list;
}

// deep merge data 
module.exports = function merge(data, obj) {
  if (typeof data !== 'object'){
    throw new Error('data should be Object or Array');
  }
  if (!obj){
    return data;
  }
  var array = getObjectPath(obj);
  var tree = createTree(data, array);
  var value = getNodeValue(tree);
  return value;
}
