const { toEntity } = require('./transform')
const fakeProjects = require('../../support/fakers/development/projects')

module.exports = ({ model }) => {
  const projects = [
    {
      dataValues: { ...fakeProjects()[0] }
    }
  ]

  const getAll = (...args) =>
    projects.map(({ dataValues }) => {
      return toEntity(dataValues)
    })

  const create = (...args) => {
    return new Promise(async resolve => {
      const project = args[0]
      projects.push({ dataValues: project })

      resolve(project)
    })
  }

  const findById = (...args) => {
    return new Promise(async (resolve, reject) => {
      const id = args[0]
      const project = projects.find(u => u.dataValues.id === id)

      if (!project) {
        reject(new Error())
      }

      resolve(toEntity(project.dataValues))
    })
  }

  const destroy = (...args) => {
    return new Promise(async resolve => {
      const { where } = args[0]
      if (where.id) {
        const index = projects.findIndex(u => u.dataValues.id === where.id)
        projects.splice(index, 1)
      } else {
        projects.splice(0, projects.length)
      }

      resolve()
    })
  }

  return {
    create,
    destroy,
    findById,
    getAll
  }
}
