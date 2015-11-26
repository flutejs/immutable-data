import Immutable from '../lib/index'

describe('object', () => {

  it('object property', () => {
    
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
    
    data.get("c.d").e = 2
    data.get("c").g = "2"

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
    
    data.get().a = {}
    data.get("c.d").e = 2
    

    const newObj = data.valueOf()

    expect(newObj===oldObj).toBe(false)
    expect(newObj.a===oldObj.a).toBe(false)
    expect(newObj.b===oldObj.b).toBe(true)
    expect(newObj.c===oldObj.c).toBe(false)
    expect(newObj.c.d===oldObj.c.d).toBe(false)
    
  });




})