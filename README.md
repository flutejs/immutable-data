## immutable-data

A method of picking up the property to complete "persistent immutable data"
 
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
  
  pick up the property you want to modify,then you can modify it by ordinary javascript method,you should pick up the last object or array you want to modify

  eg:

  ```javascript
  var obj = data.pick("x")
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