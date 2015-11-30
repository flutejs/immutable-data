[![Build Status](https://travis-ci.org/flutejs/immutable-data.svg)](https://travis-ci.org/flutejs/immutable-data)
[![Coverage Status](https://coveralls.io/repos/flutejs/immutable-data/badge.svg?branch=master&service=github)](https://coveralls.io/github/flutejs/immutable-data?branch=master)
[![NPM version](https://img.shields.io/npm/v/immutable-data.svg?style=flat)](https://npmjs.org/package/immutable-data)
[![NPM downloads](http://img.shields.io/npm/dm/immutable-data.svg?style=flat)](https://npmjs.org/package/immutable-data)

```javascript
var immutableData = require("immutable-data")

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

var data = immutableData(oldObj)

var obj = data.pick("c.d")

obj.e = "e"
obj.g = "g"

var newObj = data.valueOf()

console.log(newObj===oldObj)          //false
console.log(newObj.a===oldObj.a)      //true
console.log(newObj.b===oldObj.b)      //true
console.log(newObj.c===oldObj.c)      //false
console.log(newObj.c.d===oldObj.c.d)  //false
console.log(newObj.c.f===oldObj.c.f)  //true
```

[try it in your browser](https://tonicdev.com/npm/immutable-data)

## API

- create immutable data

  eg:

  ```javascript
  var obj = {}
  var data = immutableData(obj)
  ```

  ```javascript
  var array = []
  var data = immutableData(array) 
  ```

- pick
  
  pick the property you want to modify,then you can modify it by ordinary javascript method,you should pick the last object or array you want to modify

  eg:

  ```javascript
  var obj = data.pick(oldObj.x)
  var array = data.pick("a.b[0].list")
 
  obj.z = 1
  array.push(1)

  //error
  data.pick("a.b[0]").list.push(1)
  ```

- valueOf

  after modify properties , you can use "valueOf" to get original javascript object or array

  eg:

  ```javascript
  data.valueOf()
  ```

## dev

```
$ npm install
$ npm run dev
$ npm test
$ npm run build
```
