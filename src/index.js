var parse = require('object-path-parse');
var assign = require('object-assign');
var isArray = require('is-array');

function assignData(data,key,value) {
  if (isArray(data)){
    key = parseInt(key);
    return [...data.slice(0, key), value, ...data.slice(key + 1)];
  }
  return assign({},data,{
    [key]:value,
  });
}

function isObject(data) {
  return (typeof data === 'object');
}

function set(data,obj) {

  if (!isObject(data)){
    throw new Error('data should be Object or Array');
  }

  if (!obj){
    return data;
  }

  var array = Object.keys(obj);

  if (array.length === 0){
    return data;
  }

  array.forEach(function(key) {

    var nodeList = [];
    var list = parse(key);
    var pointer = data;
    
    nodeList.push({
      key: null,
      value: pointer,
    });

    list.forEach(function(name, index) {
      pointer = pointer[name];
      nodeList.push({
        key: name,
        value: index === list.length - 1 ? obj[key] : pointer,
      });
    });

    nodeList.reverse().forEach(function(node, index) {
      if (index === 0){
        return;
      }
      var lastNode = nodeList[index-1];
      data = node.value = assignData(node.value, lastNode.key, lastNode.value);
    });

  });

  return data;

}

module.exports = set;
