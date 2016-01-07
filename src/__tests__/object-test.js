var set = require('../index');

describe('object', () => {

  it('object property', () => {
    
    var obj1 = {
      a:{
        b:[{},{}]
      },
      c:{},
    };

    var obj2 = set(obj1, {
      "a.b[0]":{},
      "d":"d",
    });

    expect(obj2).to.not.equal(obj1);
    expect(obj2.a.b).to.not.equal(obj1.a.b);
    expect(obj2.a.b[0]).to.not.equal(obj1.a.b[0]);

    expect(obj2.a.b[1]).to.equal(obj1.a.b[1]);
    expect(obj2.a.b.c).to.equal(obj1.a.b.c);
    expect(obj2.a.b.d).to.equal('d');
    
  });

  it('array property', () => {
    
    var array1 = [{}]

    var obj = {};
    var array2 = set(obj1, {
      "1":obj,
    });

    expect(array2).to.not.equal(array1);
    expect(array2[0]).to.equal(array1[0]);
    expect(array2[1]).to.equal(obj);
    
  });


});