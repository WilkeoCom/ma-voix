
const { expect } = require('chai')

const getAllVotesUsecase = require('src/app/vote/getAllVotes')

describe('App -> Vote -> GetAll', () => {
  let useCase
  const mockVoteData = [
    {
      projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      userId: '28e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      choice: 'FOR'
    },
    {
      projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      userId: '38e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      choice: 'AGAINST'
    },
    {
      projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      choice: 'FOR'
    }]

  describe('Success path', () => {
    beforeEach(() => {
      const MockVoteRepository = {
        getAll: () => mockVoteData
      }

      useCase = getAllVotesUsecase({
        voteRepository: MockVoteRepository
      })
    })

    it('should display all the records on success', async () => {
      const projectId = '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b'

      const result = await useCase.all({ projectId })

      expect(result.for).to.equal(2)
      expect(result.against).to.equal(1)
      expect(result.getForPercentage()).to.equal(66.67)
      expect(result.getAgainstPercentage()).to.equal(33.33)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockVoteRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        getAll: () => Promise.reject('Error')
      }
      useCase = getAllVotesUsecase({
        voteRepository: MockVoteRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.all({ projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b' })
      } catch (e) {
        error = e
      }
      expect(error).to.equal('Error')
    })
  })
})
