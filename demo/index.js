import {set, merge, remove} from '../src/index.js';

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


var obj3 = merge(obj1,{
  a:{
    b:{
      "0":1
    }
  }
});

console.log(JSON.stringify(obj3, null, 2));
console.log(merge({list:[1,2]}, {list:[0]}));
console.log(merge({list:[1,2]}, {list:{"0":0}}));

console.log(remove({
  a:{
    b:1
  },
  b:{}
},'b.x'))


var obj1 = {
  a: {
    x: 1,
    y: 2,
    z: {}
  },
  b: {}
};

var obj2 = remove(obj1, ['a.x','a.y','b.z']); 
console.log(obj2)

console.log(remove([0,1],0));