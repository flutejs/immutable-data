var assign = require('object-assign');
var isArray = require('is-array');
var forEach = require('array-foreach');
var map = require('array-map');
var keys = Object.keys || require('object-keys');

// node structure {key, value, data, parentNode}
class Node{
  constructor({key, value, data, parentNode}) {
    this.key = key;
    this.value = value;
    this.data = data;
    this.parentNode = parentNode;
    this.children = {};
  }
  setChild(key ,child) {
    this.children[key] = child;
  }
  getChild(key){
    return this.children[key];
  }
}


// Assign data with array: {key, value, type='set'}
// data : array => replace the same value as the index(obj.key)
//        object => assign object 
//  
// eg:obj1:{key:1,value},obj2:{key:3,value}
//
// array:
// [0, 1,          2, 3,          4] =>
// [0, obj1.value, 2, obj2.value, 4]
// 
// object:
// {
//   "1":1,
//   "3":3
// } =>
// {
//   "1":obj1.value,
//   "3":obj2.value
// }
function assignData(node, array, type = 'set') {
  var data = node.data;
  if (type === 'remove' && node.secondNode){
    if (isArray(data)) {
      data = data.concat();
      forEach(array, function(obj, index) {
        // splice 1 item and index - 1
        data.splice(obj.key - index, 1);
      });
      return data;
    }
    data = assign({}, data);
    forEach(array, function(obj) {
      if (obj.key in data){
        delete data[obj.key];
      }
    });
    return data;
  }

  if (isArray(data)) {
    data = data.concat();
    forEach(array, function(obj) {
      data[obj.key] = obj.value;
    });
    return data;
  }
  var assignObject = {};
  forEach(array, function(obj) {
    assignObject[obj.key] = obj.value;
  });
  return assign({}, data, assignObject);
}

// Create a tree that can be used to handle multiple data
// @param data (Object or Array)
// @param array (Array of Structure {path, data})
//
// eg:[{path:["a","b"],data:1},{path:["a","c"],data:2}] => 
//   a
//  / \ 
// b   c
// |   |
// 1   2
function createTree(data, array) {
  var tree = new Node({
    data,
  });
  
  forEach(array, function(item) {
    var pointer = tree;
    var dataPointer = data;

    var len = item.path.length;

    forEach(item.path, function(key, index) {

      var child = pointer.getChild(key) || new Node({
        // node name
        key, 
        // leaf node value
        value: len === index +1 ? item.data : null,
        // real data
        data: dataPointer[key],
        // parent node
        parentNode: pointer,
      });

      dataPointer = dataPointer[key];
      pointer.setChild(key, child);
      pointer = child;
      
    });    

  });
  return tree;
}

// Recursive access node and get the assignData, 
// and then return the root node value
function getNodeValue(node, type) {
  var array = keys(node.children);
  
  // Just get the leaf node value,
  // if a node is not a leaf node and its value is not undefined,
  // then the value is ignored.
  if (array.length === 0){
    // Mark the parent node is the second last node,
    // so it is convenient to know in which node can remove attributes
    node.parentNode.secondNode = true;
    return node.value;
  }

  var assignArray = map(array, function(key) {
    var child = node.children[key];
    return {
      key: child.key,
      value: getNodeValue(child, type),
    };
  });

  return assignData(node, assignArray, type);

}

exports.createTree = createTree;
exports.getNodeValue = getNodeValue;
