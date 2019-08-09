
const { expect } = require('chai')
const getProjectsWithVoteResultsUsecase = require('src/app/project/getProjectsWithVoteResults')

describe('App -> Project -> GetWithVoteResults', () => {
  let useCase
  const mockData = [{
    id: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
    projectType: 'projet de loi',
    status: 'Première lecture (AN)',
    title: 'projet de loi d\'orientation des mobilités',
    topics: ['TRANSPORT'],
    url: 'http://www.senat.fr/dossier-legislatif/pjl18-157.html'
  }]
  const mockVoteData = [
    {
      projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      userId: '28e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      choice: 'FOR'
    },
    {
      projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      choice: 'AGAINST'
    }]

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        getAll: () => mockData
      }
      const MockVoteRepository = {
        getAll: () => mockVoteData
      }

      useCase = getProjectsWithVoteResultsUsecase({
        projectRepository: MockRepository,
        voteRepository: MockVoteRepository
      })
    })

    it('should display all the records on success', async () => {
      const mockData = [{
        id: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
        projectType: 'projet de loi',
        status: 'Première lecture (AN)',
        title: 'projet de loi d\'orientation des mobilités',
        topics: ['TRANSPORT'],
        url: 'http://www.senat.fr/dossier-legislatif/pjl18-157.html',
        for: 1,
        against: 1,
        forPercentage: 50,
        againstPercentage: 50
      }]

      const lists = await useCase.all()

      expect(lists).to.eql(mockData)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        getAll: () => Promise.reject('Error')
      }
      const MockVoteRepository = {
        getAll: () => mockVoteData
      }

      useCase = getProjectsWithVoteResultsUsecase({
        projectRepository: MockRepository,
        voteRepository: MockVoteRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.all()
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
