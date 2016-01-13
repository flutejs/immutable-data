var {merge} = require('../index');

describe('object', () => {

  it('object property', () => {

    var obj1 = {
      a: {
        b: [{},{}],
      },
      c: {},
    };

    var obj2 = merge(obj1, {
      a: {
        b: {
          "0": {
            x: 1,
          }
        }
      },
      d: "d",
    });

    expect(obj2).to.not.equal(obj1);
    expect(obj2.a.b).to.not.equal(obj1.a.b);
    expect(obj2.a.b[0]).to.not.equal(obj1.a.b[0]);

    expect(obj2.a.b[1]).to.equal(obj1.a.b[1]);
    expect(obj2.a.b.c).to.equal(obj1.a.b.c);
    expect(obj2.d).to.equal('d');
    expect(obj2).to.eql({
      a: {
        b:[{x: 1},{}],
      },
      c: {},
      d: "d",
    });

  });

  it('array property', () => {

    var array1 = [{
      list:[]
    },{
      list:[]
    },{
      list:[]
    }];

    var list = [];
    var array2 = merge(array1, {
      "1":{
        list,
      }
    });

    expect(array2).to.not.equal(array1);
    expect(array2[0]).to.equal(array1[0]);
    expect(array2[1]).to.not.equal(array1[1]);
    expect(array2[1].list).to.equal(list);
    expect(array2[2]).to.equal(array1[2]);
    
  });

  it('should throw error if data is not an object', () => {
    expect(() => merge('a', {})).to.throw('data should be Object or Array');
  });

  it('should return data if obj not set', () => {
    var obj = {
      "a": 1
    };

    var obj1 = merge(obj);
    expect(obj1).to.eql(obj);

  });

});