var remove = require('../index').remove;

describe('object', () => {

  it('object property', () => {

    expect(remove({ 
      list: [
        {
          x: 1,
          y: 2,
        },
        {
          a: 1,
          b: 2,
        },
      ]
    },'list[1]["a"]')).to.eql({
      list: [
        {
          x: 1,
          y: 2,
        },
        {
          b: 2,
        },
      ],
    });

    expect(remove({ 
      a: '1', 
      b: '2',
    }, 'a')).to.eql({
      b: '2',
    });

    var obj1 = {
      a: {
        x: 1,
        y: 2,
        z: {},
      },
      b: {},
    };

    var obj2 = remove(obj1, ['a.x','a.y']); 

    expect(obj2).to.eql({
      a: {
        z: {},
      },
      b: {},
    });

    expect(obj1.a.z).to.equal(obj2.a.z);
    expect(obj1.b).to.equal(obj2.b);

  });

  it('array property', () => {

    var array1 = [
      {
        x: 1,
      },
      {
        y: 1,
      },
    ];

    var array2 = remove(array1,"0");

    expect(array2).to.eql([
      {
        y: 1,
      }
    ]);
    
    expect(array1[0]).to.not.equal(array2[0]);

    var list1 = [0,1];
    var list2 = remove(list1,0);

    expect(list2).to.eql([1]);
    expect(list1).to.not.equal(list2);

  });

  it('should throw error if data is not an object', () => {
    expect(() => remove('a', {})).to.throw('data should be Object or Array');
  });

  it('should return data if obj not set', () => {
    var obj = {
      "a": 1,
    };

    var obj1 = remove(obj);
    expect(obj1).to.eql(obj);

    var obj2 = remove(obj, []);
    expect(obj2).to.eql(obj);
  });

});