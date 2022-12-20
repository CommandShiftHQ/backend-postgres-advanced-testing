const { expect } = require('chai')
const sinon = require('sinon')
const db = require('../../src/db')
const { create } = require('../../src/controllers/user')

describe('create', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('returns 201 status code and the new user data', async () => {
    const request = { body: { email: 'email', password: 'password' } }
    const response = {}
    response.status = sinon.stub().returns(response),
    response.json = sinon.spy() 
  
    const data = {
      rows: [
        {
          id: 1,
          email: "email",
          password: "password"
        }
      ]
    }
    sinon.stub(db, 'query').returns(Promise.resolve(data))

    await create(request, response)

    expect(response.status.calledWith(201)).to.be.true
    expect(response.json.calledWith({
      id: 1,
      email: "email",
      password: "password"
    })).to.be.true

  })

  it('passes the correct sql to the db', async () => {
    const request = { body: { email: 'email', password: 'password' } }
    const response = {}
    response.status = sinon.stub().returns(response),
    response.json = sinon.stub()
  
    const data = {
      rows: [
        {
          id: 1,
          email: "email",
          password: "password"
        }
      ]
    }
    const mockDB = sinon.mock(db).expects('query').once().withArgs(
      'INSERT INTO Users(email, password) VALUES ($1, $2) RETURNING *', 
      ['email', 'password']
    ).returns(Promise.resolve(data))

    await create(request, response)

    mockDB.verify()
  })
})