
const container = require('src/container') // we have to get the DI
const { createVote } = require('src/app/vote')

module.exports = () => {
  const { repository: {
    voteRepository,
    projectRepository,
    userRepository
  } } = container.cradle

  const postUseCase = createVote({ voteRepository, projectRepository, userRepository })

  return {
    postUseCase
  }
}
