import traverse from 'traverse'
import isArray from 'is-array'
import parse from 'object-path-parse'
import assign from './assign'
import getValue from './getValue'
import getPath from './getPath'


class ImmutableData {

  constructor(obj) {
    if (typeof obj!== 'object'){
      throw new Error(`${obj} should be object or array`)
    }
    this.obj = obj
    this.list = []
  }

  pick(str) {

    let propertyList

    if (typeof str === 'object'){
      const list = getPath(this.obj,str)
      if (!list.length){
        throw new Error("can not find the property")
      }
      if (list.length>1){
        throw new Error(`find more than one path: ${list.join(" and ")}`)
      }
      propertyList = list[0]
      if (!propertyList.length){
        str = undefined
      }
    }

    if (typeof str === 'undefined'){

      const obj = isArray(this.obj)?[]:{}
      this.list.push({
        obj,
        propertyList:[]
      })

      return obj
    }
    

    propertyList = propertyList||parse(str)

    let pointer = getValue(this.obj,propertyList)

    if (typeof pointer !== 'object') {
      throw new Error(`${this.obj} ${str} should be object or array`)
    }

    const obj = isArray(pointer)?[]:{}

    this.list.push({
      obj,
      propertyList
    })

    return obj
  }

  valueOf() {
    
    let result = isArray(this.obj)?[]:{}
    
    let pointer
  
    this.list.sort((a,b)=>a.propertyList.length>b.propertyList.length).forEach(item=>{

      const len = item.propertyList.length

      if (len==0){
        result = assign(result,item.obj)
        return
      }

      pointer = result

      item.propertyList.forEach((property, index) => {
        if (index == len - 1) {
          pointer[property] = item.obj
          return
        }
        const temp = pointer[property] || {}
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
          parent: this.parent.node
        })
        return acc
      }, [{
        key,
        value: result[key],
          parent: result
      }]))

    })

    list.forEach(path => {
      
      const keyList = path.map(obj => obj.key)

      path.reverse().forEach((item, index) => {
        
        item.parent[item.key] = typeof item.value === 'object'?assign(getValue(this.obj, keyList.slice(0, keyList.length - index)),item.value):item.value
      
      })

    })

    Object.keys(this.obj).forEach((key) => {
      if (typeof result[key] === 'undefined') {
        result[key] = this.obj[key]
      }
    })

    this.obj = null
    this.list = []

    return result

  }

}


export default (obj) => {
  return new ImmutableData(obj)
}