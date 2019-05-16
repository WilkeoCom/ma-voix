
const container = require('src/container') // we have to get the DI
const { getAllProjects } = require('src/app/project')

module.exports = () => {
  const { repository: {
    projectRepository
  } } = container.cradle

  const getUseCase = getAllProjects({ projectRepository })

  return {
    getUseCase
  }
}
