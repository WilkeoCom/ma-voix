
const { expect } = require('chai')
const getUserUsecase = require('src/app/user/getUser')

describe('App -> User -> Get', () => {
  let useCase
  const mockData = {
    firstName: 'Test',
    lastName: 'Developer'
  }

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => mockData
      }

      useCase = getUserUsecase({
        userRepository: MockRepository
      })
    })

    it('should display the record on success', async () => {
      const user = await useCase.get('1')
      expect(user).to.equal(mockData)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        findById: () => Promise.reject('Error')
      }

      useCase = getUserUsecase({
        userRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.get('0')
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
