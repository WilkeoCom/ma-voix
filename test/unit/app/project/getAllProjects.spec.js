
const { expect } = require('chai')

const getAllProjectsUsecase = require('src/app/project/getAllProjects')

describe('App -> Project -> Get', () => {
  let useCase
  const mockData = [{
    'projectType': 'projet de loi',
    'status': 'Première lecture (AN)',
    'title': 'projet de loi d\'orientation des mobilités',
    'topics': ['Transports'],
    'url': 'http://www.senat.fr/dossier-legislatif/pjl18-157.html'
  }]

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        getAll: () => mockData
      }

      useCase = getAllProjectsUsecase({
        projectRepository: MockRepository
      })
    })

    it('should display all the records on success', async () => {
      const lists = await useCase.all()
      expect(lists).to.equal(mockData)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        getAll: () => Promise.reject('Error')
      }

      useCase = getAllProjectsUsecase({
        projectRepository: MockRepository
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
