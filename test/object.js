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
    
  });




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
      }
    }
    const data = Immutable(oldObj)
    
    data.pick("c.d.array").push("x")
    

    const newObj = data.valueOf()

    expect(newObj.c.d.array===oldObj.c.d.array).toBe(false)
    
  });




})