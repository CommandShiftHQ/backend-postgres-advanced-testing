const { expect } = require('chai')
const sinon = require('sinon')
const { checkStatus } = require('../../src/controllers/status')

describe('check', () => {
  it('returns a 200 status code', () => {
    const request = {}
    const response = { sendStatus: sinon.spy() }

    checkStatus(request, response)

    expect(response.sendStatus.calledOnce).to.be.true
    expect(response.sendStatus.calledWith(200)).to.be.true
  })
})