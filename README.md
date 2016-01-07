[![Build Status](https://travis-ci.org/flutejs/immutable-data.svg)](https://travis-ci.org/flutejs/immutable-data)
[![Coverage Status](https://coveralls.io/repos/flutejs/immutable-data/badge.svg?branch=master&service=github)](https://coveralls.io/github/flutejs/immutable-data?branch=master)
[![NPM version](https://img.shields.io/npm/v/immutable-data.svg?style=flat)](https://npmjs.org/package/immutable-data)
[![NPM downloads](http://img.shields.io/npm/dm/immutable-data.svg?style=flat)](https://npmjs.org/package/immutable-data)

```javascript
var set = require("immutable-data")

var oldObj = {
  a:{},
  b:{},
  c:{
    d:{
      e:1
    },
    f:{}
  }
}

var newObj = immutableData(oldObj,{
  "c.d.e":2,
  "c.d.g":"g"
})

console.log(newObj===oldObj)          //false
console.log(newObj.a===oldObj.a)      //true
console.log(newObj.b===oldObj.b)      //true
console.log(newObj.c===oldObj.c)      //false
console.log(newObj.c.d===oldObj.c.d)  //false
console.log(newObj.c.f===oldObj.c.f)  //true
console.log(newObj.c.d.e===2)         //true
console.log(newObj.c.d.g==='g')     //true
```

## API

- function set(data, obj)

  eg:

  ```javascript
  var obj = {}
  var newObj = set(obj, {})
  ```

  ```javascript
  var array = []
  var newArray = set(array, {}) 
  ```

## dev

```
$ npm install
$ npm run dev
$ npm test
$ npm run build
```
