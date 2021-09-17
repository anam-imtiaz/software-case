import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import TodoService from "../services/todo.service";
import nock from 'nock'
import expect from 'expect' 
import auth from '../reducers/auth'



const API_URL = 'http://localhost:8000/api/'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('show all task', () => {
    nock(API_URL)
      .get('/todo/all')
      .reply(200,{'Access-Control-Allow-Origin': '*'})
    const store = mockStore({ })
    return TodoService.getAll()
    .then(response => {
        console.log(response);
    })
    .catch(e => {});

    
  })

  it('show message when task is created', () => {
    nock(API_URL)
      .post('/todo')
      .reply(200,{'Access-Control-Allow-Origin': '*'})
    const store = mockStore({ })
    return TodoService.create({task:'test'})
              .then(response => {
              })
              .catch(e => {
                console.log(e);
              });
    
  })




 
})