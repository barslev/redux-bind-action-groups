import expect from 'expect';
import {createStore} from 'redux';
import * as testGroup from './helper/actionCreators';
import reducers from './helper/reducers';
import bindActionGroups from '../index';

describe('test bindActionGroups', () => {
  let store, actionGroupObj;

  beforeEach(() => {
    store = createStore(reducers);
    actionGroupObj = {testGroup};
  })
  it('dispatch', () => {
    const boundActionGroups = bindActionGroups(actionGroupObj, store.dispatch);

    const action = boundActionGroups.testGroup.toggleDemo();

    expect(action).toEqual(
      testGroup.toggleDemo()
    );

    expect(store.getState()).toEqual({
      demo: false
    })
  })

  it('skip non-object or func values in the group object', () => {
    const boundActionGroups = bindActionGroups({
      ...actionGroupObj,
      number: 10,
      str: 'hello',
      wow: undefined,
      test: null,
    }, store.dispatch);
    // console.log(boundActionGroups, actionGroupObj)
    expect(
      Object.keys(boundActionGroups)
    ).toEqual(
      Object.keys(actionGroupObj)
    )
  })

  it('value is pure object with function', () => {
    const funcs = {
      foo: () => {},
      bar: () => {},
    }
    const boundActionGroups = bindActionGroups(funcs, store.dispatch);
    expect(
      Object.keys(boundActionGroups)
    ).toEqual(
      Object.keys(funcs)
    )
  })

  it('value have object and function', () => {
    const func = {
      foo: () => {},
      bar: () => {},
      actionGroupObj
    }
    const boundActionGroups = bindActionGroups(func, store.dispatch);
    expect(
      Object.keys(boundActionGroups)
    ).toEqual(
      Object.keys(func)
    )
  })

  it('throw a error on values is not Object', () => {
    expect(() => {
      bindActionGroups(null, store.dispatch);
    }).toThrow(
      'bindActionGroups expected an object, key is group name, value is object with actionCreators'
    )

    expect(() => {
      bindActionGroups(undefined, store.dispatch);
    }).toThrow(
      'bindActionGroups expected an object, key is group name, value is object with actionCreators'
    )

    expect(() => {
      bindActionGroups(10, store.dispatch);
    }).toThrow(
      'bindActionGroups expected an object, key is group name, value is object with actionCreators'
    )
  })
})