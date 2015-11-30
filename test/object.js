import Immutable from '../lib/index'

describe('object', () => {

  it('object property', () => {
    
    const oldObj = {
      a:{},
      b:{},
      c:{
        d:{
          e:1,
          x:{}
        },
        f:{}
      }
    }
    const data = Immutable(oldObj)
    
    data.pick("c.d").e = 2
    data.pick("c").g = "2"

    expect(()=>{
      data.pick("]")
    }).toThrow()

     expect(()=>{
      data.pick("d")
    }).toThrow()

    const newObj = data.valueOf()

    expect(newObj===oldObj).toBe(false)
    expect(newObj.a===oldObj.a).toBe(true)
    expect(newObj.b===oldObj.b).toBe(true)
    expect(newObj.c===oldObj.c).toBe(false)
    expect(newObj.c.d===oldObj.c.d).toBe(false)
    expect(oldObj.c.d.e===1).toBe(true)
    expect(newObj.c.d.e===2).toBe(true)
    expect(newObj.c.f===oldObj.c.f).toBe(true)
    expect(newObj.c.g==="2").toBe(true)
    expect(oldObj.c.g===undefined).toBe(true)
    expect(newObj.c.d.x===oldObj.c.d.x).toBe(true)
    
  })



  it('object root', () => {
    
    const oldObj = {
      a:{},
      b:{},
      c:{
        d:{
          e:1
        },
        f:{}
      }
    }
    const data = Immutable(oldObj)
    
    data.pick().a = {}
    data.pick("c.d").e = 2
    

    const newObj = data.valueOf()

    expect(newObj===oldObj).toBe(false)
    expect(newObj.a===oldObj.a).toBe(false)
    expect(newObj.b===oldObj.b).toBe(true)
    expect(newObj.c===oldObj.c).toBe(false)
    expect(newObj.c.d===oldObj.c.d).toBe(false)
    
  })




  it('object array', () => {
    
    const oldObj = {
      a:{},
      b:{},
      c:{
        d:{
          e:1,
          array:[]
        },
        f:{}
      },
      array:[{}]
    }
    const data = Immutable(oldObj)
    
    data.pick("c.d.array").push("x")
    data.pick("array[0]").x = 1
    data.pick("array.0").y = 2

    const newObj = data.valueOf()

    expect(newObj.c.d.array===oldObj.c.d.array).toBe(false)


  })


  it('pick object', () => {
    
    const obj = {}

    const oldObj = {
      a:obj,
      b:obj,
      c:{
        d:{
          e:1,
          array:[],
          x:{}
        },
        f:{}
      }
    }
    const data = Immutable(oldObj)
    

    data.pick("c.d").e = 2
    data.pick(oldObj.c).g = "2"
    data.pick("c.d.array").push("x")
    data.pick(oldObj).x = 1
    data.pick().x = 2
    
    expect(()=>{
      data.pick({})
    }).toThrow("can not find the property")

    expect(()=>{
      data.pick(obj)
    }).toThrow("find more than one path: a and b")

    const newObj = data.valueOf()

    expect(newObj===oldObj).toBe(false)
    expect(newObj.a===oldObj.a).toBe(true)
    expect(newObj.b===oldObj.b).toBe(true)
    expect(newObj.c===oldObj.c).toBe(false)
    expect(newObj.c.d===oldObj.c.d).toBe(false)
    expect(oldObj.c.d.e===1).toBe(true)
    expect(newObj.c.d.e===2).toBe(true)
    expect(newObj.x===2).toBe(true)
    expect(newObj.c.d.array===oldObj.c.d.array).toBe(false)
    
  })


  it('pick array', () => {
    
    const oldArray = [
      {},
      {
        a:{
          b:{
            c:1,
            e:[]
          }
        }
      },
      {}
    ]
    const data = Immutable(oldArray)
    
    data.pick("1.a.b").c = 2

    const newArray = data.valueOf()

    expect(newArray===oldArray).toBe(false)
    expect(newArray[0]===oldArray[0]).toBe(true)
    expect(newArray[1].a.b.c===2).toBe(true)
    expect(oldArray[1].a.b.c===1).toBe(true)
    expect(newArray[1].a.b.e===oldArray[1].a.b.e).toBe(true)
    


  })



})