## immutable-data

 provides persistent immutable api:"get" and "valueOf,so you can change the object(or array) just like a normal javascript object(or array)
 
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

var data = immutableData(obj)

var obj = data.get("c.d")

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

- get
  
  property string or undefined 

  eg:

  ```javascript
  data.get()
  data.get("a.b[0].c")
  ```

- valueOf

  return javascript normal object or array

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