const { toEntity } = require('./transform')
// const fakeProjects = require('../../support/fakers/development/votes')

module.exports = ({ model }) => {
  const votes = []

  const getAll = (...args) => {
    const { where } = args[0]
    const { projectId } = where
    const results = votes.filter(u => u.dataValues.projectId === projectId)

    if (!results) {
      return []
    }

    return results.map(({ dataValues }) => toEntity(dataValues))
  }

  const create = (...args) => {
    return new Promise(async resolve => {
      const vote = args[0]
      votes.push({ dataValues: vote })

      resolve(vote)
    })
  }

  const findOne = (...args) => {
    const { where } = args[0]
    const { projectId, userId } = where
    const vote = votes.find(
      u => u.dataValues.projectId === projectId && u.dataValues.userId === userId
    )

    if (!vote) {
      return null
    }

    return toEntity(vote.dataValues)
  }

  const destroy = (...args) => {
    return new Promise(async resolve => {
      const { where } = args[0]
      if (where.id) {
        const index = votes.findIndex(u => u.dataValues.id === where.id)
        votes.splice(index, 1)
      } else {
        votes.splice(0, votes.length)
      }

      resolve()
    })
  }

  return {
    create,
    getAll,
    findOne,
    destroy
  }
}
