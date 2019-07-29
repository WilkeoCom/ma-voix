
const { expect } = require('chai')
const getProjectUsecase = require('src/app/project/getProject')

describe('App -> Project -> Get', () => {
  let useCase
  const mockData = {
    'projectType': 'projet de loi',
    'status': 'Première lecture (AN)',
    'title': 'projet de loi d\'orientation des mobilités',
    'topics': ['TRANSPORT'],
    'url': 'http://www.senat.fr/dossier-legislatif/pjl18-157.html'
  }

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => mockData
      }

      useCase = getProjectUsecase({
        projectRepository: MockRepository
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

      useCase = getProjectUsecase({
        projectRepository: MockRepository
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
