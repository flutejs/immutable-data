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