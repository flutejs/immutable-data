import traverse from 'traverse'
import assign from './assign'
import getValue from './getValue'
import propertyParse from './propertyParse'


class ImmutableData {

  constructor(obj) {
    this.obj = obj
    this.list = []
    this.root = null
  }

  reload(){
    this.obj = this.valueOf()
    this.list = []
    this.root = null
  }

  pick(str) {

    if (!str){

      if (this.list.length){
        this.reload()
      }

      const obj = assign(this.obj)
      this.root = obj
      return obj
    }
    else{

      if (this.root){
        this.reload()
      }

    }
    

    const propertyList = traverse(propertyParse(str)).reduce(function(acc, x) {
      if (this.isLeaf && typeof x !== 'undefined') {
        acc.push(x)
      }
      return acc
    }, [])

    const map = {}

    this.list.forEach(item=>{
      map[item.propertyList[0]] = true
    })

    let reload = false
    propertyList.forEach(property=>{
      if (map[property]){
        reload = true
      }
    }) 

    if (reload){
      this.obj = this.valueOf()
      this.list = []
    }   

    let pointer = getValue(this.obj,propertyList)

    if (typeof pointer !== 'object') {
      throw new Error(`${this.obj} ${str} should be object or array`)
    }

    const obj = assign(pointer)

    this.list.push({
      obj,
      propertyList
    })

    return obj
  }

  valueOf() {

    if (this.root){
      return assign(this.obj,this.root)
    }
    
    const result = {}
    
    let pointer

    this.list.forEach(item=>{

      pointer = result

      const len = item.propertyList.length

      item.propertyList.forEach((property, index) => {
        if (index == len - 1) {
          pointer[property] = item.obj
          return
        }
        const temp = {}
        pointer[property] = temp
        pointer = temp
      })

    })


    const list = []

    Object.keys(result).forEach(key => {
      
      list.push(traverse(result[key]).reduce(function(acc, x) {
        this.notLeaf && this.key && acc.push({
          key: this.key,
          value: x,
          parent: this.parent
        })
        return acc
      }, [{
        key,
        value: result[key],
          parent: result
      }]))

    })

    
    const map = {}

    list.forEach(path => {

      map[path[0].key] = true
      
      const keyList = path.map(obj => obj.key)
      
      path.reverse().forEach((item, index) => {
        item.parent[item.key] = assign(getValue(this.obj, keyList.slice(0, keyList.length - index)), item.value)
      })

    })

    Object.keys(this.obj).forEach((key) => {
      if (!map[key]) {
        result[key] = this.obj[key]
      }
    })

    return result

  }

}

export default (obj) => {
  return new ImmutableData(obj)
}