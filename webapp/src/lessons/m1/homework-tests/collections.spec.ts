import { employees, shoppingList, shoppingDict, ShoppingItemWithId } from './mocks';

describe('Collection restructuring', () => {
  // in these exercises you'll be given two data structures:
  // - shopping items list (small one)
  // - employee list (big one)
  // all items have their own `id` attributes.
  // your task will be to write functions that:
  // - turn a list into a dictionary
  // - turn a dictionary into a list

  it('array2dict can turn an array into a dictionary (with `id` key)', () => {
    // write the `array2dict` function that turns a list into a dictionary
    // all elements of the list have `id` property set

    // define `array2dict` here

    const array2dict = <T extends {id: number}>(array: T[]): {[key: string]: T} => {
      return array.reduce<{[key: string]: T}>((acc, curr) => ({...acc, [curr.id]: curr}), {})
    }

    let employeeDictionary = array2dict(employees);

    expect(employees.length).toEqual(1311);
    expect(Object.keys(employeeDictionary).length).toEqual(1311);
    expect(employeeDictionary[651065].salary).toEqual(8146);

    let shoppingDictionary = array2dict(shoppingList);

    expect(shoppingList.length).toEqual(10);
    expect(Object.keys(shoppingDictionary).length).toEqual(10);
    expect(shoppingDictionary[611830716982].name).toEqual('Beer');
  })
  type  ObjectWithId<T> = {
    id: number
  } & T;

  it('dict2array can turn a dictionary (with `id` key) into an array', () => {
    // write the `dict2array` function that turns a dictionary into a list
    // all elements within the dictionary are available under `id` keys

    // define `dict2array` here

    const dict2array = <T extends {[key: number]: object}>(dict: {[key: string]: T}) => {
      return Object.keys(dict).reduce<ObjectWithId<T>[]>((acc, curr) => [...acc, {id: Number(curr), ...dict[curr]}], [])
    }

    let shoppingData = dict2array(shoppingDict);

    expect(Object.keys(shoppingDict).length).toEqual(10);
    expect(shoppingData.length).toEqual(10);
    expect(shoppingData.find(e => e.id == 611830716982)!.name).toEqual('Beer');
  })
})
