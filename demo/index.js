import set from '../src/index.js';

var obj1 = {
  a:{
    b:[{},{}]
  },
  c:{}
}

var obj2 = set(obj1, {
  "a.b[0]":1,
  "c":2,
  "d":"x"
});

var array1 = [{}];

var array2 = set(array1, {
  "1":{}
});

console.log(JSON.stringify(obj2, null, 2));
console.log(JSON.stringify(array2, null, 2));