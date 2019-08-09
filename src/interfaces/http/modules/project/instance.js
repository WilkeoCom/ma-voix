const container = require('src/container') // we have to get the DI
const { getProjectsWithVoteResults } = require('src/app/project')

module.exports = () => {
  const { repository: {
    projectRepository,
    voteRepository
  } } = container.cradle

  const getUseCase = getProjectsWithVoteResults({ projectRepository, voteRepository })

  return {
    getUseCase
  }
}
