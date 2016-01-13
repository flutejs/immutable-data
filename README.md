# immutable-data

[![Build Status](https://travis-ci.org/flutejs/immutable-data.svg)](https://travis-ci.org/flutejs/immutable-data)
[![Coverage Status](https://coveralls.io/repos/flutejs/immutable-data/badge.svg?branch=master&service=github)](https://coveralls.io/github/flutejs/immutable-data?branch=master)
[![NPM version](https://img.shields.io/npm/v/immutable-data.svg?style=flat)](https://npmjs.org/package/immutable-data)
[![NPM downloads](http://img.shields.io/npm/dm/immutable-data.svg?style=flat)](https://npmjs.org/package/immutable-data)

> Easily "set", "merge", "remove" nested objects and arrays in an immutable manner.

"immutable-data" lets you specify the part of the data you want to change, and then set the value, then it can change the part that you want to change, at the same time, the rest data that you do not want to change will not be affected.

## api

### set(data, map)

- data: original data you want to change

- map: the path map

  ```javascript
  {
    'a.b.0': 1 // or 'a["b"][0]': 1
  }
  ```

eg:

```javascript
var {set, merge, remove} = require("immutable-data");

var data = {
  a: {
    b: 2
  },
  c: [{
    d: 2
  }]
};

set(obj, {
  'a.b': 1,
  'c.0.d': 1
})

//return
{
  a: {
    b: 1
  },
  c: [{
    d: 1
  }]
}
```


### merge(data, object)

- data: original data you want to change

- object: deep merge object


eg:

```javascript
var {merge} = require("immutable-data");

var data = {
  a: {
    b: 2
  },
  c: [{
    d: 2
  }]
};

merge(obj, {
  a: {
    b: 1
  },
  c: {
    "0": {
      d: 1
    }
  }
})

//return
{
  a: {
    b: 1
  },
  c: [{
    d: 1
  }]
}
```

Tip: If the type of a value is an array, it will be assigned a direct value.

```javascript
merge({list:[1,2]}, {list:[0]})

//return
{list:[0]}

merge({list:[1,2]}, {list:{"0":0}})

//return
{list:[0,2]}
```

### remove(data, path) 

- data: original data you want to change

- path: String or Array


  ```javascript
  "a.b"
  ["a.b","a.c"]
  ```

eg:

```javascript
var {remove} = require("immutable-data");

var data = {
  a: {
    b: 2
  },
  c: [{
    d: 2
  }]
};

remove(obj, [
  'a.b',
  'c.0'
])

// return 
{
  a: {},
  c: []
}
```

## dev

```
$ npm install
$ npm run dev
$ npm test
$ npm run build
```

## License

MIT License
