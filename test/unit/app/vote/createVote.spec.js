
const { expect } = require('chai')
const createUsecase = require('src/app/vote/createVote')

describe('App -> Vote -> Post', () => {
  let useCase
  const mockData = {
    projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
    userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
    choice: 'FOR'
  }
  const mockProject = {
    id: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
    createdAt: new Date('2018-12-05'),
    projectType: 'projet de loi',
    status: 'Première lecture (Sénat)',
    title: 'projet de loi pour une école de la confiance',
    topics: ['CULTURE', 'EDUCATION', 'SOCIETY'],
    url: 'http://www.senat.fr/dossier-legislatif/pjl18-323.html'
  }
  const mockUser = {
    id: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
    firstName: 'Test',
    lastName: 'Developer'
  }

  describe('Success path', () => {
    beforeEach(() => {
      const MockVoteRepository = {
        create: (data) => data,
        findOne: () => null
      }
      const MockProjectRepository = {
        findById: (id) => mockProject
      }
      const MockUserRepository = {
        findById: (id) => mockUser
      }

      useCase = createUsecase({
        voteRepository: MockVoteRepository,
        projectRepository: MockProjectRepository,
        userRepository: MockUserRepository
      })
    })

    it('should create the records and the data', async () => {
      const body = {
        projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
        userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
        choice: 'FOR'
      }
      const vote = await useCase.create({ body })

      expect(vote.projectId).to.equal(body.projectId)
      expect(vote.userId).to.equal(body.userId)
      // @todo mock Date
      // expect(vote.votedAt).to.equal(new Date())
      expect(vote.choice).to.equal(body.choice)
    })
  })

  describe('Fail path', () => {
    const body = {
      projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      choice: 'FOR'
    }

    const MockVoteRepository = {
      // eslint-disable-next-line prefer-promise-reject-errors
      create: () => Promise.reject('Error'),
      findOne: () => mockData
    }

    it('should return error if the projectId does not exist', async () => {
      const MockProjectRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        findById: (id) => Promise.reject('Error')
      }
      const MockUserRepository = {
        findById: (id) => mockUser
      }

      useCase = createUsecase({
        voteRepository: MockVoteRepository,
        projectRepository: MockProjectRepository,
        userRepository: MockUserRepository
      })

      const body = {
        projectId: '1234',
        userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
        choice: 'FOR'
      }
      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        error = e
      }
      expect(error.message).to.equal('Error')
    })

    it('should return error if the userId does not exist', async () => {
      const body = {
        projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
        userId: '1234',
        choice: 'FOR'
      }
      const MockProjectRepository = {
        findById: (id) => mockProject
      }
      const MockUserRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        findById: (id) => Promise.reject('Error')
      }

      useCase = createUsecase({
        voteRepository: MockVoteRepository,
        projectRepository: MockProjectRepository,
        userRepository: MockUserRepository
      })

      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        error = e
      }
      expect(error.message).to.equal('Error')
    })

    it('should display error on rejection', async () => {
      const MockProjectRepository = {
        findById: (id) => mockProject
      }
      const MockUserRepository = {
        findById: (id) => mockUser
      }
      useCase = createUsecase({
        voteRepository: MockVoteRepository,
        projectRepository: MockProjectRepository,
        userRepository: MockUserRepository
      })

      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        error = e
      }
      expect(error.message).to.equal('User has already voted')
    })
  })
})
