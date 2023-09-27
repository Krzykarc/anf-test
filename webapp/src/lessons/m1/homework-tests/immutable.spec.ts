import { shoppingList, todos } from './mocks';

describe('Immutable ES6 operations', () => {

  const john = {
    firstname: "John",
    lastname: "Lennon"
  }

  const paul = {
    firstname: "Paul",
    lastname: "McCartney"
  }

  const musician = {
    profession: "musician",
    salary: 5000
  }

  it('merge two objects', () => {
    // define `merge2objects` function here
    // for 2 given parameters, the function returns an new merged object
    const merge2objects = <T extends object, U extends object>(obj1: T, obj2: U): (T & U) => {
      return {...obj1, ...obj2}
    }

    expect(merge2objects(john, musician)).toEqual({
      firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
    })

    expect(merge2objects(paul, musician)).toEqual({
      firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
    })
  })

  it('merging multiple objects', () => {
    type UnionToInterSection<T> = (T extends any ? (k: T) => void : never) extends (k: infer I) => void ? I : never;

    const mergeManyObjects = <T extends any[]>(...args: T): UnionToIntersection<T[number]> => {
      return args.reduce((acc, curr) => ({...acc, ...curr}), {})
    }

    expect(mergeManyObjects({ id: 8492745921 }, john, musician)).toEqual({
      id: 8492745921, firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
    })

    expect(mergeManyObjects({ id: 5193421984 }, paul, musician)).toEqual({
      id: 5193421984, firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
    })
  })

  it('strip static attribute from objects', () => {
    const stripId = <T extends {id: any}>(obj: T): Omit<T, 'id'> => {
      const { id, ...stripped } = obj;
      return stripped;
    }

    expect(stripId({
      id: 8492745921, firstname: "John", lastname: "Lennon"
    })).toEqual({
      firstname: "John", lastname: "Lennon"
    })

    expect(stripId(shoppingList[0])).toEqual({
      type: 'Clothes', name: 'Socks', price: 1.00, qty: 5
    })

    expect(todos.slice(0, 5).map(stripId)).toEqual([{
      "title": "Networked methodical function Shoes",
      "marked": true
    }, {
      "title": "Progressive client-server moratorium Car",
      "marked": true
    }, {
      "title": "Re-engineered logistical leverage Towels",
      "marked": false
    }, {
      "title": "Multi-channelled discrete budgetary management Bike",
      "marked": false
    }, {
      "title": "Seamless homogeneous functionalities Car",
      "marked": false
    }])
  })

  it('strip dynamic attribute from objects', () => {
    const stripKey = <T extends object, U extends keyof T>(paramToStrip: U, obj: T): Omit<T, U> => {
      const { [paramToStrip]: _, ...objWithNoParam } = obj;
      return objWithNoParam
    }

    expect(stripKey('firstname', {
      id: 8492745921, firstname: "John", lastname: "Lennon"
    })).toEqual({
      id: 8492745921, lastname: "Lennon"
    })

    expect(stripKey('qty',
      stripKey('price', shoppingList[0]))).toEqual({
        type: 'Clothes', name: 'Socks', id: 421801449988
      })
  })

  it('default object properties', () => {
    type TodoItem = object & { marked?: boolean };

    type GetMarkedType<T extends TodoItem> = T['marked'] extends true ? T : (
      {[P in keyof Omit<T, 'marked'>]: T[P]}
      & {marked: false}
    );

    const newTodo = <T extends TodoItem>(obj: T): GetMarkedType<T> => {
      return {
        marked: false,
        ...obj
      }
    }

    expect(newTodo({
      "title": "Networked methodical function Shoes",
    })).toEqual({
      "title": "Networked methodical function Shoes",
      "marked": false
    })

    expect(newTodo({
      "title": "Networked methodical function Shoes",
      "marked": false
    })).toEqual({
      "title": "Networked methodical function Shoes",
      "marked": false
    })

    expect(newTodo({
      "title": "Networked methodical function Shoes",
      "marked": true
    })).toEqual({
      "title": "Networked methodical function Shoes",
      "marked": true
    })
  })
})
