import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect' 
import auth from '../reducers/auth'

// modify these imports to suit your project
import * as actions from '../actions/auth' ;
import * as types from '../actions/types';

import {
    LOGIN_SUCCESS, LOGIN_FAIL
} from '../actions/types';

const API_URL = 'http://localhost:8000/api/'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })


  it('dispatch LOGIN_SUCCESS  when user is logged in', () => {
    nock(API_URL)
      .post('/auth/signin')
      .reply(200,{'Access-Control-Allow-Origin': '*'})

    const expectedActions = [
      { type: LOGIN_SUCCESS }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.login({email:'example@x.com',password:'123456'}))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('dispatch LOGIN_FAIL if user login fails', () => {
    nock(API_URL)
      .post('/auth/signin')
      .reply(404, {'Access-Control-Allow-Origin': '*'})

    const expectedActions = [
      { type: LOGIN_FAIL }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.login({email:'example@x.com',password:'123456'}))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})